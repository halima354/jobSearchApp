import { GraphQLObjectType, GraphQLSchema } from "graphql"
import * as userMutationResolver from "../admin/user/resolvers/mutation.resolve.js"
import * as userQueryResolver from "../admin/user/resolvers/query.resolver.js"
import * as companyQueryResolver from '../admin/company/resolve/query.resolver.js'
import * as companyMutationResolver from '../admin/company/resolve/mutation.resolve.js'
export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
    name:"mainSchema",
    description:"test",
    fields:{
        ...userQueryResolver,
        ...companyQueryResolver
    }}),
    mutation: new GraphQLObjectType({
        name:"mainSchemaMutation",
        description:"test",
        fields:{
        ...userMutationResolver,
        ...companyMutationResolver
        }
})
})
