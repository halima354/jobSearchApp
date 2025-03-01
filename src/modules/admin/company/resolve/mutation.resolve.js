import { GraphQLEnumType, GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import companyModel from "../../../../DB/model/Company.model.js";
import { authentication , authorization} from "../../../../middleware/auth.graph.middleware.js";
import { roleTypes } from "../../../../DB/model/User.model.js";
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
    const user = await authentication( {authorization: token})
    await authorization({role : user.role, accessRoles:[roleTypes.admin]})
    const data = action === "ban"? {$set:{bannedAt: Date.now()}} : {$unset:{bannedAt:0}}
    const company = await companyModel.findById(_id)
    if (!company) {
        throw new Error("not found this company")
    }
    if (company.bannedAt && action == 'ban') {
        throw new Error(" already banned")
    }
    const updateCompany =  await companyModel.findOneAndUpdate({_id}, data, {new: true})
    return {message: "done", statusCode: 200, data: updateCompany }
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
    const user = await authentication( {authorization: token})
    await authorization({role : user.role, accessRoles:[roleTypes.admin]})
    const company = await companyModel.findById(_id)
    if (!company) {
        throw new Error("not found this company")
    }
    const companyApprove =  await companyModel.findOneAndUpdate({_id},{ $set:{approvedByAdmin: true}})
    return {message: "done", statusCode: 200, data: companyApprove}
    }
}
