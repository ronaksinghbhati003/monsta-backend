let mongoose=require("mongoose");
let {Schema}=mongoose;
let faqSchema=new Schema({
    faqQuestion:{
        type:String,
        required:true,
        minlength:5,
    },
    faqAnswer:{
        type:String,
        minlength:10,
        required:true
    },
    faqOrder:{
        type:Number,
        required:true,
        default:1
    },
    faqStatus:Boolean
})

let faqModel=mongoose.model("faq",faqSchema);
module.exports={faqModel};
