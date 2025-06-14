let mongoose=require("mongoose");
let registerSchema=new mongoose.Schema({
    
    userName:{
        type:String,
        unique:true,
        required:true
    },
    userEmail:{
        type:String,
        unique:true,
        minlength:10
    },
    userPassword:{
        type:String,
    },
    userAddress:{
        type:String
    },
    userNumber:{
         type:Number,
    },
    userStatus:Boolean,
    verifyEmail:{
        type:Boolean,
        default:false
    }
})

let registerModel=mongoose.model('register',registerSchema);
module.exports={registerModel};

