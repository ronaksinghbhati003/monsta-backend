const express=require("express");
const { getDataCart, getDataMaterial, getDataColor, getProduct, getHighestPrice, cartFilter } = require("../../controllers/website/cart");
const { CardAction } = require("twilio/lib/rest/content/v1/content");
let cartPageRoute=express.Router();

cartPageRoute.get("/view",getDataCart);
cartPageRoute.get('/material',getDataMaterial);
cartPageRoute.get('/color',getDataColor);
cartPageRoute.get('/getproduct',getProduct);
cartPageRoute.get('/highestprice',getHighestPrice);
cartPageRoute.post('/cartfilter',cartFilter);


module.exports={cartPageRoute};