//use only the contract name, not the source file name
//one source file could have multiple contracts
const Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
