const { categortyModel } = require("../../models/categoryModel");
const { colorModel } = require("../../models/colorModels");
const { materialModel } = require("../../models/materailModel");
const { productModel } = require("../../models/productModel");
const { subCatModel } = require("../../models/subcatergoryModel");
const { find } = require("../../models/website/billingAddressModel");

let getDataCart=async(req ,res)=>{
    try{
       let category=await categortyModel.find({categoryStatus:true}).select('categoryName');
       let finalAns=[];
       for(v of category){
        let obj={}
        let subCat=await subCatModel.find({parentCategoryId:v._id}).select("subCategoryName");
        obj={
            catId:v._id,
            catName:v.categoryName,
            subCat:subCat
        }
        finalAns.push(obj);
       }
       res.send({
        status:1,
        msg:"Data Found",
        finalAns
       });
    }
    catch(error){
        res.send(
            {
                status:0,
                msg:"Something Went Wrong",
                error
            }
        )
    }
}

const getDataMaterial=async(req,res)=>{
    try{
        let material=await materialModel.find({materialStatus:true});
        res.send({
            status:1,
            msg:"Data Found",
            material
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

let getDataColor=async(req,res)=>{
    try{
        let color=await colorModel.find({colorStatus:true});
        res.send({
            status:1,
            msg:"Data Found",
            color
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

let getProduct=async(req,res)=>{
    try{
         let{id}=req.query;
         let imagePath=process.env.STATICPATH+"upload/product/";
         if(id){
            let viewProduct=await productModel.find({subSubCategory:id}).populate('productColor').populate('subSubCategory');
            res.send({
                status:1,
                imagePath,
                msg:"Data Found",
                viewProduct
            })
         }
         else{
            let viewProduct=await productModel.find().populate('productColor').populate('subSubCategory');
            res.send({
                status:1,
                imagePath,
                msg:"Data Found",
                viewProduct
            })
         }
    }
    catch(error){
         res.send({
            status:0,
            msg:"Something Went Wrong",
            error
        })
    }
}

let getHighestPrice=async(req,res)=>{
    try{
        let{id}=req.query;
        if(id){
           let highestPrice=await productModel.find({subSubCategory:id}).sort({productSalePrice:-1}).limit(1).select('productSalePrice'); 
            res.send({
            status:1,
            msg:"Highest Price Found",
            highestPrice
        })
        }
        else{
            let highestPrice=await productModel.find().sort({productSalePrice:-1}).limit(1).select('productSalePrice');
            res.send({
            status:1,
            msg:"Highest Price Found",
            highestPrice
        })
      }
}
    catch(error){
        res.send({
            status:0,
            msg:"Something Went Wrong",
            error
        })
    }
}

let cartFilter=async(req,res)=>{
   try{
       console.log(req.body);
       let imagePath=process.env.STATICPATH+"upload/product/"
       const{catList,colorList,id,matList,select,minValue,maxValue}=req.body;
       let filter={};
       let obj={};
       if(id){
        filter.subSubCategory=id;
       }
       if(catList.length>0){
        filter.subCategory={$in:catList}
       }
       if(colorList.length>0){
        filter.productColor={$in:colorList}
       }
       if(matList.length>0){
        filter.productMaterialType={$in:matList}
       }
       if(minValue&&maxValue){
        filter.productSalePrice={$gt:minValue,$lt:maxValue};
       }
       if(select.hasOwnProperty('featured')){
         filter.productType=select.featured;
       }
       if(select.hasOwnProperty('lowToHigh')){
         obj.productSalePrice=Number(select.lowToHigh);
       }  
       if(select.hasOwnProperty('ascending')){
           obj.productName=Number(select.ascending);
       }     
       if(select.hasOwnProperty('bestSelling')){
        filter.productBestSelling=Boolean(select.bestSelling);
       }
       console.log(filter);
       console.log(obj);

      let filterData=await productModel.find(filter).populate('productColor').populate('subSubCategory').sort(obj);
       res.send({
        status:1,
        imagePath,
        msg:"Data Found",
        filterData
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

module.exports={getDataCart,getDataMaterial,getDataColor,getProduct,getHighestPrice,cartFilter};