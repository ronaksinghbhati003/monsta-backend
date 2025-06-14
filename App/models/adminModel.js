let mongoose=require("mongoose");
let adminSchema=new mongoose.Schema({
    admin_UserName:{
        type:String,
        required:true
    },
    adminPassword:{
        type:String,
        required:true
    }
},{strict:false})

let adminModel=mongoose.model('admin',adminSchema);
module.exports={adminModel};