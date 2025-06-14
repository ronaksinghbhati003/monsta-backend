const mongoose=require("mongoose");
const {Schema}=mongoose;

let color=new Schema({
    colorName:{
        type:String,
        minlength: 2,
        maxlength:20,
        required:true
    },
    colorCode:String,
    colorStatus:Boolean,
    colorOrder:Number
})

let colorModel=mongoose.model('color',color);
module.exports={colorModel}