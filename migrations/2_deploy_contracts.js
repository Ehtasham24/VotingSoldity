const VotingSystem = artifacts.require("VotingSystem");
const WholesalerRetailer = artifacts.require("WholesalerRetailer");

module.exports = function (deployer) {
  deployer.deploy(VotingSystem);
  deployer.deploy(WholesalerRetailer);
};
