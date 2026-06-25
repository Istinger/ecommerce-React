//add product
import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';

//since everyone can add a product, we need to add autentication, solo only admin can add it
const addProduct = async (req, res) => {
    //create middleware using multer, if we send a file as form data, then this file will be pass using multer
    try {
        const {name,description,price,category,subCategory,sizes,bestseller} = req.body;
        //check if files are present
        const image1 =req.files.image1 && req.files.image1[0]
        const image2 =req.files.image2 && req.files.image2[0]
        const image3 =req.files.image3 && req.files.image3[0]
        const image4 =req.files.image4 && req.files.image4[0]
        // but this images cant be stored directly in database, we need to upload them to cloudinary get the url and then store the url in database
        const images = [image1,image2,image3,image4].filter((item)=>item !== undefined)//the images that are undefined will be removed with filter  

        //get url after uploading to cloudinary
        const imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url;
            })
        )

        // console.log(req.files);
        // console.log(name,description,price,category,subCategory,sizes,bestseller)
        // //console.log(image1,image2,image3,image4)
        // console.log(imagesUrl);

        const productData = {
            name,
            description,
            price:Number(price),
            category,
            subCategory,
            bestseller: bestseller === 'true' ? true : false,
            sizes: JSON.parse(sizes),//convert string to array
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);
        const product = new productModel(productData);
        await product.save();
        res.json({success:true, message:"Product added successfully"})

    } catch (error) {
        console.log(error);        
        res.json({success:false,message:error.message});
    }
};
//list products
const listProducts = async (req, res) => {
    try {
        
        //fetch all products from database
        const products = await productModel.find({});
            res.json({success:true,products}
        )
    } catch (error) {
        console.log(error);        
        res.json({success:false,message:error.message});
    }
};
//remove product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product removed successfully"})
    } catch (error) {
        console.log(error);        
        res.json({success:false,message:error.message});
    }
};
//single product info
const singleProduct = async (req, res) => {
    try {
        const{productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success:true,product});
    } catch (error) {
        console.log(error);        
        res.json({success:false,message:error.message});
    }
};

export { addProduct, listProducts, removeProduct, singleProduct };
