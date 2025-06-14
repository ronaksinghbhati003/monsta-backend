let mongoose=require("mongoose");
let orderSchema=new mongoose.Schema({
    orderItems:[],
    shippingAddress:{
        type:Object
    },
    paymentMethod:{
        type:String,
        enum:["1","2"],
        default:"1"  //1.Cash On Delievery  2.Online Payement
    },
    paymentStatus:{
        type:String,
        enum:["1","2","3"],
        default:"1" 
    },
    razorpayOrderId:{
        type:String
    },
    razorpayPayment:{
        type:String
    },
    orderAmount:{
        type:Number
    },
    orderQty:{
        type:Number
    },
    shippingCharges:{
        type:Number
    },
    orderStatus:{
        type:String,
        enum:["pending","process","completed"],
        default:"pending"
    },
    orderUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'register'
    },
    orderTime:{
        type:String,
    }
},
{
    timestamps:true
})

let orderModel=mongoose.model('order',orderSchema);
module.exports={orderModel};