const { RESTDataSource } = require("apollo-datasource-rest"); 

// Vitalik's Ethereum Address - this is hardcoded to Vitalik's address
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

// Etherscan Data Source Class 
class EtherDataSource extends RESTDataSource {

  constructor() {
    super(); 
    // Base URL points to Etherscan API
    this.baseURL = "https://api.etherscan.io/api";
  }

  async etherBalanceByAddress() {
    // Fetches account balance for the hardcoded address
    return this.get(
      `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  async totalSupplyOfEther() {
    // Fetches total ether supply
    return this.get(
      `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Additional API endpoints

  async getLatestEthereumPrice() {
    // Fetches latest ETH price
    return this.get(
      `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  async getBlockConfirmationTime() {
    // Fetches block confirmation time estimate
    return this.get(
      `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
    );
  }
}

module.exports = EtherDataSource;