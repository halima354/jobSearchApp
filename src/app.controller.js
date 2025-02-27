import { connectionDB } from './DB/connection.js'
import { schema } from './modules/admin/modules.schema.js'
import { createHandler } from 'graphql-http/lib/use/express'
import authController from './modules/auth/auth.controller.js'
import userController from './modules/user/user.controller.js'
import companyController from './modules/company/company.controller.js'
import playground from 'graphql-playground-middleware-express'
import appController from './modules/App/app.controller.js'
import chatController from './modules/chat/chat.controller.js'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

const AppLimiter = rateLimit({
    limiter:1000,
    windowMs: 5*60*1000,
    message: " Please Try Again After 5 Minutes",
    legacyHeaders: false,
    standardHeaders: "draft-8"
})

const authlimiter = rateLimit({
    limiter:3,
    windowMs: 5*60*1000,
    message: " Please Try Again After 5 Minutes",
    legacyHeaders: false,
    standardHeaders: "draft-8"
})
const bootstrap = (app, express) => {
    app.use(express.json())
    app.use(helmet())
    app.use(cors())
    app.use(AppLimiter)
    app.use('/auth',authlimiter)
    
    
    app.get("/palyGround", playground.default({endpoint:"/graphql"}))
    app.use('/graphql', createHandler({ schema}))

    app.get("/", (req, res, next) => {
        return res.status(200).json({ message: "Welcome in node.js project powered by express and ES6" })
    })
    app.use("/auth", authController)
    app.use("/user", userController)
    app.use("/company", companyController)
    app.use("/app", appController)
    app.use("/chat", chatController)

    app.all("*", (req, res, next) => {
        return res.status(404).json({ message: "In-valid routing" })
    })
connectionDB()
}

export default bootstrap