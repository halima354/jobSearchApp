import mongoose, { Schema, Types, model } from "mongoose";

const companySchema = new Schema({
    name: {
        type:String,
        unique:true,
        required: true
    },
    description:{
        type: String,
        required:true,
        maxLength:1000,
        minLength:4
    },
    industry: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    numberOfEmployees: String,
    approvedByAdmin:{
        type: Boolean,
        default: false
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
    userId:{type: Types.ObjectId , ref: "User", required:true},
    userInfo:{type: Types.ObjectId , ref: "User"},
    logo:{ secure_url: String , public_id: String },
    legalAttachment: { secure_url: String, public_id: String },
    coverPic:[ {secure_url: String , public_id: String} ],
    HRS:[ { type: Types.ObjectId , ref: "User" } ],
    bannedAt : Date,
    deletedAt : Date,
    
},{timestamps: true, toObject:{virtuals:true },toJSON:{virtuals:true}})

companySchema.virtual("jobs",{
    localField: "_id",
    foreignField:"companyId",
    ref:"Job"
})
const companyModel= mongoose.models.Company || model("Company", companySchema)
export default companyModel