import { GraphQLEnumType, GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import userModel from "../../../../DB/model/User.model.js";
import { authentication , authorization } from "../../../../middleware/auth.graph.middleware.js";
import { roleTypes } from "../../../../DB/model/User.model.js";
import * as userType from "../types/user.type.js";

export const banUser = {
    type:userType.banUserResponse,
    args:{
        _id:{type: GraphQLID},
        token:{type: new GraphQLNonNull(GraphQLString)},
        action:{type: new GraphQLNonNull(new GraphQLEnumType({
            name: "action",
            values: {
            ban:{  value: "ban"} ,
            unBan:{ value: "unBan"} }
            }))},
    },
    resolve:async(parent, args) =>{
    const {_id, token , action}= args
    const user = await authentication( {authorization: token})
    console.log('Authenticated User:', user);
    await authorization({role : user.role, accessRoles:[roleTypes.admin]})
    const data = action === "ban"? {$set:{bannedAt: Date.now()}} : {$unset:{bannedAt:0}}
    const findUser = await userModel.findById(_id)
    if (!findUser) {
        throw new Error("not found this user")
    }
    if (findUser.bannedAt && action == "ban") {
        throw new Error("this user already banned")
    }
    const updateUser =  await userModel.findOneAndUpdate({_id}, data ,{new : true})
    return {message: "done", statusCode: 200, data: updateUser }
    }
}