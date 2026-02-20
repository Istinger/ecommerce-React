//middleware for api that need admin permission, like adding product,removing 
import jwt from 'jsonwebtoken';

const adminAuth = async (req,res,next)=>{
    try {
        const {token} = req.headers;
        if (!token) {
            return res.json({success:false,message:"Unauthorized Access, No token"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({success:false,message:"Unauthorized Access, No token"})
        }
        next();//proceed to next middleware or controller with user data saved in req object
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

export default adminAuth;