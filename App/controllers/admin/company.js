const { companyModel } = require("../../models/companyProfile");

let insertData=async(req,res)=>{
    try{
         let obj=req.body;
         if(req.file){
            if(req.file.filename!=null&&req.file.filename!=""&&req.file.filename!=undefined){
                obj["companyLogo"]=req.file.filename;
            }
         }
         let insertData=await companyModel.collection.insertOne(obj);
         res.send({
            status:1,
            msg:"Data Save Succefully",
            insertData

         })
    }
    catch(error){
        res.send({
            status:0,
            msg:"Please fill all entry..",
            error
        })
    }
}

let updateData=async(req,res)=>{
    try{
          let{id}=req.params;
          let obj=req.body;
          if(req.file){
            if(req.file.filename!=null&&req.file.filename!=""&&req.file.filename!=undefined){
                obj["companyLogo"]=req.file.filename;
            }
         }
         let updateData=await companyModel.updateOne({_id:id},{$set:obj});
         res.send({
            status:1,
            msg:"Data Update Succefully",
            updateData
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

let companyView=async(req,res)=>{
    try{
        let viewData=await companyModel.find();
        res.send({
            status:1,
            msg:"Data Found Company",
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

module.exports={insertData,updateData,companyView};