const { network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  const simpleStorage = await deploy("SimpleStorage", {
    from: deployer,
    log: true,
    args: [],
  });

  if (chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
    await verify(simpleStorage.address, []);
  }
};

module.exports.tags = ["all"];
