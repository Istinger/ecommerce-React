//allow user to create an account or login
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";


//to create new tocken using id property of user

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


//Route for user login
const loginUser = async (req,res) =>{
    //login using get email and passwword, then will generate token
    try {
        const {email,password} = req.body;
        //check if user exists
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success:false,message:"User doesn't exists"});
        }
        //first password from form or req body and second is hashed password from database
        const isMatch = await bcrypt.compare(password,user.password);

        if (isMatch) {
            //generate token and send to user
            const token = createToken(user._id);//from database
            res.json({success:true,token});
        }else{
            res.json({success:false,message:"Invalid credentials"});
        }


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }

}

//Route for user registration
const registerUser = async (req,res)=> {
    //res.json({message:"API WORKING"})
    try {
        const {name,email,password} = req.body;
        //check if user already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }
        
        //validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }
        
        //once it passes all checks, create new account, but before hash password and store in database
        const salt = await bcrypt.genSalt(10);//generate salt
        const hashedPassword = await bcrypt.hash(password,salt);//hash password with salt

        //create new user
        const newUser = new userModel({
            name,
            email,
            password:hashedPassword//store hashed password
        })

        const user = await newUser.save();//save new user to database

        //provide token to user for login to app
        const token = createToken(user._id);

        res.json({success:true,token})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});//send error message to frontend
    }
}

//(ROUTE)endpoint for admin login

const adminLogin = async (req,res) => {
    
}

export {loginUser, registerUser, adminLogin};