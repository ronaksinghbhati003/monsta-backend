let mongoose=require("mongoose");
let testSchema=new mongoose.Schema(
    {
        testName:{
            type:String,
            minlength:3,
            required:true,
            unique:true
        },
        testDesignation:{
            type:String,
            required:true
        },
        testRating:{
            type:Number,
            required:true
        },
        testOrder:{
            type:Number,
            required:true
        },
        testMessage:{
            type:String,
            required:true
        },
        testStatus:{
        type:Boolean,
        required:true
        },
        testImage:{
            type:String,
            required:true
        }
    },
    {
       timestamps:true
    }
)

let testModel=mongoose.model('testimoanial',testSchema);
module.exports={testModel};