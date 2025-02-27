import joi from 'joi'
import { generalFields } from '../../../middleware/validation.middleware.js'
import { statusTypes } from '../../../DB/model/App.model.js'
export const apply = joi.object().keys({
    jobId: generalFields.id.required(),
    email:generalFields.email.required(),
    file:generalFields.file.required(),
}).required()

export const changStatus = joi.object().keys({
    jobId: generalFields.id.required(),
    applicationId: generalFields.id.required(),
    status:joi.string().valid(...Object.values(statusTypes)).required(),
}).required()

export const allApplications = joi.object().keys({
    jobId: generalFields.id.required(),
    size: joi.number().required(),
    page:joi.number().required(),
}).required()