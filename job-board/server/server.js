import {ApolloServer} from '@apollo/server';
// see comment below 
import {expressMiddleware as apolloMiddleware} from '@apollo/server/express4';
//enables to Cross-Origin Resource Sharing, allowing the server to handle requests from deifferent origins. 
import cors from 'cors';
import express from 'express';
import { authMiddleware, handleLogin } from './auth.js';
import {readFile} from 'node:fs/promises';
import {resolvers} from './resolvers.js';

const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post('/login', handleLogin);

// THE PURPOSE OF THIS CODE IS TO LOAD THE GRAPHQL SCHEMA DEFINITION FROM AN EXTERNAL FILE. 
const typeDefs = await readFile('./schema.graphql', 'utf-8')

// Allows you to create a GraphQL server
const apolloServer = new ApolloServer({typeDefs, resolvers});

/** Initializes the Apollo server instance and prepares it to handle GraphQL requests
 *  It sets up the internal components of Apollo Server, such as the schema, resolvers, and any plugins or extensions.
 *  It's asynchronous and returns a Promise. */
await apolloServer.start();

// INTEGRATE Apollo Server WITH EXPRESS
/**is a function that crates expressMiddleware for Apollo Server
 * This middleware will handle "INCOMING" graphQL requests.*/
app.use('/graphql', apolloMiddleware(apolloServer));


app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});


/**use() 
 * --is a method to add middleware functions to the Express application.
 * --applies the specified middleware to every incoming request before it reaches the route handlers.
 * --Middleware can perform the following tasks:
 * 1.)Execute any code
 * 2.) Make changes to the request and response objects
 * 3.) End the request-response cycle
 * 4.) Call the next middleware function in the stack
*/

/**app.post
 * --a method to defive a route that handles HTP POST requests.
 */

/**EXPRESS MIDDLEWARE
 * --is a way to "integrate" Apoller Server with Express application.
 * 
 * --When you use Apollo SErver with Express, the express middleware function "ATTACHES" Apollo Server
 *   to your Express application.
 *   This allows to handle GraphQL requests and responses using Express routes and middleware.
 */

/**There are a few reasons why `readFile` is used instead of directly importing the schema file:

1. File Format:
   GraphQL schema files typically use the `.graphql` or `.gql` extension. 
   These file types are not natively supported by Node.js for direct import. 
   Node.js primarily supports importing JavaScript files (.js, .mjs, .cjs) and JSON files.

2. Asynchronous Loading:
   Using `readFile` allows for asynchronous loading of the schema file. 
   
   This can be beneficial in scenarios where you might want to load different schema files based on runtime conditions
   or environment variables.

3. Text Content:
   The GraphQL schema is typically defined as a string.
   When you use `readFile`, you get the raw text content of the file, which is exactly what Apollo Server expects for the `typeDefs`.

4. Flexibility:
   Reading the file this way provides more flexibility. 
   For instance, you could potentially modify the schema content before passing it to Apollo Server, or you could combine 
   multiple schema files.

5. Build Process Compatibility:
   Some build tools or environments might have issues with importing non-JavaScript files directly. 
   Reading the file as text ensures compatibility across different environments and build setups.

That being said, there are alternatives to using `readFile`:

1. GraphQL Tools:
   Libraries like `@graphql-tools/load-files` and `@graphql-tools/merge` can be used to load and merge GraphQL schema files more conveniently.

2. Webpack Loaders:
   If you're using Webpack, you can use loaders like `graphql-tag/loader` to import `.graphql` files directly.

3. Babel Plugins:
   There are Babel plugins that allow you to import `.graphql` files as if they were modules.

However, the `readFile` approach is straightforward, doesn't require additional dependencies, and works reliably across different Node.js environments. It's a simple and effective way to load the schema, especially for smaller projects or when you're just getting started with GraphQL.*/