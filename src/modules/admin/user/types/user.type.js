import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLID, GraphQLEnumType, GraphQLBoolean } from "graphql";
import { roleTypes } from "../../../../DB/model/User.model.js";
const roleType= new GraphQLEnumType({
    name: "roleTypes",
    values: {
    user:{  value: roleTypes.user} ,
    admin:{ value: roleTypes.admin} 
}})
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
        role: {type: roleType},
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





