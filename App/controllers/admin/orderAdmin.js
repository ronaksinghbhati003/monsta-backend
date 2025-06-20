const { orderModel } = require("../../models/orderModel");

let viewOrderAtAdmin=async(req,res)=>{
       try{
        let{currentPage}=req.query;
        let limit=10;
        let skip=(currentPage-1)*limit;
        let total=await orderModel.find();
        let totalPages=Math.ceil(total.length/limit);
        let imagePath=process.env.STATICPATH+'upload/product/'
        let viewOrder=await orderModel.find().skip(skip).limit(limit).populate({
            path:'orderUser',
            select:'userName _id'
        });
        res.status(200).json({status:1,msg:"Data Found",viewOrder,imagePath,totalPages});
        }
        catch(error){
             res.send({
            status:0,
            msg:"Something Went Wrong",
            error
        })
        }
        
    
}

let deleteOrder=async(req,res)=>{
    try{
        let{id}=req.body;
        let deleteOrder=await orderModel.deleteMany({_id:{$in:id}});
        res.send({
            status:1,
            msg:"Order Delete Succefully",
            deleteOrder
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

module.exports={viewOrderAtAdmin,deleteOrder};