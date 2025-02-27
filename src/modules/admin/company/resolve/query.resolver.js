import { GraphQLID } from "graphql"
import companyModel from "../../../../DB/model/Company.model.js"
import  * as  companyType  from "../types/company.type.js"
import * as DBservice from '../../../../DB/DBservice.js'
export const companyListList = {
    type: companyType.companyListResponse,
    resolve: async(parent, args)=>{
        const user= await DBservice.findAll(({
            model: companyModel,
            populate:{path: "userInfo"}
        }))
    return {message:"done", statusCode:200, data: user}
    }
}