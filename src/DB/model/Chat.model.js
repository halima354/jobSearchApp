import mongoose, { Types,  Schema , model } from 'mongoose';

const chatSchema = new  Schema({
    senderId: {type: Types.ObjectId, ref: 'User', required: true},
    receiverId: {type: Types.ObjectId, ref: 'User', required: true},
    messages: [{
    message: { type: String, required: true},
    senderId: { type: Types.ObjectId, ref: 'User',required: true},
    }],
}, {timestamps: true , strictPopulate: false});

const chatModel = mongoose.models.Chat  || model('Chat', chatSchema);
export default chatModel;
