import express from 'express';
import { loginUser,registerUser,adminLogin } from '../controllers/userController.js';

//create one user router
const userRouter = express.Router();

//GET POST METHOD

userRouter.post('/register',registerUser);//endpoint to register user
userRouter.post('/login',loginUser);//endpoint to login user
userRouter.post('/admin',adminLogin);//endpoint for admin login

export default userRouter;