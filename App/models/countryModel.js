let mongoose=require("mongoose");
let countrySchema=new mongoose.Schema(
    {
        countryName:{
            type:String,
            required:true,
            minlength:3,
            unique:true
        },
        countryOrder:{
            type:Number,
            required:true,       
        },
        countryStatus:{
            type:Boolean,
            required:true
        }

    },
    {
        timestamps:true
    }
)

let countryModel=mongoose.model('country',countrySchema);
module.exports={countryModel};