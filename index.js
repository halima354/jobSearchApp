import path from 'node:path'
import  express  from 'express'
import * as dotenv from 'dotenv'
import  bootstrap  from './src/app.controller.js'
import { runIo } from './src/modules/chat/socket/socket.controller.js'
dotenv.config({path:path.resolve("./src/config/.env.prod")})
const app = express()
const port = process.env.PORT
bootstrap(app , express)
const httpServer= app.listen(port, () => console.log(`Example app listening on port ${port}!`) )
export const socketConnection =  new  Map()
runIo(httpServer)









