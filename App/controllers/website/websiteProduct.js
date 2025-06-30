const { categortyModel } = require("../../models/categoryModel");
const { productModel } = require("../../models/productModel");
const { sliderModel } = require("../../models/sliderModel");
const { subCatModel } = require("../../models/subcatergoryModel");
const { subSubCatModel } = require("../../models/subSubCategoryModel");
const { testModel } = require("../../models/testimoanialsModel");
const { whyChooseUsModel } = require("../../models/whychooseusModel");

let webProduct = async (req, res) => {
    try {
        let staticPath = process.env.STATICPATH + 'upload/product/';
        let homeProduct = await productModel.find({ productBestSelling: true, productStatus: true }).populate('subSubCategory', 'subSubCategoryName').populate('productColor').select(['productName', 'productActualPrice', 'productSalePrice', 'productImage', 'productStock']);
        res.send({
            status: 1,
            msg: "Data Found Succefully",
            staticPath,
            homeProduct
        })
    }
    catch (error) {
        res.send({
            status: 0,
            msg: "Something Went Wrong",
            error
        })
    }
}

let webProductDetail = async (req, res) => {
    try {
        let { id } = req.params;
        let staticPath = process.env.STATICPATH + 'upload/product/';
        let productDetail = await productModel.findOne({ _id: id }).populate('productColor').populate('productMaterialType').populate('subCategory').populate('parentCategory');
        res.send({
            status: 1,
            staticPath,
            msg: "Data Found Succefully",
            productDetail
        })

    }
    catch (error) {
        res.send({
            status: 0,
            msg: "Something Went Wrong",
            error
        })
    }
}

let megaMenu = async (req, res) => {
    try {
        let category = await categortyModel.find({ categoryStatus: true }).select("categoryName");
        let finalAns = [];
       
       
        for (v of category) {
            let obj={};
            obj={_id:v._id,categoryName:v.categoryName}
            let subCategory = await subCatModel.find({ subCategoryStatus: true, parentCategoryId: v._id }).select("subCategoryName");
            let subCat=[];
            for (s of subCategory) {
                let subCatObj={};
                let subSubCategory = await subSubCatModel.find({ subSubCategoryStatus: true, subCategory: s._id }).select("subSubCategoryName");
                subCatObj={
                    _id:s._id,
                    subCategory:s.subCategoryName,
                    subSubCategory
                }
                subCat.push(subCatObj);
                obj["subCategory"]=subCat;
            }
            
            finalAns.push(obj);
        }
        res.send({
            status: 1,
            finalAns
        })
    }
    catch (error) {
        res.send({
            status: 0,
            msg: "Something Went Wrong",
            error
        })
    }
}

let featuredProduct=async(req,res)=>{
    try{
          let{value}=req.query;
          let imagePath=process.env.STATICPATH+"upload/product/"
          let findData=await productModel.find({productStatus:true,productType:value}).populate('parentCategory').populate('productColor').populate('subCategory').populate('subSubCategory');
          res.send({
            status:1,
            imagePath,
            msg:"Data Found",
            findData
          })
    }
    catch(error){
         res.send({
            status: 0,
            msg: "Something Went Wrong",
            error
        })
    }
}

let getSliderData=async(req,res)=>{
    try{
        let sliderImage=process.env.STATICPATH+'upload/slider/'
        let sliderData=await sliderModel.find({sliderStatus:true});
        res.send({
            status:1,
            sliderImage,
            sliderData
        })
    }
    catch(error){
         res.send({
            status: 0,
            msg: "Something Went Wrong",
            error
        })
    }
}

let topRated=async(req,res)=>{
     try{
        let finalAns=[];
        let selected=new Set();
        let imagePath=process.env.STATICPATH+"upload/product/"
        let topRatedData=await productModel.find({productTopRated:true}).populate('subCategory');
        while(finalAns.length<2&&selected.size<topRatedData.length){
            let randomIndex=~~(Math.random()*topRatedData.length);
            if(!selected.has(randomIndex)){
                selected.add(randomIndex);
                finalAns.push(topRatedData[randomIndex]);
            }
        }
        
        res.send({
            status:1,
            imagePath,
            finalAns
        });
     }
     catch(error){
         res.send({
            status: 0,
            msg: "Something Went Wrong",
            error
        })
     }
}


let whyChooseUs=async(req,res)=>{
    try{
        let whyChooseUsImage=process.env.STATICPATH+"upload/whychooseus/";
        let whyChooseUs=await whyChooseUsModel.find({whyChooseUsStatus:true});
        res.send({
            status:1,
            msg:"Data Found",
            whyChooseUsImage,
            whyChooseUs
        })
    }
    catch(error){
       res.send({
            status: 0,
            msg: "Something Went Wrong",
            error
        }) 
    }
}

let testimoanial=async(req,res)=>{
    try{
         let testimoanialImage=process.env.STATICPATH+"upload/testimoanial/";
         let testimoanialData=await testModel.find({testStatus:true});
          res.send({
            status:1,
            msg:"Data Found",
            testimoanialImage,
            testimoanialData
        })
    }
    catch(error){
        res.send({
            status: 0,
            msg: "Something Went Wrong",
            error
        }) 
    }
}

module.exports = { webProduct, webProductDetail, megaMenu,featuredProduct,getSliderData,topRated,whyChooseUs,testimoanial};