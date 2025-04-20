import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMessages, getUserFromSidebar ,sendMessage } from '../controller/message.controller.js';
// routes message api
const router  = express.Router()
router.get("/users" ,protectRoute,getUserFromSidebar)
router.get("/:id" , protectRoute , getMessages)
router.post("/send/:id", protectRoute , sendMessage)
export default router;