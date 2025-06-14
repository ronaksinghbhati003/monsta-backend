const { adminModel } = require("../../models/adminModel");

let adminInsert=async(req,res)=>{
    try{
        //console.log(req.body);
        let{username,password}=req.body;
        let findAdmin=await adminModel.findOne({admin_UserName:username,adminPassword:password});
        if(findAdmin){
            res.send({
            status:1,
            msg:"Admin Find Succefully",
            findAdmin
        })
        }
        else{
            res.send({
                status:0,
                msg:"Invalid Username and Password"
            })
        }
        
    }
    catch(error){
        res.send({
            status:0,
            msg:"Something went wrong",
            error
        })
    }
     

}

let changePassword=async(req,res)=>{
    try{
       // console.log(req.body);
       // console.log(req.params);
        let{currentPassword,newPassword}=req.body;
        let{id}=req.params;
        let check=await adminModel.findOne({_id:id,adminPassword:currentPassword});
        if(check){
            let updateData=await adminModel.updateOne({_id:id},{$set:{
                adminPassword:newPassword
            }});
            res.send({
                status:1,
                msg:"Password Change Succefully",
                updateData
            })
        }
        else{
            res.send({
                status:0,
                msg:"Invalid Current Password "
            })
        }
    }
    catch(error){
        res.send({
            status:0,
            msg:"Something went wrong",
            error
        })
    }
}

let adminEditProfile=async(req,res)=>{
    try{
       // console.log(req.params);
        //console.log(req.body);
       // console.log(req.file);
        let{id}=req.params;
         let{profileName,profileEmail,profileNumber}=req.body;
         let obj={
            adminName:profileName,
            adminEmail:profileEmail,
            adminNumber:profileNumber
         }
         if(req.file){
            if(req.file.filename!=undefined&&req.file.filename!=''&&req.file.filename!=null){
                obj={...obj,adminImage:req.file.filename};
            }
         }

         let editProfile=await adminModel.updateOne({_id:id},{$set:obj});
         res.send({
            status:1,
            msg:"Profile Edit Succefully",
            editProfile
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

let adminView=async(req,res)=>{
    try{
       // console.log(req.query);
         let{id}=req.query;
         let adminImagePath=process.env.STATICPATH+'upload/admin/';
         let adminView=await adminModel.findOne({_id:id});
         res.send({
            status:1,
            adminImagePath,
            msg:"Data found",
            adminView
         })
    }
    catch{
         res.send({
            status:0,
            msg:"Something went wrong",
            error
        })
    }
}

module.exports={adminInsert,changePassword,adminEditProfile,adminView};