const { faqModel } = require("../../models/faqModels");

let getData=async(req , res)=>{
     try{
        console.log("Faq Achieve");
         let viewData=await faqModel.find({faqStatus:true});
         res.send({
            status:1,
            msg:"Data Found",
            viewData
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

module.exports={getData};