import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLID, GraphQLBoolean } from "graphql";
import { userType } from  "../../user/types/user.type.js";
import * as DBService from '../../../../DB/DBservice.js'
import userModel from "../../../../DB/model/User.model.js";
const imageType = new GraphQLObjectType({
    name:"image",
    fields:{
        secure_url:{type:GraphQLString},
        public_id:{type:GraphQLString}
    }})

export const companyType=  new GraphQLObjectType({
    name :"Companies",
    fields:{
        _id:{ type: GraphQLID },
        userId:{ type: GraphQLID },
        userInfo:{ type: userType },
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        industry:{type:GraphQLString},
        address:{type:GraphQLString},
        numberOfEmployees:{type:GraphQLString},
        isDeleted:{type: GraphQLBoolean},
        bannedAt:{type:GraphQLString},
        createdAt:{type:GraphQLString},
        updatedAt:{type:GraphQLString},
        approvedByAdmin:{type:GraphQLBoolean},
        HRS:{type: new GraphQLList(userType)},
        logo:{type: imageType},
        coverPic:{type: new GraphQLList(imageType)},
        legalAttachment:{type: imageType }
    }})

export const companyList = new GraphQLList(companyType)

export const companyListResponse=  new GraphQLObjectType({
    name:"responseCompany",
    fields:{
        message:{type: GraphQLString},
        statusCode:{type: GraphQLInt},
        data:{ type: companyList}
    }
})

export const banCompany = companyType

export const banCompanyResponse= new GraphQLObjectType({
    name:"responseBanOrUnBanCompany",
    fields:{
        message:{type: GraphQLString},
        statusCode:{type: GraphQLString},
        data:{type: banCompany}
    }
})

export const approveCompany = companyType

export const approveCompanyResponse= new GraphQLObjectType({
    name:"responseApproveCompanyCompany",
    fields:{
        message:{type: GraphQLString},
        statusCode:{type: GraphQLString},
        data:{type: approveCompany}
    }
})