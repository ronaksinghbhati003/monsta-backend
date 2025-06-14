const express=require("express");
const { checkToken } = require("../../middlewares/checkToken");
const { addToCartProduct, viewCart, updateQuantity, customQuantity, removeCart } = require("../../controllers/website/addToCart");
const cartRoute=express.Router();

cartRoute.post('/addtocart',checkToken,addToCartProduct);
cartRoute.post('/viewcart',checkToken,viewCart);
cartRoute.put('/updatequantity',updateQuantity)
cartRoute.post('/customcart',customQuantity);
cartRoute.delete('/removecart/:id',removeCart);

module.exports={cartRoute};