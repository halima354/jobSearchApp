import { GraphQLNonNull, GraphQLEnumType, GraphQLString} from "graphql"
import userModel from "../../../../DB/model/User.model.js"
import { authorization ,authentication } from "../../../../middleware/auth.graph.middleware.js"
import { roleTypes } from "../../../../DB/model/User.model.js"
import  * as  userType  from "../types/user.type.js"
export const userList = {
    type: userType.userListResponse,
    args:{
        token:{type: new GraphQLNonNull(GraphQLString)},
        },
    resolve: async(parent, args)=>{
        const {token} = args
        const user = await authentication( {authorization: token})
            console.log('Authenticated User:', user);
            await authorization({role : user.role, accessRoles:[roleTypes.admin]})
        const userList= await userModel.find()
    return {message:"done", statusCode:200, data: userList}
    }
}


