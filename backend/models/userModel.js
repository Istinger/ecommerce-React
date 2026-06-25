import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },//it cant be repeated email is already used in another account
    password: { type: String, required: true },
    cartData:{type: Object, default:{}}//whenever a user is created, cartData will be an empty object{} (default value)
},{minimize:false});//save empty objects in mongoose

const userModel = mongoose.models.user || mongoose.model('user',userSchema);
export default userModel;