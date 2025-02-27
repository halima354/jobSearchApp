import mongoose from "mongoose";
export const connectionDB = (req, res, next )=>{
    return  mongoose.connect(process.env.DB_URI).then(res =>{
        console.log(' connect DB');
        
    }).catch(error =>{
        console.error("fail to connect");
        
    })
}