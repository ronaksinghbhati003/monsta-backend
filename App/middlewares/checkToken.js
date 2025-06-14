let jwt=require("jsonwebtoken");
const { registerModel } = require("../models/website/registerModel");

let checkToken= async (req,res,next)=>{
    try{
    //let{_id,currentPassword,newPassword,confirmPassword}=req.body;
      let token=req.headers.authorization.split(" ")[1];
      console.log(token);
      /*let obj={
         id:verifyToken._id,
         email:verifyToken.userEmail,
         userName:verifyToken.userName
      }*/

      let tokenVerify=jwt.verify(token,process.env.SECRET_KEY);
      console.log(tokenVerify);
      req.body.id=tokenVerify.id;
      next();
    }
    catch(error){
        res.send({
           status:0,
           msg:"User not Valid"
        })
    }
}

module.exports={checkToken};