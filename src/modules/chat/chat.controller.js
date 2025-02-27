import { Router } from "express";
import * as chatService from './service/chat.service.js'
import {authentication} from '../../middleware/auth.middleware.js'
const router = Router()
router.get("/:receiverId/historyChat",
    authentication(),
    chatService.historyChat)
export default router