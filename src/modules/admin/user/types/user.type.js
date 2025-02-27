import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLID, GraphQLScalarType, GraphQLBoolean } from "graphql";

export const userType=  new GraphQLObjectType({
    name :"Users",
    fields:{
        _id:{type: GraphQLID},
        firstName:{type:GraphQLString},
        lastName:{type:GraphQLString},
        email:{type:GraphQLString},
        password:{type:GraphQLString},
        phone:{type:GraphQLString},
        gender:{type:GraphQLString},
        role:{type:GraphQLString},
        DOB:{type: GraphQLString},
        isDeleted:{type: GraphQLBoolean},
        confirmEmail:{type:GraphQLBoolean},
        deletedAt:{type:GraphQLString},
        updatedBY:{type:GraphQLString},
        bannedAt:{type:GraphQLString},
        createdAt:{type:GraphQLString},
        updatedAt:{type:GraphQLString},

    }})

export const userList = new GraphQLList(userType)

export const userListResponse=  new GraphQLObjectType({
    name:"response",
    fields:{
        message:{type: GraphQLString},
        statusCode:{type: GraphQLInt},
        data:{ type: userList}
    }
})

export const banUser = userType
export const banUserResponse= new GraphQLObjectType({
    name:"responseBanUser",
    fields:{
        message:{type: GraphQLString},
        statusCode:{type: GraphQLString},
        data:{type: banUser}
    }
})


// export const getUser=  userType
// export const getUserResponse= new GraphQLObjectType({
//     name:"getUserResponse",
//     fields:{
//         message:{type: GraphQLString},
//         statusCode:{type: GraphQLString},
//         data:{type: getUser}
//     }
// })


