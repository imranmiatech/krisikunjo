import { v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js";


const addProduct = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    // Upload images to cloudinary
    const imageUrls = [];

    for (const key in req.files) {
      const file = req.files[key][0];

      const base64 = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64"
      )}`;

      const uploadResult = await cloudinary.uploader.upload(base64);
      imageUrls.push(uploadResult.secure_url);
    }

    const product = await productModel.create({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      image: imageUrls,
      category: req.body.category,
      subCategory: req.body.subCategory,
      sizes: JSON.parse(req.body.sizes),
      bestseller: req.body.bestseller === "true",
      date: Date.now(),
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({success: true, products})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})   
    }
 
}
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
         res.json({ success: true, message: " product removed"})
    } catch (error) {
          console.log(error);
        res.json({success:false, message:error.message})   
    }
}
const singleProduct = async (req, res) => {
    try {
       const {productId} = req.body
       const product = await productModel.findById(productId)
        res.json({ success: true,product})
    } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})    
    }
}

export {addProduct, listProducts, removeProduct, singleProduct}