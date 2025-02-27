import { asyncHandler } from "../../../utils/response/error.response.js";
import * as  DBservice from '../../../DB/DBservice.js'
import companyModel from "../../../DB/model/Company.model.js";
import { successResponse } from "../../../utils/response/success.response.js";
import { roleTypes } from "../../../DB/model/User.model.js";
import { cloud } from "../../../utils/multer/cloudinary.js";
import userModel from "../../../DB/model/User.model.js";

export const addCompany = asyncHandler(async(req, res, next)=>{
    const {name, email, description, industry, address, numberOfEmployees , HRS, legalAttachment} = req.body
    const checkCompany= await DBservice.findOne({
        model: companyModel,
        filter: {email , name , isDeleted: { $exists: false }
    }
    })
    if (checkCompany) {
        return next(new Error("email or name exist",{cause: 409}))
    }
    if (!req.file) {
        return next(new Error('No file uploaded'));
    }
    const {secure_url, public_id}= await cloud.uploader.upload(req.file.path,{folder: "jopSearchApp/company"})
    const apply = await DBservice.create({
            model: companyModel,
        data:{
            name, email, description, industry, address, numberOfEmployees, userId:req.user._id, HRS,
            legalAttachment:{secure_url, public_id}
        },
        option: {new: true}
    })
    return successResponse({res, message: "add successfully" })
})

export const updateCompany= asyncHandler(async(req, res, next)=> {
    const checkCompany= await DBservice.findOne({
        model: companyModel,
        filter:{
            _id :req.params.companyId,
            //isDeleted: {$exists: false}
            },
    })
    if (!checkCompany) {
        return next (new Error("not found this company", {cause: 404}))
    }
    if (req.user._id.toString() == checkCompany.userId.toString()) {
        await DBservice.updateOne({
            model: companyModel,
            filter:{_id :req.params.companyId},
            data:{
                ... req.body,
            }
        })
        return successResponse({res, message: "update Successfully"})
    }
    return next (new Error(" not allow you to update this company"))
})

export const  deleteCompany= asyncHandler(async( req, res, next) => {
    const owner = req.user.role=== roleTypes.admin? {} : {userId: req.user._id}
    const company = await DBservice.findOneAndUpdate({
        model:companyModel,
        filter:{
            _id:req.params.companyId,
            ...owner
        },
        data:{
            isDeleted: true
        }
    })
    return company? successResponse({res, message: "deleted successfully"}) : next(new Error("not found company",{cause: 404}))
})

export const search = asyncHandler(async(req, res, next)=>{
    const{name}= req.query
    const company = await DBservice.findOne({
        model: companyModel,
        filter:{
            isDeleted: {$exists: false},
            name
        }
    })
    if (!company) {
        return next(new Error("not found company",{cause: 404}))
    }
    return successResponse({res, data :{ company }})
})

export const  uploadLogo= asyncHandler(
    async(req, res, next) =>{
        if (!req.file) {
            return next(new Error('No file uploaded'));
        }
        const {secure_url, public_id}= await cloud.uploader.upload(req.file.path,{folder: "jopSearchApp/companyLogo"})
        const company= await DBservice.findByIdAndUpdate({
            model: companyModel,
            id :req.params.companyId,
            data:{
                logo: {secure_url, public_id}
            },
            option: {new: true}
        })
        return successResponse({res, data: { company } })
})

export const uploadCoverImage =asyncHandler(
    async(req, res, next) =>{
        const images = []
        for (const file of req.files) {
            const {secure_url, public_id}= await cloud.uploader.upload(file.path, {folder: "JobSearchApp/company/cover"})
            images.push({secure_url, public_id})
        }
        

        const company= await DBservice.findByIdAndUpdate({
            model:companyModel,
            id: req.params.companyId,
            data:{
                coverPic: images
            }
        })
        return successResponse({res, data: {company}})
})

export const deleteLogo = asyncHandler(async(req, res, next)=>{
    const company = await DBservice.findOneAndUpdate({
        model:companyModel,
        filter:{
            _id: req.params.companyId,
            userId: req.user._id
            },
        data:{
            $unset: {logo: req.params.companyId}
            },
        options:{new: true},
            })
    return company? successResponse({res, data: {company}}) : next (new Error("not allow to delete this photo", {cause: 400}))
})

export const deleteCoverPic = asyncHandler(async (req, res, next) => {
    const { public_id } = req.body
    if (!public_id) {
        return next(new Error("public_id is required", { cause: 400 }));
    }
    const company = await DBservice.findOneAndUpdate({
        model: companyModel,
        filter: {
            _id: req.params.companyId,
            userId: req.user._id,
        },
        data: {
            $pull: { coverPic: { public_id } },
        },
        options: { new: true },
    });
    if (!company) {
        return next(new Error("Company not found or not authorized to delete this photo", { cause: 400 }));
    }

    // رد بنجاح مع بيانات الشركة بعد الحذف
    return successResponse({ res, data: { company }, message: "Cover photo deleted successfully" });
});

export const getCompany = asyncHandler(async(req, res, next) =>{
    const {companyId} = req.params
    const company = await DBservice.findOne({
        model : companyModel,
        filter:{
            _id: companyId,
        },
        populate:{path:"jobs"}
    })
    return successResponse({res, data :{company}})
})
