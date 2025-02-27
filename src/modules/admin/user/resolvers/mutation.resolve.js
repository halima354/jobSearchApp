import { GraphQLEnumType, GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import userModel from "../../../../DB/model/User.model.js";
import { authentication } from "../../../../middleware/auth.graph.middleware.js";
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
            }))}
    },
    resolve:async(parent, args) =>{
    const {_id, token , action}= args
    const user = authentication( {authorization: token})
    //await authorization({role : user.role, accessRoles:[roleTypes.user]})
    const data = action === "ban"? {$set:{bannedAt: Date.now()}} : {$unset:{bannedAt:0}}
    if (!await userModel.findById(_id)) {
        throw new Error("not found")
    }
    const updateUser =  await userModel.updateOne({_id}, data)
    return {message: "done", statusCode: 200, data: updateUser }
    }
} 