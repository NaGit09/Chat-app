import express from 'express'
import { protectRoute } from '../middleware/auth.middleware';
import { getMessages, getUserFromSidebar } from '../controller/message.controller';
const router  = express.Router()
router.get("/users" ,protectRoute,getUserFromSidebar)
router.get("/:id" , protectRoute , getMessages)
router.post("/send/:id", protectRoute , sendMessage)
export default router;