import  mongoose ,{ Schema, model } from "mongoose"
import CryptoJS from "crypto-js"
export const roleTypes = {admin: 'admin',user: 'user'}
export const genderTypes ={ female: "female",male: "male"}
export const providerTypes ={ system: "system",google: "google"}

const userSchema = new Schema({
    firstName:{
    type: String,
    required:true,
    minLength:2,
    maxLength:20,
    trim:true
    },
    lastName:{
        type: String,
        required:true,
        minLength:2,
        maxLength:20,
        trim:true
    },
    password:{
        type:String,
        
    },
    email:{
        type:String,
        unique: true,
        required:true
    },
    confirmEmail:{
        type:Boolean,
        default:false

    },
    isDeleted:{
        type:Boolean,
        default:false

    },
    gender:{
        type:String,
        enm: Object.values(genderTypes),
        default: genderTypes.male
        },
    provider:{
        type:String,
        enm: Object.values(providerTypes),
        default:providerTypes.system
            },
    role:{
        type:String,
        enm: Object.values(roleTypes),
        default:roleTypes.user
    },

    OTPExpiry: Date,
    
    profilePic:{ secure_url:String ,public_id: String},
    coverPic:[{ secure_url:String ,public_id: String}],
    DOB : Date,
    phone:String,
    changeCredentialTime:Date,
    emailOTP:String,
    updateEmailOTP:String,
    tempEmail:String,
    forgetPasswordOTP:String,
    deletedAt:Date,
    updatedBY:Date,
    bannedAt:Date,
},{timestamps: true, toObject: { virtuals: true}, toJSON:{virtuals: true}})

userSchema.virtual('username').set(function(value) {
    this.firstName= value.split(" ")[0]
    this.lastName= value.split(" ")[1]
})
.get( function(){
    return this.firstName + " " + this.lastName
})

userSchema.post('findOne', function (doc) {
    if (doc && doc.phone) {
    const decryptedPhone = CryptoJS.AES.decrypt(doc.phone,process.env.ENCRYPTION_SIGNATURE).toString(CryptoJS.enc.Utf8)
    doc.phone = decryptedPhone;
    }
});
const userModel = mongoose.models.User || model("User", userSchema)
export default userModel