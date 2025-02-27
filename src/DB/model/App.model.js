import mongoose ,{Types, model ,Schema} from 'mongoose';
export const statusTypes =[ "pending", 'accepted', 'rejected']

const appSchema = new Schema({
    jobId: { type: Types.ObjectId, ref: 'Job', required: true},
    userId: { type: Types.ObjectId, ref: 'User',required: true},
    userCV: {secure_url: String , public_id: String},
    status: {
        type: String,
        enum: Object.values(statusTypes),
        default: 'pending',
    },
    email:{
        type:String,
        unique: true,
        required:true
    },

}, {
    timestamps: true, toObject:{virtuals: true}, toJSON:{virtuals:true}});

appSchema.virtual("userData",{
        localField: 'userId',
        foreignField: '_id',
        ref: "user",
        justOne :true
    })
const appModel = mongoose.models.App || model('App', appSchema);
export default appModel;
