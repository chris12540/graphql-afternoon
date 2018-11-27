const { GraphQLServer } = require('graphql-yoga');
const fs = require('fs');
const typeDefs = fs.readFileSync(`${__dirname}/schema/typeDefs.graphql`, 'utf8');
const resolvers = require('./schema/resolvers')

const options = {
	port: 3001,
	endpoint: '/graphql',
	playground: '/graphiql'
}

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(options, () => {
	console.log(`🚀 Server on http://localhost:${options.port}/`)
});