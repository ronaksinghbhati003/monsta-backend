const { countryModel } = require("../../models/countryModel");

let countryInsert=async(req ,res)=>{
  try{
        //console.log(req.body);
        let{countryName,countryOrder}=req.body;
        let obj={
            countryName,
            countryOrder,
            countryStatus:true
        }

        let insertData=await countryModel(obj).save();
        res.send({
            status:1,
            msg:"Data Inset Succesfullly",
            insertData
        })
  }
  catch(error){
    res.send({
        status:0,
        msg:error.name=="ValidationError"?"Please Fill All Entry":"This Country Name Already exist ",
        error
    })
  }
}

let countryView=async(req,res)=>{
    try{
        let search={};
        if(req.query.search){
            search={
                countryName:new RegExp(req.query.search,"i")
            }
        }
    let viewData=await countryModel.find(search);
    res.send({
        status:1,
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

let countryDelete=async(req,res)=>{
    try{
        let{ids}=req.body;
        let deleteData=await countryModel.deleteMany({_id:{$in:ids}});
        res.send({
            status:1,
            msg:ids.length>=1?"Country Delete Succefully":"Please Select Country",
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

let countryActive=async(req,res)=>{
    try{
         let{id,status}=req.body;
         let activaData=await countryModel.updateOne({_id:id},{$set:{countryStatus:status}});
         res.send({
            status:1,
            msg:status?"Activate Succefully":"Deactivate Succefully",
            activaData
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

let countryUpdate=async(req,res)=>{
    try{
       // console.log(req.body);
    let{id,name,order}=req.body;
    let updateData=await countryModel.updateOne({_id:id},{$set:{
        countryName:name,
        countryOrder:order
    }})
    res.send({
        status:1,
        msg:"Country Update Succefully",
        updateData
    });
    }
    catch(error){
         res.send({
            status:0,
            msg:"Country Name Already Exist",
            error
        }) 
    }
}

let countryEditData=async(req,res)=>{
    try{
          let{id}=req.params;
          let editData=await countryModel.findOne({_id:id});
          res.send({
            status:1,
            msg:"Edit Data found",
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

 module.exports={countryInsert,countryView,countryDelete,countryActive,countryUpdate,countryEditData};