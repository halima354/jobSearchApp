import {asyncHandler} from '../../../utils/response/error.response.js'
import {successResponse} from '../../../utils/response/success.response.js'
import * as  DBservice from '../../../DB/DBservice.js'
import chatModel from '../../../DB/model/Chat.model.js'
export const historyChat = asyncHandler(async(req, res , next) =>{
    const {receiverId} =req.params
    const chat = await DBservice.findOne({
    model: chatModel,
    filter:{
        $or:[
            {
            senderId: req.user._id,
            receiverId: receiverId

            },
            {
                senderId: receiverId,
                receiverId: req.user._id
                
                },
        ]},
        populate:[
            {
                path: "receiverId",
                select: "firstName lastName image "
            },
            {
                path: "senderId",
                select: "firstName lastName image "
            }, {
                path: "messages.senderId",
                select: "firstName lastName image "
            },
        ]
})
    if (!chat) {
    return next( new Error("'No chat history found' "))
    }
        return successResponse({res, data: {chat}})
})