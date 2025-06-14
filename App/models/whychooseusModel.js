let mongoose=require("mongoose");
let whyChooseUsSchema=new mongoose.Schema(
    {
       whyChooseUsName:{
        type:String,
        minlength:3,
        required:true,
        unique:true
       },
       whyChooseUsOrder:{
        type:Number,
        required:true
       },
       whyChooseUsDescription:{
        type:String,
        required:true
       },
       whyChooseUsStatus:{
        type:Boolean,
        required:true
       },
       whyChooseUsImage:{
        type:String,
        required:true
       }

    },
    {
      timestamps:true
     }
)

let whyChooseUsModel=mongoose.model('whychooseus',whyChooseUsSchema);
module.exports={whyChooseUsModel};