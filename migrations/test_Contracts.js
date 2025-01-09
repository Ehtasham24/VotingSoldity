const WholesalerRetailer = artifacts.require("WholesalerRetailer");

module.exports = function (deployer) {
  deployer.deploy(WholesalerRetailer);
};
