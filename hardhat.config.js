require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.19",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // goerli: {
    //   url: "https://goerli.infura.io/v3/b672acf6d55840648946032927bce21d",
    //   accounts: [`0x${process.env.REACT_APP_PRIVATE_KEY}`],
    // },
  },
};
