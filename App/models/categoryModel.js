let mongoose=require("mongoose");
let categorySchema=new mongoose.Schema({
        categoryName:{
            type:String,
            required:true,
            minlength:2,
            unique: true
        },
        categoryOrder:Number,
        categoryStatus:Boolean,
        categoryImage:String,
       
},{ timestamps:true })

let categortyModel=mongoose.model('category',categorySchema);
module.exports={categortyModel};