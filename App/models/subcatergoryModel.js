let mongoose=require("mongoose");
let subCatSchema=new mongoose.Schema(
    {
        subCategoryName:{
            type:String,
            required:true,
            unique:true,
            minlength:3
        },
        subCategoryOrder:{
            type:Number,
            required:true
        },
        subCategoryStatus:{
            type:Boolean,
            required:true
        },
        subCategoryImage:{
            type:String,
            required:true
        },
        parentCategoryId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'category'
        }
    },
    {timestamps:true}
)

let subCatModel=mongoose.model('subcategory',subCatSchema);
module.exports={subCatModel};