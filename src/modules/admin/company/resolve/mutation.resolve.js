import { GraphQLEnumType, GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import companyModel from "../../../../DB/model/Company.model.js";
import { authentication } from "../../../../middleware/auth.graph.middleware.js";
import * as  companyType  from "../types/company.type.js";

export const banCompany = {
    type:companyType.banCompanyResponse,
    args:{
        _id:{type: GraphQLID},
        token:{type: new GraphQLNonNull(GraphQLString)},
        action:{type: new GraphQLNonNull(new GraphQLEnumType({
            name: "actionTypes",
            values: {
            ban:{  value: "ban"} ,
            unBan:{ value: "unBan"} }
            }))}
    },
    resolve:async(parent, args) =>{
    const {_id, token , action}= args
    const user = authentication( {authorization: token})
    //await authorization({role : user.role, accessRoles:[roleTypes.user]})
    const data = action === "ban"? {$set:{bannedAt: Date.now()}} : {$unset:{bannedAt:0}}
    if (!await companyModel.findById(_id)) {
        throw new Error("not found")
    }
    const updateUser =  await companyModel.updateOne({_id}, data)
    return {message: "done", statusCode: 200, data: updateUser }
    }
}

export const approveCompany = {
    type:companyType.approveCompanyResponse,
    args:{
        _id:{type: GraphQLID},
        token:{type: new GraphQLNonNull(GraphQLString)},
    },
    resolve:async(parent, args) =>{
    const {_id, token}= args
    const user = authentication( {authorization: token})
    //await authorization({role : user.role, accessRoles:[roleTypes.user]})
    const company = await companyModel.findById(_id)
    if (!company) {
        throw new Error("not found")
    }
    const companyApprove =  await companyModel.updateOne({_id},{ $set:{approvedByAdmin: true}})
    return {message: "done", statusCode: 200, data: companyApprove}
    }
}
