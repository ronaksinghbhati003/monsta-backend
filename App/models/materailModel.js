let mongoose=require("mongoose");
let materialSchema=mongoose.Schema({
    materialName:{
        type:String,
        minlenght: 2,
        maxlength:20,
        required:true
    },
    materialOrder:Number,
    materialStatus:Boolean
})
 let materialModel=mongoose.model('materiales',materialSchema);
 module.exports={materialModel}; 