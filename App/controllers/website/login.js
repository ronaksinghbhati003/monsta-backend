let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const saltRound = 10;
let { transporter } = require("../../Config/mailConfig")
const { registerModel } = require("../../models/website/registerModel");
let resetPassOtp = new Map();
let insertLogin = async (req, res) => {
    try {
        let { loginEmail, loginPass } = req.body;
        let findUser = await registerModel.findOne({ userEmail: loginEmail });
        if (findUser) {
            let check = bcrypt.compareSync(loginPass, findUser.userPassword);
            if (check) {
             
                let obj = {
                id: findUser._id,
                email: findUser.userEmail,
                userName: findUser.userName
                  }
           
                let token = jwt.sign(obj, process.env.SECRET_KEY);
                res.send({
                    status: 1,
                    msg: "Login Succefully",
                    findUser: {
                        userData: obj,
                        token
                    }
                })
            }
            else {
                res.send({
                    status: 0,
                    msg: "Invalid Password"
                })
            }
        }
        else {
            res.send({
                status: 0,
                msg: "Invalid Email Id"
            })
        }
    }
    catch (error) {
        res.send({
            status: 0,
            msg: "This Id login with Google Please login with Google",
            error
        })
    }
}


let resetPassword = async (req, res) => {
    try {
        console.log(req.body);
        let { forgetEmail } = req.body;
        let otp = String(Math.floor(Math.random() * 10000)).slice(0, 4);
        resetPassOtp.set("passOtp", otp);
        console.log(otp);


        setTimeout(() => {
            resetPassOtp.delete('passOtp');
            console.log("Delete Otp Succefully", otp);
        }, 60000)


        let info = await transporter.sendMail({
            from: '"Monsta Website" <singhbhatironak2004@gmail.com>',
            to: forgetEmail,
            subject: "Reset Monsta Password",
            text: "Reset Password",
            html: `
            <div style="display:flex; justify-content:center; text-align:center;">
            <img src="cid:monstaLogo" alt="Monsta Logo" width="200" height="100"/>
            </div>
            <p style="font-size:30px; font-weight:bold;">Your Monsta OTP Code</p>
            <p style="font-size:25px;">
            Hello,
            <br/>
            Your One-Time Password (OTP) to verify your identity on Monsta is:
            <b>OTP</b> ${otp}
            <br/>
            This code is valid for a limited time. Please use it promptly and do not share it with anyone. If you did not request this OTP, you can safely ignore this message.
            <br/>
            Thank You
            <br/>
            Monsta Team
            </p>
            
            `,
            attachments: [
                {
                    filename: "Monsta.png",
                    path: __dirname + "/../../../assests/monsta.png",
                    cid: "monstaLogo"
                }
            ]
        })
        res.send({
            status: 1,
            msg: "Otp Send Succefully",
            info
        });
    }
    catch (error) {
        res.send(
            {
                status: 0,
                msg: "Something Went Wrong",
                error
            }
        )
    }
}


let updatePassword = async (req, res) => {
    try {
        let { forgetEmail, forgetOtp, forgetPass } = req.body;
        let findUser = await registerModel.findOne({ userEmail: forgetEmail });
        let resObj;
        if (findUser) {
            let verifyOtp = resetPassOtp.get("passOtp");
            console.log(verifyOtp);
            if (forgetOtp == verifyOtp) {
                let hashedPass = bcrypt.hashSync(forgetPass, saltRound);
                let updatePass = await registerModel.updateOne({ userEmail: forgetEmail }, {
                    $set: {
                        userPassword: hashedPass
                    }
                })
                resObj = {
                    status: 1,
                    msg: "Password Changes Succefully"
                }
            }
            else {
                resObj = {
                    status: 0,
                    msg: "Invalid Otp"
                }
            }

        }
        else {
            resObj = {
                status: 0,
                msg: "Invalid Email Address"
            }
        }
        res.send(resObj);
    }
    catch (error) {
        res.send(
            {
                status: 0,
                msg: "Something Went Wrong",
                error
            }
        )
    }
}

let chnagePassword=async(req,res)=>{
    try{
        console.log(req.body);
        let{currentPassword,newPassword,confirmPassword,id}=req.body;
        let findUserForChangePassword=await registerModel.findOne({_id:id}).lean();
        console.log(findUserForChangePassword);
        let userLengh=Object.keys(findUserForChangePassword).length;
        let resObj;
        if(userLengh>=1){

            //Return True if Match and Fasle if Not match
            let verifyPass=bcrypt.compareSync(currentPassword,findUserForChangePassword.userPassword);
            if(verifyPass){
                let newPassHash=bcrypt.hashSync(newPassword,saltRound);
                await registerModel.updateOne({_id:id},{$set:{
                    userPassword:newPassHash
                }})
               resObj={
                status:1,
                msg:"Password Changed Succefully"
               }
            }
            else{
               resObj={
                status:0,
                msg:"Please Enter Valid Current Password"
               }
            }

        }
        console.log(userLengh);
        res.send(resObj);
    }
    catch(error){
         res.send(
            {
                status: 0,
                msg: "Something Went Wrong",
                error
            }
        )
    }
}


let googleLogin=async(req,res)=>{
    console.log(req.body);
    let{username,useremail,verified,usePhone}=req.body;
    let obj;
    let resObj;
    try{
        let alreadyExist=await registerModel.findOne({userEmail:useremail});
        if(alreadyExist){
           obj={
            id:alreadyExist._id,
            email:alreadyExist.userEmail,
            userName:alreadyExist.userName
           }
           let token=jwt.sign(obj,process.env.SECRET_KEY)
           resObj={
            status:1,
            msg:"Login Succefully",
            token,
            obj
           }
        }
        else{
             let logInUser=await registerModel({
                userName:username,
                userEmail:useremail,
                userStatus:true,
                verifyEmail:verified,
                userNumber:usePhone
             }).save();

             obj={
                id:logInUser._id,
                email:logInUser.userEmail,
                userName:logInUser.userName
             }
           let token=jwt.sign(obj,process.env.SECRET_KEY);
           resObj={
            status:1,
            msg:"Login Succefully",
            token,
            obj
           }
        }
        res.status(200).json(resObj);
    }
   catch(error){
          res.send(
            {
                status: 0,
                msg: "Something Went Wrong",
                error
            }
        )
   }
}

module.exports = { insertLogin, resetPassword, updatePassword,chnagePassword,googleLogin };