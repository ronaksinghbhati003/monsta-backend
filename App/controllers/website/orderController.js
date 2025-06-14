const { orderModel } = require("../../models/orderModel");
const { cartModel } = require("../../models/website/addToCartModel");
const Razorpay = require("razorpay");
const crypto=require("crypto");
const { registerModel } = require("../../models/website/registerModel");    
const { send } = require("process");
const twillo=require('twilio');
const { stat } = require("fs");

const accountSid=process.env.TWILO_SID   
const authToken=process.env.AUTH_TOKEN 
const fromNumber="+16207098783";

const razorpay = new Razorpay({
    key_id: process.env.KEY_ID, //'rzp_test_WAft3lA6ly3OBc',
    key_secret: process.env.KEY_SECRET//'68E17CNWY8SemCvZ6ylOkuOY'
})
let addOrder = async (req, res) => {
    try{
        console.log(req.body);
        let userId = req.body.id;
        delete req.body.id;
        delete req.body.email;
        req.body.userName;
        let insertObj = req.body;
        let resObj;
        const toNumber='+'+91+req.body.shippingAddress.phone;
        const client= new twillo(accountSid,authToken);
        let sendSms=()=>{
              client.messages.create({
                body:"Your Order Place Succefully Thank You for Shopping have you great day,Monsta 😊",
                to:toNumber,
                from:fromNumber
            })
            .then(message=> console.log('Message sent. SID:', message.sid))
            .catch(err=> console.error('Error sending message:', err)) 
        }
        if (req.body.paymentMethod === "1") {
            insertObj["orderStatus"] = "process";
            insertObj["orderUser"] = userId;
            let orderSave = await orderModel(insertObj).save();
            let deleteCart = await cartModel.deleteMany({ userId });
            sendSms();
            resObj = {
                status: 1,
                msg: "Order Place Succefully",
                orderSave
            }
        }
        else {
            console.log(insertObj);
            insertObj["orderStatus"] = "pending";
            insertObj["orderUser"] = userId;
            insertObj["paymentStatus"] = "1"; //1. Means Process
            let orderSave = await orderModel(insertObj).save();
            const order = await razorpay.orders.create({
                //Here OrderAmount is Paise
                amount: insertObj.orderAmount * 100,
                currency: "INR",
                receipt: orderSave._id
            })
            let deleteCart = await cartModel.deleteMany({ userId });
            let addOrderId=await orderModel.updateOne({_id:orderSave._id},{$set:{
                razorpayOrderId:order.id
            }})
            console.log(order);
            let userInfo=await registerModel.findOne({_id:userId});
            sendSms();
            return res.send({
                status:0,
                msg:"Online Payment Order",
                order,
                preFill:{
                    email:userInfo.userEmail,
                    userName:userInfo.userName,
                    userNumber:userInfo.userNumber
                }
            })
        }
        res.status(200).json(resObj);
    }
    catch (error) {
        res.send({
            status: 0,
            msg: "Something Went Wrong",
            error
        })
    }
}

let paymentVerify=async (req,res)=>{
    //Id Come From Client
    let{razorpay_payment_id,razorpay_order_id,razorpay_signature}=req.body;
    //Verify Signature
    let key_secret=process.env.KEY_SECRET;
    let hash= crypto.createHmac('sha256',key_secret);
    hash.update( razorpay_order_id + "|" + razorpay_payment_id);
    let generated_signature=hash.digest('hex');
    let check=generated_signature==razorpay_signature;
    if(check){
        let orderUpdate=await orderModel.updateOne({razorpayOrderId:razorpay_order_id},{$set:{
            razorpayPayment:razorpay_payment_id,
            paymentStatus:"2",
            orderStatus:"process"
        }})
        res.status(200).json({
            status:1,
            msg:"Order Placed Succefully",
        });
    }
}


let viewOrder=async(req,res)=>{
    
       try{
        let{id}=req.body;
        let viewOrder=await orderModel.find({orderUser:id});
        res.send({
            status:1,
            msg:"Data Found",
            viewOrder
        })
        }
    catch(error){
         res.send({
            status: 0,
            msg: "Something Went Wrong",
            error
        })
    }
}

let individualOrder=async(req,res)=>{
    
        let{id}=req.params;
        let imagePath=process.env.STATICPATH+"upload/product/"
        let orderDetail=await orderModel.findOne({_id:id});
        res.send({
            status:1,
            imagePath,
            msg:"Data Found",
            orderDetail
        })
    
    /*catch(error){
          res.send({
            status: 0,
            msg: "Something Went Wrong",
            error
        })
    }*/
}

module.exports = { addOrder,paymentVerify,viewOrder,individualOrder };