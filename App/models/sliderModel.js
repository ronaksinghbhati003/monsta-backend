let mongoose=require("mongoose");
let sliderSchema=new mongoose.Schema(
    {
        sliderTitle:{
            type:String,
            required:true,
            minlength:3,
            unique:true
        },
        sliderOrder:{
            type:Number,
            required:true
        },
        sliderStatus:{
            type:Boolean,
            required:true
        },
        sliderImage:{
            type:String,
            required:true
        }
    },
     {
        timestamps:true
     }
)

let sliderModel=mongoose.model("sliders",sliderSchema);
module.exports={sliderModel};