let express=require("express");
const { models } = require("mongoose");
const { webProduct, webProductDetail, megaMenu, featuredProduct, getSliderData } = require("../../controllers/website/websiteProduct");
let webProductRoute=express.Router();

webProductRoute.get('/view',webProduct);
webProductRoute.get('/productdetail/:id',webProductDetail)
webProductRoute.get('/megamenu',megaMenu);
webProductRoute.get('/featured',featuredProduct);
webProductRoute.get('/slider',getSliderData);

module.exports={webProductRoute};