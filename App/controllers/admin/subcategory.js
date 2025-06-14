const { categortyModel } = require("../../models/categoryModel");
const { subCatModel } = require("../../models/subcatergoryModel");
const { categortyInsert } = require("./category");

let categoryData=async(req ,res)=>{
    try{
       let option=await categortyModel.find({categoryStatus:true}).select('categoryName');
       res.send({
        status:1,
        msg:"Parent Data Found",
        option
       })
    }
    catch(error){
        res.send({
            status:0,
            msg:"Something Went Wrong",
            error
        })
    }
}

let subCatInsert=async(req,res)=>{
      try{
           //console.log(req.body);
           let{subCategoryParent,subCategoryName,subCategoryOrder}=req.body;
           let obj={
            subCategoryName,
            subCategoryOrder,
            subCategoryStatus:true,
            parentCategoryId:subCategoryParent
           }
           console.log(req.file);
           if(req.file)
           {
            if(req.file.filename!=undefined&&req.file.filename!=''&&req.file.filename!=null){
                obj["subCategoryImage"]=req.file.filename;
            }
           }

           let insertData=await subCatModel(obj).save();
           res.send({
            status:1,
            msg:"Data Insert Succefully",
            insertData
           })
      }
      catch(error){
        res.send({
            status:0,
            msg:error.name.includes("ValidationError")?"Please Fill all Entry":"This SubCategory Already Exist",
            error
        })
      }
} 

let subCatView=async(req,res)=>{
    try{
        let{find}=req.query;
        let subCatImagePath=process.env.STATICPATH+'upload/subcategory/';
        /*let search={};
        if(find){
            search={
                $or:[{subCategoryName:{$regex:find,$options:"i"}}]
            }
        }
         let viewData=await subCatModel.find(search).populate('parentCategoryId');*/
        let viewData=await subCatModel.aggregate([
            {
            //PipeLine 1st Make Join With Parent Category  
              $lookup:{
                from:'categories',
                localField:'parentCategoryId',
                foreignField:"_id",
                as:"category"
              },
            },
             //Flat Array as Document
             {$unwind:'$category'},
             //Find Match On Seach
            {
                $match:{
                    $or:[{subCategoryName:new RegExp(find,"i")},{'category.categoryName':new RegExp(find,"i")}]
                }
            },
            //Return New Shape Document
            {
                $project:{
                    _id:1,
                    subCategoryName:1,
                    subCategoryOrder:1,
                    subCategoryStatus:1,
                    subCategoryImage:1,
                    parentCategoryId:1,
                    "category":1
                }
            }
        ]);
         res.send({
            status:1,
            subCatImagePath,
            msg:"Data Found Succefully",
            viewData
         })
    }
    catch(error){
        res.send({
            status:0,
            msg:"Something Went Wrong",
            error
        })
    }
}

let subCatDelete=async(req,res)=>{
      try{
            let{ids}=req.body;
           // console.log(ids);
               let deleteData=await subCatModel.deleteMany({_id:{$in:ids}});
               res.send({
                 status:1,
                 msg:ids.length>=1?"Delete Succefully":"Please Select Data",
                 deleteData
               })
           }
           catch(error){
             res.send({
                 status:0,
                 msg:"Something went wrong",
                 error
             }
             )
           }
}

let subCatActive=async(req,res)=>{
      try{
                let{id,status}=req.query;
                let check=status=="true";
                let updateActive=await subCatModel.updateOne({_id:id},{$set:{subCategoryStatus:status}});
                //console.log(status);
                res.send({
                 status:1,
                 msg:check?"Activate Succefully":"Deactivate Succefully",
                 updateActive
                })
         }
         catch(error){
             res.send({
                 status:0,
                 msg:"Something Went Wrong",
                 error
             })
         }
}

let subEditData=async(req,res)=>{
    try{
           let{id}=req.params;
           let editImagePath=process.env.STATICPATH+'upload/subcategory/';
           let editData=await subCatModel.findOne({_id:id});
           res.send({
            status:1,
            editImagePath,
            msg:"Data Found Succefully",
            editData
           })
    }
    catch(error){
        res.send({
            status:0,
            msg:"Something Went Wrong",
            error
        })
    }
}

let subCatUpdate=async(req,res)=>{
    try{
        let{id}=req.params;
       // console.log(req.body);
        let{subCategoryParent,subCategoryName,subCategoryOrder}=req.body;
        let obj={
            subCategoryName,
            subCategoryOrder,
            parentCategoryId:subCategoryParent
        }

        if(req.file){
            if(req.file.filename!=undefined&&req.file.filename!=''&&req.file.filename!=null){
                obj["subCategoryImage"]=req.file.filename;
            }
        }

        let updateData=await subCatModel.updateOne({_id:id},{$set:obj});
        res.send({
            status:1,
            msg:"Data Update Succefully",
            updateData
        })
    }
    catch(error){
          res.send({
            status:0,
            msg:"Something Went Wrong",
            error
        })
    }
}

module.exports={categoryData,subCatInsert,subCatView,subCatDelete,subCatActive,subEditData,subCatUpdate};