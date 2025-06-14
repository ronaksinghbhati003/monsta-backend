const { categortyModel } = require("../../models/categoryModel");
const { colorModel } = require("../../models/colorModels");
const { materialModel } = require("../../models/materailModel");
const { productModel } = require("../../models/productModel");
const { subCatModel } = require("../../models/subcatergoryModel");
const { subSubCatModel } = require("../../models/subSubCategoryModel");

let productParentCategory=async(req,res)=>{
    try{
          let parentCategory=await categortyModel.find({categoryStatus:true}).select('categoryName');
          res.send({
            status:1,
            msg:"Data Found Succefully",
            parentCategory
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

let insertProduct=async(req,res)=>{
    try{
        //console.log(req.body);
        let galleryArray=[];
        let{productName,productSubCategory,productMaterial,productType,productTopRated,productPrice,productStock,productParentCategory,productSubSubCategory,productColor,productSelling,productUpSell,productSalesPrice,productOrder,productDescription}=req.body;
        let obj={
            productName,
            parentCategory:productParentCategory,
            subCategory:productSubCategory,
            subSubCategory:productSubSubCategory,
            productMaterialType:productMaterial,
            productColor,
            productType:Number(productType),
            productBestSelling:productSelling=="true"?true:false,
            productTopRated:productTopRated=="true"?true:false,
            productUpSell:productUpSell=="true"?true:false,
            productActualPrice:Number(productPrice),
            productSalePrice:Number(productSalesPrice),
            productStock:Number(productStock),
            productOrder:Number(productOrder),
            productDescription,
            productStatus:true
        }

         if(req.files){         
            let{productImage,productBackImage,productGallery}=req.files;
            if(productImage[0].filename!=null&&productImage[0].filename!=""&&productImage[0].filename!=undefined){
                obj["productImage"]=productImage[0].filename;
            }

            if(productBackImage[0].filename!=null&&productBackImage[0].filename!=""&&productBackImage[0].filename!=undefined){
                obj["productBackImage"]=productBackImage[0].filename;
            }

            if(productGallery.length>0){
                productGallery.forEach((item,index)=>{
                    galleryArray.push(item.filename);
                })
                obj["productGallery"]=galleryArray;
            }
            //console.log(galleryArray);
        }

        let insertData=await productModel(obj).save();
        res.send({
            status:1,
            msg:"Product Insert Succefully",
            insertData
        });
    }
    catch(error)
    {
        res.send({
            status:0,
            msg:"Product Already Exist",
            error
        })
    }
}

let subCategory=async(req,res)=>{
    try{
         let{pid}=req.params;
         let subCategory=await subCatModel.find({subCategoryStatus:true,parentCategoryId:pid}).select('subCategoryName');
         res.send({
            status:1,
            msg:"subCategory Found Succefully",
            subCategory
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

let subSubCategory=async(req,res)=>{
    try{
              let{pid}=req.params;
              let subSubCategory=await subSubCatModel.find({subSubCategoryStatus:true,subCategory:pid}).select('subSubCategoryName');
              res.send({
                status:1,
                msg:"Data Found",
                subSubCategory
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

let productMaterial=async(req,res)=>{
    try{
        let productMaterial=await materialModel.find({materialStatus:true}).select("materialName");
        res.send({
            status:1,
            msg:"Material Data Found Succefully",
            productMaterial
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


let productColor=async(req,res)=>{
    try{
         let productColor=await colorModel.find({colorStatus:true}).select('colorName');
         res.send({
            status:1,
            msg:"Product Color Found Succefully",
            productColor
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

let productView=async(req,res)=>{
      try{
          let productImage=process.env.STATICPATH+"upload/product/";
          let productView=await productModel.find().populate('parentCategory','categoryName').populate('subCategory','subCategoryName').populate('productMaterialType','materialName').populate('productColor','colorName');
          res.send({
            status:1,
            msg:"Data Found",
            productImage,
            productView
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

let productDetail=async(req,res)=>{
    try{
         let{id}=req.params;
         let productImage=process.env.STATICPATH+"upload/product/";
         let productDetail=await productModel.findOne({_id:id}).populate("productMaterialType","materialName").populate("productColor","colorName");
         res.send({
            status:1,
            productImage,
            msg:"Data Found",
            productDetail
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

module.exports={productParentCategory,insertProduct,subCategory,subSubCategory,productMaterial,productColor,productView,productDetail};