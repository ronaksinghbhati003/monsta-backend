let mongoose=require("mongoose");
let billingSchema=new mongoose.Schema({
    billingFirstName:{
        type:String,
        required:true
    },
    billingLastName:{
         type:String,
        required:true
    },
    billingEmail:{
        type:String,
        required:true
    },
    billingNumber:{
        type:Number,
        required:true
    },
    billingAddress:{
        type:String,
        required:true
    },
    billingApartmentAddress:{
        type:String,
        required:true
    },
    billingCompanyName:{
        type:String,
        default:"Monsta"
    },
    billingCountry:{
        type:String,
        required:true
    },
    billingState:{
        type:String,
        required:true
    },
    billingCity:{
        type:String,
        required:true
    },
    billingPostCode:{
        type:String,
        required:true
    },
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'register'
    }
    
},
{
    timestamps:true
})

let billingModel=mongoose.model("billing",billingSchema);
module.exports=billingModel;