const { wishListModel } = require("../../models/website/wishListModel");

let addWishList = async (req, res) => {
    try {
        console.log(req.body);
        let{productImage,productSalePrice,productName,id,_id,productStock,color}=req.body;
        let check=await wishListModel.findOne({$and:[{productId:_id},{productColor:color}]});
        if(check){
             return res.send({
                status:2,
                msg:"Product Already in Wishlist",
             })
        }
        else{
        let obj={
            productId:_id,
            wishListImage:productImage,
            wishListName:productName,
            wishListPrice:productSalePrice,
            userId:id,
            wishListStock:productStock,
            productColor:color
            
        }
        let saveWishList=await wishListModel(obj).save();
        res.send({
            status:1,
            msg:"Product add to wishlist"
        })
       }
    }
    catch (error) {
        res.send({
            status: 0,
            msg: "Something Went Wrong",
            error
        })
    }

}

let getDataWishlist=async(req,res)=>{
      try{
           let{id}=req.body;
           let imagePath=process.env.STATICPATH+"upload/product/";
           let getData=await wishListModel.find({userId:id}).populate({
            path:'productColor',
            select:'colorCode colorName'
           });
           res.send({
            status:1,
            imagePath,
            msg:"Data Found",
            getData
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

let deleteWishList=async(req,res)=>{
   try{
       let{id,wishList}=req.body;
       let deleteWishlist=await wishListModel.deleteOne({_id:wishList});
       res.send({
        status:1,
        msg:"Remove Item Succefully"
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

module.exports = { addWishList,getDataWishlist,deleteWishList };