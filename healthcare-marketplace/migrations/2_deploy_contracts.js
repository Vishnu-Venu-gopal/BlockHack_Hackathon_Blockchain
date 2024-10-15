const HealthcareDataMarketplace = artifacts.require("HealthcareDataMarketplace");

module.exports = function(deployer) {
  deployer.deploy(HealthcareDataMarketplace);
};
