let express=require("express");
const { getRelatedProduct, upToSell } = require("../../controllers/website/relatedProduct");
let relatedRoute=express.Router();

relatedRoute.get('/getdata',getRelatedProduct);
relatedRoute.get('/uptosell',upToSell);
module.exports={relatedRoute};