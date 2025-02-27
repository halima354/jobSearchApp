import { asyncHandler } from "../../../utils/response/error.response.js";
import {successResponse} from '../../../utils/response/success.response.js'
import * as DBservice from '../../../DB/DBservice.js'
import appModel from "../../../DB/model/App.model.js";
import jobModel from "../../../DB/model/Job.model.js";
import {cloud} from '../../../utils/multer/cloudinary.js'
import { emailEvent } from "../../../utils/events/email.event.js";
import { pagination } from "../../../utils/pagination/pagination.js";
import { getIo } from "../../chat/socket/socket.controller.js";
import { socketConnection } from "../../../../index.js";
export const applyJob= asyncHandler(async(req, res, next) =>{
    const{jobId, email}= req.body
    const job = await DBservice.findOne({
        model:jobModel,
        filter:{_id:jobId}
    })
    if (!job) {
        return next (new Error(" invalid job", {cause: 404}))
    }
    if (!req.file) {
        return next(new Error('No file uploaded'));
    }
    const {secure_url, public_id}= await cloud.uploader.upload(req.file.path,{folder: "jopSearchApp/applicationCompany"})
    const apply = await DBservice.create({
        model: appModel,
        data:{
            jobId,
            email,
            userId: req.user._id,
            userCV: {secure_url, public_id}
        },
        option: {new: true}
    })
    getIo().to(socketConnection.get(job.addedBy.toString())).emit("notify Hr",{jobId:req.params, appliedBy : req.user._id})
    return successResponse({res, data: {apply}
    })
})

export const changStatusApplication= asyncHandler(async(req, res, next) =>{
    const{applicationId , jobId}= req.params
    const { status } = req.body
    const job = await DBservice.findOne({
        model:jobModel,
        filter:{_id:jobId}
    })
    if (!job) {
        return next (new Error(" invalid job", {cause: 404}))
    }
    
    if (req.user._id.toString() ==  job.addedBy.toString()) {
        const apply = await DBservice.findOneAndUpdate({
            model: appModel,
            filter:{_id:applicationId},
            data:{
                status
            },
            option: {new: true}
        })
        if (!apply) {
            return next(new Error("Application not found", { cause: 404 }));
        }
        if (status === "accepted") {
            emailEvent.emit('sendAcceptedEmail', { id: apply.userId, email: apply.email });
        }
        if (status === "rejected") {
            emailEvent.emit('sendRejectedEmail', { id: apply.userId, email: apply.email });
        }
        return successResponse({res, data: {apply}})
    }
    return next (new Error(" not auth", {cause: 404}))
})

export const getAllApps = asyncHandler(async(req, res, next) => {
    const{jobId}= req.params
    const {size, page} =req.query
    const data = await pagination({
        model: jobModel,
        filter:{_id: jobId},
        populate:  {path: "applications"},
        size,
        page,
        sort: {createdAt :-1}
    })
    if (!data) {
        return next (new Error(" invalid job", {cause: 404}))
    }
    return successResponse({res, data: {data }})
})



