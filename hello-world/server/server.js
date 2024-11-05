// This will contain the server funtionality
import {ApolloServer} from '@apollo/server';

// Use this to start the Apollo server on its own without using any backend frameworks
import {startStandaloneServer} from '@apollo/server/standalone';

// SCHEMA DEFINITION LANGUAGE
// graphql
const typeDefs = `
#This is the default but we can leave it out.
schema{
    query:Query
}

# The type definitions represent the interface for our API
# They declare what our clients can request
    type Query {
        greeting: String 
    }      
`;

// Resolvers are the "implementation" 
/**resolver is responsible for providing the data for the greeting field in the Query type */
const resolvers = {
    Query:{
        greeting: () => 'Hello world!',
    }
}

//New Apollo instance
const server = new ApolloServer({typeDefs, resolvers});
const {url} = await startStandaloneServer(server, {listen: {port:9000}});
console.log(`Server running at ${url}`);