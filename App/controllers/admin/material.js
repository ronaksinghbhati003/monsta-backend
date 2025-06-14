const { materialModel } = require("../../models/materailModel");
const { ObjectId } = require("mongodb");
let materialView = async (req, res) => {

    try {
        let search={};
        let{searchMaterial}=req.query;
        if(searchMaterial){
            search={
                $or:[{materialName:{$regex:searchMaterial,$options:"i"}}]
            }
        }
        let viewData = await materialModel.find(search);
        res.send({
            status: 1,
            msg: "Data get Succefully",
            viewData
        });
    }
    catch (err) {
        console.log(err);
    }

}
let materialDelete = async (req, res) => {
    try {
        let { ids } = req.body;
        console.log(ids);
        let deleteData = await materialModel.deleteMany({ _id:{$in:ids}});
        res.send({
            status: 1,
            msg: "Data Delete Sucessfully",
            deleteData
        });
    }
    catch (err) {
        console.log(err);
    }

}
let materialInsert = async (req, res) => {
    try {
        let { materialName, materialOrder } = req.body;
        let value = {
            materialName,
            materialOrder,
            materialStatus: true
        }
        if(await materialModel.findOne({materialName})){
            return res.send({
                status:0,
                msg:"Data Already Exist",
                value
            })
        }
        let insertMaterial = await materialModel(value);
        let saveMaterial = await insertMaterial.save();
        res.send({
            status: 1,
            msg: "Material Add Succefully",
            saveMaterial
        })
    }
    catch (err) {
        console.log(err);
    }


}

let editStatus=async(req,res)=>{
    try{
         let{id,status}=req.body;
         let updateStatus =await materialModel.updateOne({_id:id},{$set:{materialStatus:status}});
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
        let editData=await materialModel.findOne({_id:id});
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
        let{materialName,materialOrder}=req.body;
        let updateData=await materialModel.updateOne({_id:id},{$set:{
            materialName,
            materialOrder
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

module.exports = { materialView, materialDelete, materialInsert,editStatus,editData,updateData };