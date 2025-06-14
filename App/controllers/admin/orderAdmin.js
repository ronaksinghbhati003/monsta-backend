const { orderModel } = require("../../models/orderModel");

let viewOrderAtAdmin=async(req,res)=>{
       try{
        let imagePath=process.env.STATICPATH+'upload/product/'
        let viewOrder=await orderModel.find().populate({
            path:'orderUser',
            select:'userName _id'
        });
        res.status(200).json({status:1,msg:"Data Found",viewOrder,imagePath});
        }
        catch(error){
             res.send({
            status:0,
            msg:"Something Went Wrong",
            error
        })
        }
        
    
}
module.exports={viewOrderAtAdmin};