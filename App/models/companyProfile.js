let mongoose=require("mongoose");
let companySchema=new mongoose.Schema({
    companyLogo:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    companyEmail:{
        type:String,
        required:true
    },
    companyNumber:{
        type:Number,
        required:true
    },
    companyAddress:{
        type:String,
        required:true
    },
    companyMap:{
        type:String,
        required:true
    },
    companyInstagram:{
        type:String,
        required:true
    },
    companyFacebook:{
        type:String,
        required:true
    },
    companyYoutube:{
        type:String,
        required:true
    },
    companyLinkedin:{
        type:String,
        required:true
    },
    companyTwitter:{
        type:String,
        required:true
    },
    companyTelegram:{
        type:String,
        required:true
    }


})

let companyModel=mongoose.model('company',companySchema);

module.exports={companyModel};