import  mongoose ,{ Schema, model, Types } from "mongoose"
export const typesLocations=["onsite","remotely","hybrid"]
export const seniorityLevel=["fresh","junior","mid-level","senior","team-lead","CTO"]
export const workingTime =["part-time","full-time"]

const jobSchema = new Schema({
    jobTitle: {
        type: String,
        required: true,
    },
    jobLocation: {
        type: String,
        enum: Object.values(typesLocations),
        required: true,
    },
    workingTime: {
        type: String,
        enum: Object.values(workingTime),
        required: true,
    },
    seniorityLevel: {
        type: String,
        enum: Object.values(seniorityLevel),
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    technicalSkills: {
        type: [String],
        required: true,
    },
    softSkills: {
        type: [String],
        required: true,
    },
    closed: {
        type: Boolean,
        default: false,
    },
    addedBy: { type: Types.ObjectId, ref: 'User', required: true},
    updatedBy: { type: Types.ObjectId, ref: 'User'},
    companyId: { type:Types.ObjectId, ref: 'Company', required: true}
}, { timestamps: true , toObject:{virtuals:true },toJSON:{virtuals:true}});

jobSchema.virtual("applications",{
    localField: "_id",
    foreignField: "jobId",
    ref:"App"
})

const jobModel = mongoose.models.Job ||  model('Job', jobSchema);
export default jobModel;
