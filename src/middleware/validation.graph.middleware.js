import joi from "joi"
import { Types } from "mongoose"
import { genderTypes } from "../DB/model/User.model.js"
const checkObjectId=(value,helper)=>{
    return Types.ObjectId.isValid(value)? true:helper.message("in-valid ObjectId")
}

export const generalFields={
    username:joi.string().min(2).max(25).trim().required(),
    email:joi.string().email({tlds:{allow:["com", "net"]},minDomainSegments:2, maxDomainSegments:3}).required(),
    password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)).required(),
    confirmationPassword:joi.string().valid(joi.ref('password')),
    code:joi.string().pattern(new RegExp(/^\d{4}$/)),
    id: joi.string().custom(checkObjectId),
    DOB:joi.date().less("now"),
    phone:joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/)),
    gender : joi.string().valid(...Object.values(genderTypes)),
    file:joi.object().options({allowUnknown: true})
}

export const validationGraph = async({schema, args={} } = {} )=>{

        const validateResult= schema.validate(args ,{abortEarly:false})
        if(validateResult.error){
            throw new Error(JSON.stringify({
                message:"validation error",
                details:validateResult.error.details
            }));
            
        }
        return true
    }