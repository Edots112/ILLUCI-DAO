// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StakeNft {
    IERC721 public nftContract;
    IERC20 public tokenContract;

    struct Stake {
        uint256 id;
        uint256 amount;
        uint256 startTime;
        uint256 endTime;
        uint256 reward;
        bool isClaimed;
        bool isStaked;
        address owner;
    }

    mapping(uint256 => Stake) public stakes;
    mapping(address => uint256[]) public stakesByAddress;

    event Staked(
        uint256 id,
        uint256 amount,
        uint256 startTime,
        uint256 endTime,
        uint256 reward
    );
    event Unstaked(uint256 indexed tokenId, address indexed user);
    event Claimed(
        uint256 indexed tokenId,
        uint256 reward,
        address indexed user
    );

    constructor(address _nftContract, address _tokenContract) {
        nftContract = IERC721(_nftContract);
        tokenContract = IERC20(_tokenContract);
    }

    function stake(uint256 tokenId) public {
        require(
            nftContract.ownerOf(tokenId) == msg.sender,
            "You are not the owner of this token"
        );

        nftContract.transferFrom(msg.sender, address(this), tokenId);

        stakes[tokenId] = Stake({
            id: tokenId,
            amount: 1,
            startTime: block.timestamp,
            endTime: 0,
            reward: 0,
            isClaimed: false,
            isStaked: true,
            owner: msg.sender
        });

        stakesByAddress[msg.sender].push(tokenId);

        emit Staked(tokenId, 1, block.timestamp, 0, 0);
    }

    function unstake(uint256 tokenId) public {
        Stake storage stakeToUnstake = stakes[tokenId];

        require(
            stakeToUnstake.owner == msg.sender,
            "You must own the staked NFT to unstake it."
        );
        require(
            stakeToUnstake.endTime == 0,
            "This stake has already been unstaked"
        );

        if (!stakeToUnstake.isClaimed) {
            uint256 reward = calculateReward(
                stakeToUnstake.startTime,
                block.timestamp
            );
            stakeToUnstake.reward = reward;
            tokenContract.transfer(msg.sender, reward);
            stakeToUnstake.isClaimed = true;
            emit Claimed(tokenId, reward, msg.sender);
        }

        stakeToUnstake.isStaked = false;
        stakeToUnstake.endTime = block.timestamp;

        nftContract.transferFrom(address(this), msg.sender, tokenId);
        emit Unstaked(tokenId, msg.sender);
    }

    function calculateReward(
        uint256 startTime,
        uint256 endTime
    ) public pure returns (uint256) {
        uint256 stakingDurationInSeconds = endTime - startTime;
        uint256 rewardPerDay = 10000;
        uint256 rewardPerSecond = (rewardPerDay * 1e18) / (24 * 60 * 60);
        return (stakingDurationInSeconds * rewardPerSecond) / 1e18;
    }

    function claim(uint256 tokenId) public {
        Stake storage stakeToClaim = stakes[tokenId];

        require(!stakeToClaim.isClaimed, "Reward is already claimed.");

        require(
            getContractTokenBalance() >= stakeToClaim.reward,
            "Not enough tokens in the contract"
        );

        uint256 reward = calculateReward(
            stakeToClaim.startTime,
            block.timestamp
        );
        stakeToClaim.startTime = block.timestamp;

        tokenContract.transfer(msg.sender, reward);

        emit Claimed(tokenId, reward, msg.sender);
    }

    function getBlanceOfTokens(address user) public view returns (uint256) {
        return tokenContract.balanceOf(user);
    }

    function getContractTokenBalance() public view returns (uint256) {
        return tokenContract.balanceOf(address(this));
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        return nftContract.ownerOf(tokenId);
    }
}
