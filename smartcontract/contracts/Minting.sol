// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ILLUCI is ERC721, Ownable {
    using Strings for uint256;

    uint256 public constant MAX_SUPPLY = 30;
    uint256 public constant MAX_MINT_PER_TX = 1;
    uint256 public constant TOKEN_RESERVED = 3;
    uint256 public PRICE = 0.03 ether;
    uint256 public constant MAX_MINT_PER_WALLET = 1;

    bool public isSaleActive = false;
    uint256 public totalSupply = 0;
    mapping(address => uint256) private mintedPerWallet;

    string public baseURI;
    string public baseExtension = ".json";

    constructor() ERC721("ILLUCI", "ILU") Ownable(msg.sender) {
        baseURI = _baseURI();
        for (uint256 i = 0; i < TOKEN_RESERVED; i++) {
            totalSupply += 1;
            _safeMint(msg.sender, totalSupply);
        }
        totalSupply = TOKEN_RESERVED;
    }

    function _baseURI() internal pure override returns (string memory) {
        return
            "ipfs://bafybeielfd2l2bopxcqihj5mdmuetaifdwvoc3hdolloxsnmwu222dpxwm/";
    }

    function _mint(uint256 _amount) public payable {
        require(isSaleActive, "Sale is not active");
        require(
            _amount <= MAX_MINT_PER_TX,
            "You can mint a maximum of 1 NFTs at a time"
        );
        require(
            totalSupply + _amount <= MAX_SUPPLY - TOKEN_RESERVED,
            "Exceeds maximum supply"
        );
        require(
            msg.value >= PRICE * _amount,
            "Ether value sent is not correct"
        );
        require(
            mintedPerWallet[msg.sender] + _amount <= MAX_MINT_PER_WALLET,
            "You can mint a maximum of 1 NFTs per wallet"
        );

        require(_amount > 0, "You cannot mint 0 NFTs");

        for (uint256 i = 0; i < _amount; i++) {
            totalSupply += 1;
            mintedPerWallet[msg.sender] += 1;
            _safeMint(msg.sender, totalSupply);
        }
    }

    function hasMinted(address user) public view returns (bool) {
        return mintedPerWallet[user] > 0;
    }

    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
    }

    function setPrice(uint256 _newPrice) external onlyOwner {
        PRICE = _newPrice;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function toggleSale() external onlyOwner {
        isSaleActive = !isSaleActive;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(
            ownerOf(tokenId) != address(0),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    function fetchAllUris() external view returns (string[] memory) {
        string[] memory uris = new string[](totalSupply);
        for (uint256 i = 0; i < totalSupply; i++) {
            uris[i] = tokenURI(i + 1);
        }
        return uris;
    }
}
