require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      11155111: 0,
    },
  },
  gasReporter: {
    enabled: true,
    noColors: true,
    outputFile: "gasReport.txt",
    coinMarketCapApiKey: COINMARKETCAP_API_KEY,
    currency: "USD",
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};
