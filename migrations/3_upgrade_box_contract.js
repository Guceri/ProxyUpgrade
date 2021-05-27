//run this seperately than the initial migration
//truffle migrate --f 3
const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const Box = artifacts.require('Box');
const BoxV2 = artifacts.require('BoxV2');

/* 
upgrade:
- deploy the new implementation contract
- send transaction to the proxy that updates implementation address to the new one

*/

module.exports = async function (deployer) {
  const existing = await Box.deployed();
  //Note: the address of the "existing" Box contract is actually the proxy address
  const instance = await upgradeProxy(existing.address, BoxV2, { deployer });
  console.log("Upgraded", instance.address);
};