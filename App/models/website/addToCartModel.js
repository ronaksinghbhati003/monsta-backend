const mongoose=require("mongoose");
const cartSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'register'
    },
    color:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'color'
    },
    quantity:Number,
    product:Object
})

let cartModel=mongoose.model("cart",cartSchema);

module.exports={cartModel};