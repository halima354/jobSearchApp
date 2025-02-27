import { Server } from "socket.io"
import chatModel from '../../../DB/model/Chat.model.js'
import * as DBService from '../../../DB/DBservice.js'
import { authenticationSocket } from '../../../middleware/auth.socket.middleware copy.js'
import { socketConnection } from "../../../../index.js"
let io = undefined
export const runIo = async(httpServer)=>{

io = new Server( httpServer, {cors: "*"})

const logoutSocket = async(socket)=>{

    return  socket.emit("disconnection", async(authorization)=>{
        const {data,valid} = await authenticationSocket({authorization})
        if (!valid) {
            return  socket.emit("socketError", data)
        }
        socketConnection.delete(data.user._id.toString(), socket.id)
        console.log(socketConnection);
        return "done"
    })

}

io.on("connection", async(socket)=> {
    console.log(socket.id);

socket.on("register", async(dataRegister) =>{
        const{authorization} = dataRegister
        const {data, valid}= await authenticationSocket({authorization})
        console.log({data, valid});
        if (!valid) {
            socket.emit("socket_Error", data)
        }
        socketConnection.set(data.user._id.toString(), socket.id)
        return "done"
    }


    )
    await logoutSocket(socket)

socket.on("sendMessage", async(messageData) =>{
    const {message, authorization ,destId } = messageData
        const {data,valid} = await authenticationSocket({authorization})
    if (!valid) {
        return  socket.emit("socketError", data)
    }
    const  userId= data.user._id
    
    console.log({message, destId, userId});
    // const company = await DBService.findOne({
    //     model : companyModel,
    //     filter:{userId}
    // })
    // if (company.userId.toString() !== userId.toString()   || !company.HRS.includes(userId)) {
    //     return socket.emit("socketError", { message: "Not authorized", status: 403 });
    // }
    let chat = await DBService.findOneAndUpdate({
        model: chatModel,
        filter:{
            $or:[
                {
                senderId: userId,
                receiverId: destId
                },
                {
                senderId: destId,
                receiverId: userId
                    },
            ]},
        data:{
            $push:{messages: { message, senderId: userId}}
        },
        populate:[
            {
                path: "senderId",
                select: "username image "
            },
            {
                path: " receiverId",
                select: "username image "
            },
            {
                path: "messages.senderId",
                select: "username image "
            },
        ]
    })
    if (!chat) {
        chat = await DBService.create({
        model: chatModel,
        data:{
            senderId: userId,
            receiverId: destId,
            messages: { message, senderId: userId}
        }})
    }
    socket.emit("successMessage", {chat, message})
    socket.to(destId).emit("receiveMessage", {chat, message})
    return "done"
    })
})}
export const getIo= ()=>{
    return io
}