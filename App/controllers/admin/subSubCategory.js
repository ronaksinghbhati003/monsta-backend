const { categortyModel } = require("../../models/categoryModel");
const { subCatModel } = require("../../models/subcatergoryModel");
const { subSubCatModel } = require("../../models/subSubCategoryModel");

let subSubCatInsert=async(req ,res)=>{
    try{
    let{parentCategory,subCategory,subSubCategoryName,subSubCategoryOrder}=req.body;
    let obj={
        parentCategory,
        subCategory,
        subSubCategoryName,
        subSubCategoryOrder,
        subSubCategoryStatus:true
    }

    if(req.file){
        if(req.file.filename!=undefined&&req.file.filename!=""&&req.file.filename!=null){
                obj["subSubCategoryImage"]=req.file.filename;
        }
    }

    let insertData=await subSubCatModel(obj).save();
    res.send({
        status:1,
        msg:"Data Insert Sucessfully",
        insertData
    })
  }
  catch(error){
    res.send({
        status:0,
        msg:error.name=="ValidationError"?"Please Fill All entry":"This Title Already Exist",
        error
    })
  }
}

let parentCategory=async(req,res)=>{
    try{
       let parentData=await categortyModel.find({categoryStatus:true}).select('categoryName');
       res.send({
        status:1,
        msg:"Data Found Succefully",
        parentData
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

let subCategory=async(req,res)=>{
    try{
        let{id}=req.params;
         let subCategoryData=await subCatModel.find({subCategoryStatus:true,parentCategoryId:id});
         res.send({
            status:1,
            msg:"Data Found Succefully",
            subCategoryData
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


let subSubCatView=async(req,res)=>{
    try{
        let limit=10;
        let{searchParent,searchSubCat,searchSubSubCat,currentPage}=req.query;
        let skip=(currentPage-1)*limit;
        let search={};
        if(searchParent&&searchSubCat){
            search={
                $and:[{parentCategory:searchParent},{subCategory:searchSubCat}]
            }
        }
        else if(searchParent!=""){
                 search={
                parentCategory:searchParent
            }
        }
        else if(searchSubSubCat){
            search={
                subSubCategoryName:new RegExp(searchSubSubCat,"i")
            }
        }
        let allProduct=await subSubCatModel.find(search);
        let totalPages=Math.ceil((allProduct.length)/limit);
        let subsubCatPath=process.env.STATICPATH+'upload/subsubcategory/';
        let subSubCatData=await subSubCatModel.find(search).populate('parentCategory').populate('subCategory').skip(skip).limit(limit);
         res.send({
            status:1,
            subsubCatPath,
            msg:"Data Found Succefully",
            subSubCatData,
            totalPages
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


let subSubCatDelete=async(req,res)=>{
    try{
          let{ids}=req.body;
          let deleteData=await subSubCatModel.deleteMany({_id:{$in:ids}});
          res.send({
            status:1,
            msg:ids.length>=1?"Data Delete Succefully":"Please Select Data",
            deleteData
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

 let subSubCatActive=async(req,res)=>{
    try{
         let{id}=req.params;
         let{status}=req.body;
         let updateData=await subSubCatModel.updateOne({_id:id},{$set:{
            subSubCategoryStatus:status
         }});
         res.send({
            status:1,
            msg:status?"Activate Succefully":"Deactivate Succefully",
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

 let updateSubSubCat= async(req,res)=>{
    try{
        //console.log(req.params);
        //console.log(req.body);
        //console.log(req.file);
         let{id}=req.params;
         let{subSubCategoryName,subSubCategoryOrder,parentCategory,subCategory}=req.body;
          let obj={
            parentCategory,
            subCategory,
            subSubCategoryName,
            subSubCategoryOrder
         }
      //console.log(obj);
         if(req.file){
            if(req.file.filename!=undefined&&req.file.filename!=null&&req.file.filename!=''){
                obj["subSubCategoryImage"]=req.file.filename;
            }
         }
      
         let updateData=await subSubCatModel.updateOne({_id:id},{$set:obj});

         res.send({
                status:1,
                msg:"Data Update Succefully",
                updateData
         });
    }
    catch(error){
        res.send({
            status:0,
            msg:"Something Went Wrong",
            error
        })  
    }
 }

 let subSubEditData=async(req,res)=>{
    try{
         let{id}=req.params;
         let editImagePath=process.env.STATICPATH+'upload/subsubcategory/';
         let editdata=await subSubCatModel.find({_id:id});
         res.send({
            status:1,
            editImagePath,
            msg:"Edit Data Found Succefully",
            editdata
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

module.exports={subSubCatInsert,parentCategory,subCategory,subSubCatView,subSubCatDelete,subSubCatActive,updateSubSubCat,subSubEditData};