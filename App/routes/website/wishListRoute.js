let express=require("express");
const { checkToken } = require("../../middlewares/checkToken");
const { addWishList, getDataWishlist, deleteWishList } = require("../../controllers/website/wishList");
let wishListRoute=express.Router();

wishListRoute.post('/addwishlist',checkToken,addWishList);
wishListRoute.post('/viewwishlist',checkToken,getDataWishlist);
wishListRoute.delete('/deletewishlist',checkToken,deleteWishList);

module.exports={wishListRoute};