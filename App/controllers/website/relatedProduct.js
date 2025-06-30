const { productModel } = require("../../models/productModel");

let getRelatedProduct= async(req ,res)=>{
    try{
          let{id}=req.query;
          let imagePath=process.env.STATICPATH+"upload/product/";
          let findRealted=await productModel.find({subCategory:id,productStatus:true}).populate('subSubCategory').populate('productColor');
          res.send({
            status:1,
            msg:"Data Found",
            imagePath,
            findRealted
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

let upToSell=async(req,res)=>{
    try{
     let imagePath=process.env.STATICPATH+"upload/product/";
     let upToSellData=await productModel.find({productUpSell:true,productStatus:true}).populate('subSubCategory').populate('productColor');
     res.send({
        status:1,
        msg:"Data Found",
        imagePath,
        upToSellData
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

module.exports={getRelatedProduct,upToSell};