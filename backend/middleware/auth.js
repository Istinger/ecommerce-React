import jwt from 'jsonwebtoken'

const authUser = async (req,res,next) =>{
    const { token } = req.headers;
    if(!token){
        return res.json({success : false,message: 'Not Authorized Login Again' })
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        //get token from userController id object we will set into req.body.userId
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error);
        res.json({success: false,message: error.message})
    }
}
export default authUser