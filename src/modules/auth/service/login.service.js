import userModel, { roleTypes } from "../../../DB/model/User.model.js";
import { emailEvent } from "../../../utils/events/email.event.js";
import { asyncHandler } from "../../../utils/response/error.response.js";
import { successResponse } from "../../../utils/response/success.response.js";
import { compareHash, generateHash } from "../../../utils/security/hash.security.js";
import { providerTypes } from "../../../DB/model/User.model.js";
import {OAuth2Client} from 'google-auth-library';
import { decodedToken, generateToken, tokenTypes } from "../../../utils/security/token.security.js";

export const login= asyncHandler(
    async(req,res,next)=>{
        const{ email, password}=req.body
        console.log({email,password});
        const user = await userModel.findOne({email})
        if(!user){
            return next(new Error("not found",{cause:404}))
        }
        if(!user.confirmEmail){
            return next(new Error("please verify your account first",{cause:400}))
        }
        if(user.provider != providerTypes.system){
            return next(new Error("invalid login provider",{cause:404}))
        }
        if(!compareHash({plainText:password, hashValue: user.password})){
            return next(new Error("not found",{cause:404}))
        }
        
        const access_token=generateToken({payload:{id:user._id , role:user.roles},signature:[roleTypes.admin ,roleTypes.superAdmin].includes(user.role) ?process.env.SYSTEM_ACCESS_TOKEN:process.env.USER_ACCESS_TOKEN})
        const refreshToken=generateToken({payload:{id:user._id},signature:[roleTypes.admin ,roleTypes.superAdmin].includes(user.role) ?process.env.SYSTEM_REFRESH_TOKEN:process.env.USER_REFRESH_TOKEN,expiresIn:31536000})
        return successResponse({res, status:201, data:{token:{
            access_token,
            refreshToken} } })
    }
)

export const signWithGoogle= asyncHandler(
    async(req,res,next)=>{
        const {idToken} = req.body
        console.log({idToken});
        const client = new OAuth2Client();
        async function verify() {
        const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.CLIENT_ID,
        });
            const payload = ticket.getPayload();
                console.log( payload)
                if (!payload) {
                    return next(new Error('Invalid token payload', { cause: 400 }));
                }
                return payload
            }
            const gmailData = await verify()
            console.log(gmailData);
            
            const {name, email_verified, picture, email} = gmailData
            if (!email_verified) {
                return next ( new Error("in valid account",{cause:404}))
            }
            let user = await userModel.findOne({email})
            if (user?.provider === providerTypes.system) {
                return next ( new Error("invalid login provider",{cause:404}))
            }
            if (!user) {
            user= await userModel.create({firstName: name, lastName: name, email,confirmEmail:email_verified, profilePic:picture, provider: providerTypes.google})
            }
            const access_token=generateToken({payload:{id:user._id , role:user.roles},signature:[roleTypes.admin ,roleTypes.superAdmin].includes(user.role) ?process.env.SYSTEM_ACCESS_TOKEN:process.env.USER_ACCESS_TOKEN})
            const refreshToken=generateToken({payload:{id:user._id},signature:[roleTypes.admin ,roleTypes.superAdmin].includes(user.role) ?process.env.SYSTEM_REFRESH_TOKEN:process.env.USER_REFRESH_TOKEN,expiresIn:31536000})
            return successResponse({res, status:201, data:{token:{
                access_token,
                refreshToken} } })
    }
)

export const loginWithGoogle= asyncHandler(
    async(req,res,next)=>{
        const {idToken} = req.body
        console.log({idToken});
        const client = new OAuth2Client();
        async function verify() {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.CLIENT_ID,
        });
            const payload = ticket.getPayload();
                console.log( payload)
                return payload
            }
            const payload = await verify()
            console.log(payload);
            
            const { email_verified, email} = payload
            if (!email_verified) {
                return next ( new Error("in valid account",{cause:404}))
            }
            let user = await userModel.findOne({email})
            if (user?.provider === providerTypes.google) {
                const access_token=generateToken({payload:{id:user._id , role:user.roles},signature:[roleTypes.admin ,roleTypes.superAdmin].includes(user.role) ?process.env.SYSTEM_ACCESS_TOKEN:process.env.USER_ACCESS_TOKEN})
                const refreshToken=generateToken({payload:{id:user._id},signature:[roleTypes.admin ,roleTypes.superAdmin].includes(user.role) ?process.env.SYSTEM_REFRESH_TOKEN:process.env.USER_REFRESH_TOKEN,expiresIn:31536000})
                return successResponse({res, status:201, data:{token:{
                    access_token,
                    refreshToken} } })
            }
            return next ( new Error("invalid login provider",{cause:404}))
    }
)

export const refreshToken= asyncHandler(
    async(req,res,next)=>{
    const user= await decodedToken({authorization: req.headers.authorization , tokenType:tokenTypes.refresh , next})
    const accessToken=generateToken({payload:{ id:user._id},signature:[roleTypes.admin ,roleTypes.superAdmin].includes(user.role)?process.env.SYSTEM_ACCESS_TOKEN:process.env.USER_ACCESS_TOKEN})
    const refreshToken=generateToken({payload:{ id:user._id},signature:[roleTypes.admin ,roleTypes.superAdmin].includes(user.role)?process.env.SYSTEM_REFRESH_TOKEN:process.env.USER_REFRESH_TOKEN,expiresIn:31536000})
    return successResponse({res, status:201, data:{
        token:{
        accessToken,
        refreshToken}
    }})
})

export const forgetPassword = asyncHandler(async(req,res,next)=>{

    const {email}= req.body
    const user= await userModel.findOne({email, isDeleted:false})
    if(!user){
        return next(new Error("in-valid account",{cause:404}))
    }
    emailEvent.emit('sendForgetPassword',{id :user._id ,email})
    return successResponse({res, status:201, data:{user} })
}
)

export const resetPassword = asyncHandler(async(req,res,next)=>{

    const {email,code,password}= req.body
    const user= await userModel.findOne({email, isDeleted:false})
    if(!user){
        return next(new Error("in-valid account",{cause:404}))
    }
    if(!compareHash({plainText:code, hashValue:user.forgetPasswordOTP})){
        return next(new Error("in-valid  rest code",{cause:400}))
    }
    if ( Date.now() > user.OTPExpiry) {
        return next(new Error("expired OTP",{cause:404}))
    }
    const hashPassword= generateHash({plainText:password})
    await userModel.updateOne({email},{password:hashPassword,confirmEmail:true ,changCredentialsTime: Date.now(),$unset:{forgetPasswordOTP:0, emailOTP:0}})

    return successResponse({res, status:201, data:{user} })
}
)

