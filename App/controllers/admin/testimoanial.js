const { testModel } = require("../../models/testimoanialsModel");

let testInsert=async(req , res)=>{
       try{
               let{testName,testOrder,testRating,testDesignation,testMessage}=req.body;
               let obj={
                   testName,
                   testOrder,
                   testRating,
                   testDesignation,
                   testMessage,
                   testStatus:true
               }
               if(req.file){
                   obj["testImage"]=req.file.filename;
               }
               let insertData=await testModel(obj).save();
               res.send({
                   status:1,
                   msg:"Data Insert Succefully",
                   insertData
               })
           }
           catch(error){
               res.send({
                   status:0,
                   msg:error.name=="ValidationError"?"Please Fill All entry":"This Name Already Exist",
                   error
               })
           }
}

let testView=async(req,res)=>{
    try{
        let search={};
        let{name,designation}=req.query;
        let testImagePath=process.env.STATICPATH+"upload/testimoanial/";
        if(name&&designation){
            search={
                $and:[{testName:new RegExp(name,"i")},{testDesignation:new RegExp(designation,"i")}]
            }
        }
        else if(name){
            search={
                testName:new RegExp(name,"i")
            }
        }
        else{
            search={
                testDesignation:new RegExp(designation,"i")
            }
        }
       let viewData=await testModel.find(search);
       res.send({
        status:1,
        testImagePath,
        msg:"Data Found Succefully",
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

let testDelete=async(req,res)=>{
      try{
               let{ids}=req.body;
               let deleteData=await testModel.deleteMany({_id:{$in:ids}});
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

let testActive=async(req,res)=>{
    try{
           let{id,status}=req.query;
           let check=status=="true";
           let updateActive=await testModel.updateOne({_id:id},{$set:{testStatus:status}});
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


let testEditData=async(req,res)=>{
    try{
        let{id}=req.params;
        let editData=await testModel.findOne({_id:id});
        let testImagePath=process.env.STATICPATH+"upload/testimoanial/";
        res.send({
            status:1,
            testImagePath,
            msg:"Data found Succefully",
            editData
        })
    }
    catch(error){
        res.send({
            status:1,
            msg:"Something Went Wrong",
            error
        })
    }
    

}

let testUpdate=async(req,res)=>{

    try{
    let{id}=req.params;
    let{testName,testDesignation,testRating,testOrder,testMessage}=req.body;
    let obj={
        testName,
        testDesignation,
        testRating,
        testOrder,
        testMessage
    }
    if(req.file){
        if(req.file.filename!=undefined&&req.file.filename!=''&&req.file.filename!=null){
           obj["testImage"]=req.file.filename
        }
    }
    
    let updateData=await testModel.updateOne({_id:id},{$set:obj});
    res.send({
        status:1,
        msg:"Data Update Succefully",
        updateData
    })
   }
   catch(error){
    res.send({
        status:0,
        msg:"This Name Already Exist",
        error
    })
   }
}


module.exports={testInsert,testView,testDelete,testActive,testEditData,testUpdate};