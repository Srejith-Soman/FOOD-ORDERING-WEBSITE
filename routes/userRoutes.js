import express from 'express'
import { deleteUser, login, profile, register, updateUser } from '../controllers/userController.js'
import authMiddleware from '../middlewares/authMiddleware.js';

const userRouter = express.Router()

userRouter.post("/register",register);
userRouter.post("/login",login)
userRouter.get("/profile", authMiddleware, profile)
userRouter.patch("/update", authMiddleware, updateUser)
userRouter.delete("/delete-user/:userId", deleteUser)


export default userRouter;