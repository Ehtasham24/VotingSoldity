const VotingSystem = artifacts.require("VotingSystem");

module.exports = async function (deployer) {
  // Deploy VotingSystem contract to the network
  await deployer.deploy(VotingSystem);
};
