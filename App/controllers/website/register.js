const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const saltRound = 10;
const { transporter } = require("../../Config/mailConfig");
const { registerModel } = require("../../models/website/registerModel");
let myOtp = new Map();
let registerUser = async (req, res) => {
    try {
        console.log(req.body);
        let { registerEmail } = req.body;
        let otp = String(Math.floor(Math.random() * 10000)).slice(0, 4);
        myOtp.set("otp", otp);
        let info = await transporter.sendMail({
            from: '"Monsta Verification" <singhbhatironak2004@gmail.com>',
            to: registerEmail,
            subject: "Monsta",
            text: "OTP",
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
        console.log(info);
        res.send({
            status: 1,
            msg: "Otp Sent Succefully"
        });
    }
    catch (error) {
        res.send({
            status: 0,
            msg: "Something Went Wrong",
            error
        })
    }
}

let insertUser = async (req, res) => {
    try {
        console.log(req.body);
        let { registerEmail, registerPassword, registerAddress, registerNumber, registerOtp, registerUserName } = req.body;
        let hashPass = bcrypt.hashSync(registerPassword, saltRound);
        console.log(hashPass);
        let obj = {
            userName: registerUserName,
            userEmail: registerEmail,
            userPassword: hashPass,
            userAddress: registerAddress,
            userNumber: registerNumber,
            userStatus: true,
        }

        let resObj;
        if (registerOtp == myOtp.get("otp")) {
            obj["verifyEmail"] = true;
            let insertData = await registerModel(obj).save();
            resObj = {
                status: 1,
                msg: "User Register Succefully",
                insertData
            }
        }
        else {
            resObj = {
                status: 0,
                msg: "Invalid Otp",
            }
        }


        res.send(resObj)
    }
    catch (error) {
        res.send({
            status: 0,
            msg: "Email Address Already Exist",
            error
        })
    }
}


let viewUser = async (req, res) => {
    try {
        let { id } = req.body;
        let findUser = await registerModel.findOne({ _id: id }).select(['userEmail', 'userName', 'userNumber', 'userAddress']);
        res.send({
            status: 1,
            msg: "Data Found",
            findUser
        })
    }
    catch (error) {
        res.send({
            status: 0,
            msg: "Something Went Wrong",
            error
        })
    }
}

let getOtp = async (req, res) => {
    try {
        let { email } = req.body;
        //let alreadyExist = await registerModel.findOne({ userEmail: email });
        /*if (alreadyExist) {
            res.send({
                status: 0,
                msg: "This Email You Using Currently"
            })
        }*/
            let otp = String(Math.floor(Math.random() * 10000)).slice(0, 4);
            myOtp.set('otp', otp);
            console.log(myOtp.get('otp'));
            let info = await transporter.sendMail({
                from: '"Monsta Verification <singhbhatironak2004@gmail.com>"',
                to: email,
                subject: "Monsta",
                text: "OTP",
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
            console.log(info);
            res.send({
                status:1,
                msg:"Otp Sent Succefully"
            })
    }
    catch (error) {
        res.send({
            status: 0,
            msg: "Something Went Wrong",
            error
        })
    }
}

let updateUser = async (req, res) => {
   try{
        let{name,email,address,number,otp,id}=req.body;
        if(myOtp.get('otp')==otp){
            let updateUserProfile=await registerModel.updateOne({_id:id},{
                $set:{
                    userName:name,
                    userEmail:email,
                    userAddress:address,
                    userNumber:number
                }
            })
            let userData={
                id:id,
                email:email,
                userName:name
            }
            let token=jwt.sign(userData,process.env.SECRET_KEY);
           res.send({
            status:1,
            msg:"Profile Updated",
             userData,
             token
           })
        }
        else{
            res.send({
                status:0,
                msg:"Please Entert Valid Otp"
            })
        }
   }
   catch(error){
       res.send({
            status: 0,
            msg: "Something Went Wrong",
            error
        })
   }
}

module.exports = { registerUser, insertUser, viewUser, updateUser, getOtp };