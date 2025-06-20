let mongoose=require("mongoose");
let wishListSchema=new mongoose.Schema({
    productId:String,
    wishListImage:String,
    wishListName:String,
    wishListPrice:Number,
    wishListStock:Number,
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"register"},
    productColor:{type:mongoose.Schema.Types.ObjectId,ref:"color"}
    },
    {
       timestamps:true
    }
)

let wishListModel=mongoose.model("wishlist",wishListSchema);

module.exports={wishListModel};