const billingModel = require("../../models/website/billingAddressModel");

let insertBillingInfo=async(req ,res)=>{
    try{
      let obj=req.body;
      let finalObj={...obj,billingNumber:Number(req.body.billingNumber)};
      let billingInfo=await billingModel(finalObj).save();
      res.send({
        status:1,
        msg:"Billing Address Save Succefully",
        billingInfo
      })
    }
    catch(error){
        res.send({
            status:0,
            msg:"Please Fill All Entry",
            error
        })
    }
}

let getBillingInfo=async(req,res)=>{
    try{
        let{id}=req.body;
        let viewBilling=await billingModel.findOne({id:id});
        res.send({
          status:1,
          msg:"Data Found",
          viewBilling
        })
    }
    catch(error){
        res.send({
            status:0,
            msg:"Please Fill All Entry",
            error
        })
    }
}

let billingUpdate=async (req,res)=>{
       try{
           let obj=req.body;
           let{id}=req.body;
           let updateBilling=await billingModel.updateOne({id:id},{
            $set:obj
           })
           res.send({
            status:1,
            msg:"Billing Information Update Succefully"
           })
       }
       catch(error){
            res.send({
            status:0,
            msg:"Please Fill All Entry",
            error
        })
       }
}

module.exports={insertBillingInfo,getBillingInfo,billingUpdate};