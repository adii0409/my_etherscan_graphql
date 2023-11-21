// Import Apollo Server and schema 
const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");

// Import custom data source
const EtherDataSource = require("./datasource/ethDatasource"); 

// Import schema
const typeDefs = importSchema("./schema.graphql");

// Load environment variables
require("dotenv").config();

// Define resolvers that call data source methods
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => 
      // Call etherBalanceByAddress method on ethDataSource
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      // Call totalSupplyOfEther method on ethDataSource  
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>
      // Call getLatestEthereumPrice method on ethDataSource
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>
      // Call getBlockConfirmationTime method on ethDataSource
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  
  // Pass ethDataSource instance to dataSources
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), 
  }),
});

// Start server
server.timeout = 0;
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`); 
});