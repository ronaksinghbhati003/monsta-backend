const { faqModel } = require("../../models/faqModels");
const {ObjectId} =require("mongodb");
 let faqInsert =async(req ,res)=>{
    try{
        let{
            faqQuestion,
            faqAnswer,
            faqOrder
        }=req.body;
        if(await faqModel.findOne({faqQuestion})){
            return res.send({
                status:0,
                msg:"This Question Already Exist",
                faqQuestion
            })
        }
        let faqData=await faqModel({
            faqQuestion,
            faqAnswer,
            faqStatus:true,
            faqOrder
        })
        let faqSave=await faqData.save();
        res.send({
            status:1,
            msg:"Data Add Succefully",
            faqSave
        })
    }
    catch(err){
        console.log(err);
    }
    
 }

let faqView=async(req,res)=>{
    try{
        let search={};
        let array=[];
        let{question,answer,currentPage}=req.query;
        let limit=10;
        let skip=(currentPage-1)*limit;
        if(question||answer)
        {
            if(question){
                array.push({faqQuestion:{$regex:question,$options:"i"}})
            }
            else{
                array.push({faqAnswer:{$regex:answer,$options:"i"}})
            }
        }
        let total=await faqModel.find({});
        let totalPages=Math.ceil(total.length/limit);
        search=array.length>=1?{$or:array}:{};
        let viewData=await faqModel.find(search).skip(skip).limit(limit);//find all data and return array of find data
        res.send({
            status:1,
            msg:viewData.length>=1?"Data Found Succesfullly":null,
            viewData,
            totalPages
        })
    }
    catch(err){
        console.log(err.message)
    }
}

let faqDelete= async(req,res)=>{
    try{
        //console.log(req.body);
        let{ids}=req.body;
        let deleteData =await faqModel.deleteMany({_id:{$in:ids}});
        res.send({
            status:1,
            msg:ids.length>=1?"Data Delete Succefully":"Please Select Data",
            deleteData
        })
    }
    catch(err){
        console.log(err.message);
    }
}

let editStatus=async(req,res)=>{
    try{
        //console.log(req.body);
         let{id,status}=req.body;
         let updateStatus =await faqModel.updateOne({_id:id},{$set:{faqStatus:status}});
         res.send({
            status:1,
            msg:status?"Activate Succefully":"Deactivate Succefully",
            updateStatus
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

let editData=async(req,res)=>{
    try{
        let{id}=req.params;
        let editData=await faqModel.findOne({_id:id});
        res.send({
            status:1,
            msg:"Edit Data Found Succefully",
            editData
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

let updateData=async(req,res)=>{
    try{
        let{id}=req.params;
        let{faqQuestion,faqAnswer,faqOrder}=req.body;
        let updateData=await faqModel.updateOne({_id:id},{$set:{
            faqQuestion,
            faqAnswer,
            faqOrder
        }})
        res.send({
            status:1,
            msg:"Color Update Succefully",
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


 module.exports={faqInsert,faqView,faqDelete,editStatus,editData,updateData}