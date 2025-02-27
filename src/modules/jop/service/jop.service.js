import { asyncHandler } from "../../../utils/response/error.response.js";
import {successResponse} from '../../../utils/response/success.response.js'
import * as DBservice from '../../../DB/DBservice.js'
import companyModel from "../../../DB/model/Company.model.js";
import jopModel from '../../../DB/model/Job.model.js'
import { pagination } from "../../../utils/pagination/pagination.js";
import jobModel from "../../../DB/model/Job.model.js";
export const addJob = asyncHandler(async (req, res, next) => {
    const { companyId } = req.params;
    const { jobTitle, jobLocation, workingTime, seniorityLevel, jobDescription, technicalSkills, softSkills } = req.body;
    const company = await DBservice.findOne({
        model: companyModel,
        filter: { _id: companyId }
    })
    if (!company) {
        return next(new Error("Company not found", { cause: 404 }));
    }
    if ( company.userId.toString() !== req.user._id.toString() &&!company.HRS.includes(req.user._id)) {
        return next(new Error("You are not authorized to add jobs for this company", { cause: 403 }));
    }
    const job = await DBservice.create({
        model: jopModel,
        data: {
            jobTitle,
            jobLocation,
            workingTime,
            seniorityLevel,
            jobDescription,
            technicalSkills,
            softSkills,
            addedBy: req.user._id,
            companyId
        }
    });
    return successResponse({ res, message: "Job added successfully", data: {job} });
})

export const updateJob= asyncHandler(async(req, res, next) =>{
    const {jobId} =req.params
    const job = await DBservice.findOne({
        model: jopModel,
        filter: {
            _id : jobId
        }
    })
    if (!job) {
        return next(new Error("job not found", { cause: 404 }));
    }
    if (job.addedBy.toString() !== req.user._id.toString()) {
        return next(new Error("You are not authorized to update jobs for this company", { cause: 403 }));
    }
    await DBservice.findOneAndUpdate({
        model: jopModel,
        filter:{
            _id: req.params.jobId
        },
        data:{
        ... req.body,
            updatedBy:req.user._id
        }
    })
    return successResponse({ res, message: "Job updated successfully" });
})

export const deleteJob = asyncHandler(async(req, res, next) =>{
    const{jobId} = req.params
    const job = await DBservice.findOne({
        model: jopModel,
        filter:{_id: jobId}
    })
    if (!job) {
        return next(new Error("Job not found", { cause: 404 }));
    }
    if (job.addedBy.toString() !== req.user._id.toString()) {
        return next(new Error("You are not authorized to delete jobs for this company", { cause: 403 }));
    }
    await DBservice.deleteOne({
        model: jopModel,
        filter:{_id: jobId}
    })
    return successResponse({ res, message: "Job deleted successfully" });
})

export const getJobs = asyncHandler(
    async(req , res , next ) => {
    const {jobId , page, size, companyName} =req.query
    const  company= await DBservice.findOne({
        model: companyModel,
        filter:{ _id: req.params.companyId}
    })
    if (!company) {
        return next(new Error("company not found", { cause: 404 }));
    }
    const filters = {}
    if (jobId) {
        filters._id = jobId
    } else{
        filters.name = companyName
    }
    const data = await pagination({
        model : jopModel,
        filter: filters,
        page,
        size,
        sort:{createdBy: -1},
        populate:{
            path: "companyId",
            select: " name "
        },
    })
    return successResponse({ res , data :{data}});
})

export const Jobs = asyncHandler(
    async (req, res, next) => {
        const {  page , size , jobTitle, workingTime, jobLocation, seniorityLevel, technicalSkills } = req.query;
        const company = await DBservice.findOne({
            model: companyModel,
            filter: {_id: req.params.companyId}
        })
        if (!company) {
            return next(new Error("company not found", { cause: 404 }));
        }
    const filter = {}
    if(seniorityLevel){filter.seniorityLevel = seniorityLevel}
    if(technicalSkills){filter.technicalSkills = technicalSkills}
    if(jobLocation){filter.jobLocation = jobLocation}
    if(jobTitle){filter.jobTitle = jobTitle}
    if(workingTime){filter.workingTime = workingTime}




    // switch (filter) {
    //     case jobTitle:
    //         filter.jobTitle = jobTitle
    //         break;
    //     case workingTime:
    //         filter.workingTime = workingTime
    //         break;
    //     case jobLocation:
    //         filter.jobLocation = jobLocation
    //         break;
    //     case seniorityLevel:
    //         filter.seniorityLevel = seniorityLevel
    //         break;
    //     case technicalSkills:
    //         filter.technicalSkills = technicalSkills
    //         break;
    //         default:
    //             break;
    //     }
        const data = await pagination({
            model: jobModel,
            filter: filter,
            size,
            page,
            sort: {createdBy: -1}
        })
        return successResponse({ res , data :{data}})
})



