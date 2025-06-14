let mongoose=require("mongoose");
let subSubCatSchema=new mongoose.Schema({
    parentCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    subCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subcategory'
    },
    subSubCategoryName:{
        type:String,
        required:true,
        minlength:3
    },
    subSubCategoryOrder:{
        type:Number,
        required:true
    },
    subSubCategoryStatus:{
        type:Boolean,
        required:true
    },
    subSubCategoryImage:{
        type:String,
    }

},{
    timestamps:true
})

let subSubCatModel=mongoose.model('subsubcategory',subSubCatSchema);
module.exports={subSubCatModel};