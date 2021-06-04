const Patents = artifacts.require("Patents");

module.exports = function (deployer) {
  deployer.deploy(Patents);
};