const { whyChooseUsModel } = require("../../models/whychooseusModel");

//let whychooseusModel=require("../../models/whychooseusModel.js");
let whychooseusInsert=async(req ,res)=>{
    try{
        let{whyChooseUsName,whyChooseUsOrder,whyChooseUsDescription}=req.body;
        let obj={
            whyChooseUsName,
            whyChooseUsOrder,
            whyChooseUsDescription,
            whyChooseUsStatus:true
        }
        if(req.file){
            obj["whyChooseUsImage"]=req.file.filename;
        }
        let insertData=await whyChooseUsModel(obj).save();
        res.send({
            status:1,
            msg:"Data Insert Succefully",
            insertData
        })
    }
    catch(error){
        res.send({
            status:0,
            msg:error.name=="ValidationError"?"Please Fill All entry":"This Title Already Exist",
            error
        })
    }
}

let whychooseusView=async(req,res)=>{
    try{
        let ViewImagePath=process.env.STATICPATH+'upload/whychooseus/'
        let search={};
        if(req.query.search||req.query.description){
            if(req.query.search&&req.query.description)
            {
                search={
                    $and:[{whyChooseUsName:new RegExp(req.query.search,"i")},{whyChooseUsDescription:new RegExp(req.query.description,"i")}]
                }
            }
            else if(req.query.search){
                search={
                $or:[{whyChooseUsName:new RegExp(req.query.search,"i")}]
               }
            }
            else{
                  search={
                $or:[{whyChooseUsDescription:new RegExp(req.query.description,"i")}]
               }
            }
           
        }
       let viewData=await whyChooseUsModel.find(search);
      res.send({
        status:1,
        ViewImagePath,
        msg:"Data found Succefully",
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

let whychoosusActiveStatus=async(req,res)=>{
    try{
           let{id,status}=req.query;
           let check=status=="true";
           let updateActive=await whyChooseUsModel.updateOne({_id:id},{$set:{whyChooseUsStatus:status}});
           console.log(status);
           res.send({
            status:1,
            msg:check?"Activate Succefully":"Deactivate Succefully",
            updateActive
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

let whychooseusDelete=async(req,res)=>{
      try{
          let{ids}=req.body;
          let deleteData=await whyChooseUsModel.deleteMany({_id:{$in:ids}});
          res.send({
            status:1,
            msg:ids.length>=1?"Delete Succefully":"Please Select Data",
            deleteData
          })
      }
      catch(error){
        res.send({
            status:0,
            msg:"Something went wrong",
            error
        }
        )
      }
}

let whychooseusEditData=async(req,res)=>{
   
      try{
          let{id}=req.params;
          let editImagePath=process.env.STATICPATH+'upload/whychooseus/';
          let editData=await whyChooseUsModel.findOne({_id:id});
          res.send({
            status:1,
            editImagePath,
            msg:"Data Get Sucessfully",
            editData
          })
      }
      catch(error){
          res.send({
            status:0,
            msg:"Something went Wrong",
            error
          })
      }
   
   
}

let whychooseusUpdate=async(req,res)=>{
     try{
        let{id}=req.params;
        let{whyChooseUsName,whyChooseUsOrder,whyChooseUsDescription}=req.body;
        let obj={
            whyChooseUsName,
            whyChooseUsOrder,
            whyChooseUsDescription
        }

        if(req.file)
        {
            obj["whyChooseUsImage"]=req.file.filename;
        }
        let updateData=await whyChooseUsModel.updateOne({_id:id},{$set:obj});
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
module.exports={whychooseusInsert,whychooseusView,whychoosusActiveStatus,whychooseusDelete,whychooseusEditData,whychooseusUpdate}