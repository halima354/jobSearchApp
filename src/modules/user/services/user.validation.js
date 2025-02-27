import joi from 'joi'
import { generalFields } from '../../../middleware/validation.middleware.js'

export const updateProfile= joi.object().keys({
    username:generalFields.username,
    DOB:generalFields.DOB,
    Phone:generalFields.phone,
    gender:generalFields.gender
}).required()

export const updatePassword= joi.object().keys({
        oldPassword: generalFields.password.required(),
        password: generalFields.password.not(joi.ref("oldPassword")).required(),
        confirmationPassword: generalFields.confirmationPassword.valid(joi.ref("password")).required()
}).required()

export const getAntherProfile= joi.object().keys({
        userId: generalFields.id.required(),
}).required()

export const uploadImage= joi.object().keys({
    file: generalFields.file.required(),
}).required()
export const coverImage= joi.object().keys({
    file: generalFields.file.required(),
}).required()

export const deleteProfilePic= joi.object().keys({
    userId: generalFields.id.required(),
}).required()

export const deleteCover = joi.object().keys({
    userId : generalFields.id.required(),
    _id : generalFields.id.required()
}).required()