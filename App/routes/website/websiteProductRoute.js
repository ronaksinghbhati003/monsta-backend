let express=require("express");
const { models } = require("mongoose");
const { webProduct, webProductDetail } = require("../../controllers/website/websiteProduct");
let webProductRoute=express.Router();

webProductRoute.get('/view',webProduct);
webProductRoute.get('/productdetail/:id',webProductDetail)

module.exports={webProductRoute};