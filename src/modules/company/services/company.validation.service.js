import joi from 'joi'
import { Types } from "mongoose"
import { generalFields } from '../../../middleware/validation.middleware.js'

export const addCompany = joi.object().keys({
    name: joi.string().required(),
    description: joi.string().min(4).max(1000).required(),
    industry: joi.string().required(),
    address:joi.string().required(),
    numberOfEmployees:joi.string().pattern( /^\d{1,2}-\d{1,2}$/),
    email:generalFields.email.required(),
    file:generalFields.file.required(),
    HRS: generalFields.HRS.required()
}).required()

export const updateCompany = joi.object().keys({
    companyId : generalFields.id.required(),
    userId:generalFields.id,
    name: joi.string(),
    description: joi.string().min(4).max(1000),
    industry: joi.string(),
    address:joi.string(),
    numberOfEmployees:joi.string().pattern( /^\d{1,2}-\d{1,2}$/),
    HRS: generalFields.HRS
})

export const deleteCompany = joi.object().keys({
    companyId : generalFields.id.required(),
}).required()

export const searchCompany = joi.object().keys({
    name: joi.string(),
}).required()

export const uploadLogo = joi.object().keys({
    companyId : generalFields.id.required(),
    file:generalFields.file.required(),
}).required()
export const uploadCoverImage = uploadLogo

export const deleteLogo = deleteCompany

export const addHR = deleteCompany

export const getCompany = deleteCompany

export const deleteCoverPic = joi.object().keys({
    companyId : generalFields.id.required(),
    public_id: joi.string().required()
}).required()