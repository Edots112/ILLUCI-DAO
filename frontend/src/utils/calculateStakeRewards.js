export const calculateStakeRewards = startTime => {
  const endTime = Math.floor(Date.now() / 1000);
  const stakingDurationInSeconds = endTime - startTime;
  const rewardPerDay = 10000;
  const rewardPerSecond = rewardPerDay / (24 * 60 * 60);
  return stakingDurationInSeconds * rewardPerSecond;
};
