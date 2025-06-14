let express=require("express");
let multer=require('multer');
const {  registerUser, insertUser, updateUser, viewUser, getOtp } = require("../../controllers/website/register");
const { models } = require("mongoose");
const { checkToken } = require("../../middlewares/checkToken");
let registerRoute=express.Router();

let upload=multer({storage:''});

registerRoute.post('/register',upload.none(),registerUser);
registerRoute.post('/insert',upload.none(),insertUser);
registerRoute.post('/viewuser',checkToken,viewUser);
registerRoute.post('/update',checkToken,updateUser)
registerRoute.post('/otp',getOtp);

module.exports={registerRoute};