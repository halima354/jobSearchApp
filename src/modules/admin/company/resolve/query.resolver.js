import { GraphQLNonNull, GraphQLString} from "graphql"
import companyModel from "../../../../DB/model/Company.model.js"
import  * as  companyType  from "../types/company.type.js"
import * as DBservice from '../../../../DB/DBservice.js'
import { roleTypes } from "../../../../DB/model/User.model.js"
import { authentication, authorization } from "../../../../middleware/auth.graph.middleware.js"
export const companyListList = {
    type: companyType.companyListResponse,
    args:{
        token:{type: new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(parent, args)=>{
        const {token} = args
        const user = await authentication({authorization: token})
        await authorization({role: user.role , accessRoles:[roleTypes.admin]})
        const companyList = await DBservice.findAll({
            model: companyModel,
            populate:[
                {path : "userInfo" },
                { path: "HRS" }
            ]
        })
    return {message:"done", statusCode:200, data: companyList}
    }
}