let express= require("express");
let multer=require("multer");
const { insertLogin, resetPassword, updatePassword, chnagePassword, googleLogin } = require("../../controllers/website/login");
const { checkToken } = require("../../middlewares/checkToken");
let loginRoute=express.Router();

let upload=multer({storage:''});
loginRoute.post('/insert',upload.none(),insertLogin);
loginRoute.post('/resetpassword',resetPassword);
loginRoute.post('/newpassword',updatePassword);
loginRoute.post('/changepassword',checkToken,chnagePassword);
loginRoute.post('/google-login',googleLogin);
module.exports={loginRoute};