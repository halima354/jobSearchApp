import { tokenTypes, verifyToken } from "../utils/security/token.security.js";
import userModel from "../DB/model/User.model.js";
export const authentication= async ({authorization, tokenType = tokenTypes.access }={}) => {

        const[bearer,token]= authorization?.split(" ") || []

        if(!bearer|| !token){
            throw new Error("authorization is require or in-valid format");
        }
    
        let AccessSignature= ""
        let RefreshSignature= ""
    
        switch(bearer){
            case "System":
                AccessSignature =process.env.SYSTEM_ACCESS_TOKEN
                RefreshSignature =process.env.SYSTEM_REFRESH_TOKEN
                break;
    
            case "Bearer":
                AccessSignature= process.env.USER_ACCESS_TOKEN
                RefreshSignature= process.env.USER_REFRESH_TOKEN
                break;
    
            default:
                    break;
        }
        const decoded = verifyToken({token , signature:tokenType ===tokenTypes.access? AccessSignature: RefreshSignature})
        console.log(decoded);
        
        if(!decoded?.id){
            throw new Error("in-valid token payload");
        }

        const user= await userModel.findOne({_id : decoded.id, isDeleted:false})
        if(!user){
            throw new Error("in-valid account");
        }

        if(user.changCredentialsTime?.getTime() >= decoded.iat*1000){
            throw new Error("in-valid Credentials");
        }
        return user
    }

export const authorization=async ({accessRoles=[], role}={} )=>{
        if(!accessRoles.includes(role)){
            throw new Error("not authorize account")
        }
    return true
    }