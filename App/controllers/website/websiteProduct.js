const { productModel } = require("../../models/productModel")

let webProduct=async(req ,res)=>{
    try{
    let staticPath=process.env.STATICPATH+'upload/product/';
    let homeProduct=await productModel.find({productBestSelling:true}).populate('subSubCategory','subSubCategoryName').populate('productColor').select(['productName','productActualPrice','productSalePrice','productImage']);
    res.send({
        status:1,
        msg:"Data Found Succefully",
        staticPath,
        homeProduct
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

let webProductDetail=async(req,res)=>{
    try{
        let{id}=req.params;
        let staticPath=process.env.STATICPATH+'upload/product/';
        let productDetail=await productModel.findOne({_id:id}).populate('productColor').populate('productMaterialType').populate('subCategory').populate('parentCategory');
        res.send({
            status:1,
            staticPath,
            msg:"Data Found Succefully",
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

module.exports={webProduct,webProductDetail};