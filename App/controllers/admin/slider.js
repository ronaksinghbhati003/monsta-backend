const { VirtualType } = require("mongoose");
const { sliderModel } = require("../../models/sliderModel");

let sliderInsert=async(req,res)=>{
  try{
   let{sliderName,sliderOrder}=req.body;
   let obj={
      sliderTitle:sliderName,
      sliderOrder,
      sliderStatus:true,
   }
   if(req.file){
    obj["sliderImage"]=req.file.filename;
   }

   let insertData=await sliderModel(obj).save();
   res.send({
    status:1,
    msg:"Data Insert Succefully",
    insertData
   });
  }
  catch(error){
    res.send({
        status:0,
        msg:error.name=="ValidationError"?"Please Fill All Entry":"Title Name Already exist",
        error
    })
  }
}

let sliderView=async(req,res)=>{
    try{
        let search={};
        let{find}=req.query;
        if(find){
            search={
                sliderTitle:new RegExp(find,"i")
            }
        }
        let sliderImagePath=process.env.STATICPATH+'upload/slider/';
         let viewData=await sliderModel.find(search);
         res.send({
            status:1,
            sliderImagePath,
            msg:"Data found Succefully",
            viewData
         })
    }
    catch(error){
        res.send({
            status:0,
            msg:"Something went wrong",
            error
        })
    }
}

let sliderActive=async(req,res)=>{
    try{
         let{id,status}=req.body;
         let activeUpdate=await sliderModel.updateOne({_id:id},{$set:{sliderStatus:status}})
         res.send({
            status:1,
            msg:status?"Active Succefully":"Deactivate Succefully",
            activeUpdate
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

let sliderDelete=async(req,res)=>{
    try{
        let{ids}=req.body;
       let deleteData=await sliderModel.deleteMany({_id:{$in:ids}});
        res.send({
            status:1,
            msg:ids.length>=1?"Delete Succefully":"Please Select Slider to Delete",
            deleteData
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

let sliderEditData=async(req,res)=>{
     try{
        let{id}=req.query;
        let editImagePath=process.env.STATICPATH+'upload/slider/';
        let editData=await sliderModel.findOne({_id:id});
        res.send({
            status:1,
            editImagePath,
            masg:"Data get Succefully",
            editData
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


let sliderUpdate=async(req,res)=>{
      try{
              let{id}=req.params;
              let{sliderName,sliderOrder}=req.body;
              let obj={
                sliderTitle:sliderName,
                sliderOrder
              }

              if(req.file){
                obj["sliderImage"]=req.file.filename;
              }

              let updateData=await sliderModel.updateOne({_id:id},{$set:obj});
              res.send({
                status:1,
                msg:"Data found Succefully",
                updateData
              })
      }
      catch(error){
            res.send({
            status:0,
            msg:"Slider title already exist",
            error
        })
      }
}
module.exports={sliderInsert,sliderView,sliderActive,sliderDelete,sliderEditData,sliderUpdate};