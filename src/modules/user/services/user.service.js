import { asyncHandler } from "../../../utils/response/error.response.js";
import { successResponse } from "../../../utils/response/success.response.js";
import{compareHash, generateHash} from '../../../utils/security/hash.security.js'
import userModel from "../../../DB/model/User.model.js";
import *as DBService from '../../../DB/DBservice.js'
import { cloud } from "../../../utils/multer/cloudinary.js";

export const getProfile = asyncHandler(
    async(req , res , next ) => {
        const user = await DBService.findOne({
            model: userModel,
            filter:{ _id: req.user._id ,isDeleted: false},
            select:"phone"
            
        })
        return successResponse({res , data: {user}})
})

export const getAntherProfile = asyncHandler(
    async(req , res , next ) => {
        const {userId} = req.params
        if (!await DBService.findOne({
            model :userModel,
            filter:{_id: userId}
        })) {
            return next (new Error("invalid account", {cause:404}))
        }
        const user = await DBService.findOne({
            model: userModel,
            filter:{ _id: userId ,isDeleted: false},
            select:"firstName lastName phone"
        })
        return successResponse({res , data: {user}})
})

export const updateProfile =asyncHandler(
    async(req, res, next) =>{
        const user = await DBService.findByIdAndUpdate({
            model: userModel,
            id: req.user._id,
            data: req.body,
            option: {new: true}
        })
        return successResponse({res, data: {user}})
})

export const updatePassword= asyncHandler(
    async(req, res, next) =>{
        const{oldPassword, password} = req.body
        if(!compareHash({ plainText:  oldPassword , hashValue: req.user.password })){
            return next (new Error("invalid old password", {cause: 404}))
        }
        const user= await DBService.findByIdAndUpdate({
            model :userModel,
            id: req.user._id,
            data: {
                password: generateHash({plainText: password}),
                changCredentialsTime: Date.now()
            },
            option: {new: true}
        })
        if (!user) {
            return next (new Error("invalid user account", {cause: 400}))
        }
        return successResponse({res, data: {}})
})

export const  uploadImage= asyncHandler(
    async(req, res, next) =>{
        if (!req.file) {
            return next(new Error('No file uploaded'));
        }
        const {secure_url, public_id}= await cloud.uploader.upload(req.file.path,{folder: "jopSearchApp/userPic"})
        const user= await DBService.findByIdAndUpdate({
            model: userModel,
            id :req.user._id,
            data:{
                profilePic: {secure_url, public_id}
            },
            option: {new: true}
        })
        return successResponse({res, data: { user}})
})

export const coverImage =asyncHandler(
    async(req, res, next) =>{
        const images = []
        for (const file of req.files) {
            const {secure_url, public_id}= await cloud.uploader.upload(file.path, {folder: "JobSearchApp/coverPic"})
            images.push({secure_url, public_id})
        }
        const user= await DBService.findByIdAndUpdate({
            model:userModel,
            id: req.user._id,
            data:{
                coverPic: images
            }
        })
        return successResponse({res, data: {user}})
})

export const deleteAccount = asyncHandler(async(req, res, next)=>{
    const user = await DBService.findOneAndUpdate({
        model:userModel,
        filter:{_id:req.user._id},
        data:{
            isDeleted:true
        },
        options:{new: true},
        select: " isDeleted"
    })
    return successResponse({res, data: {user}})
})

// export const deleteProfilePic = asyncHandler(async(req, res, next)=>{
//     const user = await DBService.findOneAndUpdate({
//         model:userModel,
//         filter:{_id:req.user._id},
//         data:{
//             $unset: { profilePic: req.user.profilePic }
//         },
//         options:{new: true},
//     })
//     return successResponse({res, data: {user}})
// })

export const deleteProfilePic = asyncHandler(async(req, res, next)=>{
    const{userId} = req.params
    if (req.user._id == userId) {
        const user = await DBService.findOneAndUpdate({
                    model:userModel,
                    filter:{_id:userId},
                    data:{
                        $unset: { profilePic: req.user.profilePic }
                    },
                    options:{new: true},
                })
                return successResponse({res, data: {user}})
    }
    return next (new Error("not allow to delete this photo", {cause: 400}))
})

export const deleteCoverPic = asyncHandler(async(req, res, next)=>{
    const{userId} = req.params
    if (req.user._id == userId) {
        const user = await DBService.findOneAndUpdate({
                    model:userModel,
                    filter:{_id:userId},
                    data:{
                        $pull: { coverPic : req.body}
                    },
                    options:{new: true},
                })
                return successResponse({res, data: {user}})
    }
    return next (new Error("not allow to delete this photo", {cause: 400}))
})

// export const deleteCoverPic = asyncHandler(async(req, res, next)=>{
//     const{userId} = req.params
//     const {picId} = req.body
//     if (!await userModel.findById( picId)) {
//         return next (new Error("invalid pic id"))
//     }
//     if (req.user._id == userId) {
//         const user = await DBService.findOneAndUpdate({
//                     model:userModel,
//                     filter:{_id:userId},
//                     data:{
//                         $pull: { coverPic : picId}
//                     },
//                     options:{new: true},
//                 })
//                 return successResponse({res, data: {user}})
//     }
//     return next (new Error("not allow to delete this photo", {cause: 400}))
// })

