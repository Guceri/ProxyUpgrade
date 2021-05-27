//run initial migration & this migration together
//truffle migrate --to 2
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const Box = artifacts.require('Box');

module.exports = async function (deployer) {
  /*
  deployProxy:
  - checks that the contract is upgrade-safe
  - sets up a proxy admin contract (if needed)
  - deploy an implmentation of the Box contract(unless one is deployed)
  - create a proxy
  - initialize it with a value of 42 (similar to a constructor variable initialization)

  3 contracts are deployd
  - the implementation contract ("Box")
  - "ProxyAdmin"
  - Proxy to Implementation (this contract you interact with)
  */
  const instance = await deployProxy(Box, [42], { deployer, initializer: 'store' });
  console.log('Deployed', instance.address);
};