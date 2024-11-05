/**Resolvers are functions that handle the "actual fetching" on the schema.
 * When a query is made, the resolver fetches and returns the data from a data source like  a database or an API. 
 */
export const resolvers = {
    Query:{
        jobs: () => {
            return [ 
            {
                id:'test-id-1',
                title:'The Title 1',
                description:'The description',
            },
            {
                id:'test-id-2',
                title:'The Title 2',
                description:'The description',
            },
            
        ];
        }
    }
}