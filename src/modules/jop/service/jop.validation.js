import joi from 'joi'
import { typesLocations,workingTime, seniorityLevel } from '../../../DB/model/Job.model.js'
import { generalFields } from '../../../middleware/validation.middleware.js'
export const addJob = joi.object().keys({
    jobTitle: joi.string().min(3).max(100).required(),
    jobLocation: joi.string().valid(...typesLocations).required(),
    workingTime: joi.string().valid(...workingTime).required(),
    seniorityLevel:joi.string().valid(...seniorityLevel).required(),
    jobDescription: joi.string().required(),
    technicalSkills: joi.string().required(),
    softSkills: joi.string().required(),
    //addedBy: generalFields.id.required(),
    companyId: generalFields.id.required()
}).required()

export const updateJob = joi.object().keys({
    jobTitle: joi.string().min(3).max(100),
    jobLocation: joi.string().valid(...typesLocations),
    workingTime: joi.string().valid(...workingTime),
    seniorityLevel:joi.string().valid(...seniorityLevel),
    jobDescription: joi.string(),
    technicalSkills: joi.string(),
    softSkills: joi.string(),
    jobId: generalFields.id.required(),
    companyId: generalFields.id.required()
}).required()

export const deleteJob = joi.object().keys({
    jobId: generalFields.id.required(),
    companyId: generalFields.id.required()
}).required()

export const getJobs = joi.object().keys({
    jobId: generalFields.id,
    companyId: generalFields.id.required(),
    size: joi.number().required(),
    page:joi.number().required(),
    name: joi.string()
}).required()

export const Jobs = joi.object().keys({
    companyId: generalFields.id.required(),
    jobTitle: joi.string().min(3).max(100),
    jobLocation: joi.string().valid(...typesLocations),
    workingTime: joi.string().valid(...workingTime),
    seniorityLevel:joi.string().valid(...seniorityLevel),
    technicalSkills: joi.string(),
    size: joi.number(),
    page:joi.number()
}).required()