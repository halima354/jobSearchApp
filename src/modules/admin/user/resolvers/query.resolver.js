import { GraphQLID } from "graphql"
import userModel from "../../../../DB/model/User.model.js"
import  * as  userType  from "../types/user.type.js"
export const userList = {
    type: userType.userListResponse,
    resolve: async(parent, args)=>{
        const user= await userModel.find()
    return {message:"done", statusCode:200, data: user}
    }
}
// export const getUser ={
//     type: userType.getUserResponse,
//     args:{
//         _id:{type: GraphQLID}
//     },
//     resolve: async(parent, args) =>{
//         const {_id}= args
//         const user = await userModel.findById(_id)
//         if (!user) {
//             throw new Error("not found account id");
//         }
//         return{message:"done", statusCode: 200, data:user}
//     }
// }

