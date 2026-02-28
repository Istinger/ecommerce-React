import { response } from 'express'
import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'


//placing orders using COD method //Cash on delivery

const placeOrder = async (req,res)=>{
    try {
        //user id will be get from token headers from auth.js middleware
        const {userId,items,amount,address} = req.body
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:'COD',
            payment:false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        //clear data from cart 
        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"Order Placed"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//placing orders using Stripe method

const placeOrderStripe = async (req,res)=>{
    
}

//placing orders using RazorPay

const placeOrderRazorpay = async (req,res)=>{
    
}
// All orders data for admin panel


const allOrders = async (req,res)=>{
    
}
// User Order Data for Frontend


const userOrders = async (req,res)=>{
    
}

//update order status for changing Order Placed, only admin can change it

const updateStatus = async (req,res)=>{
    
}

export{placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus}