let express=require("express");
const { models } = require("mongoose");
const { webProduct, webProductDetail, megaMenu, featuredProduct, getSliderData, topRated, whyChooseUs, testimoanial } = require("../../controllers/website/websiteProduct");
let webProductRoute=express.Router();

webProductRoute.get('/view',webProduct);
webProductRoute.get('/productdetail/:id',webProductDetail)
webProductRoute.get('/megamenu',megaMenu);
webProductRoute.get('/featured',featuredProduct);
webProductRoute.get('/slider',getSliderData);
webProductRoute.get('/toprated',topRated);
webProductRoute.get('/whychooseus',whyChooseUs);
webProductRoute.get('/testimoanial',testimoanial);

module.exports={webProductRoute};