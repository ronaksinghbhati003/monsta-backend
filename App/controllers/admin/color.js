const { colorModel } = require("../../models/colorModels");

let colorInsert = async (req, res) => {
    try {
       // console.log(req.body);
        let { colorName, colorCode, colorOrder } = req.body;
        if (await colorModel.findOne({ colorName })) {
            return res.send({
                status: 0,
                msg: "This Color Name Already exist",
            })
        }

        let insert = await colorModel({
            colorName,
            colorCode,
            colorStatus: true,
            colorOrder
        })
        //console.log(insert);
        let insertColor = await insert.save();
        res.send({
            status: 1,
            msg: "Data Save Succefully",
            insertColor
        });
    }
    catch (err) {
        console.log(err)
    }

}

let colorDelete = async (req, res) => {
    let { ids } = req.body;
    //console.log(ids);
    let deleteData = await colorModel.deleteMany({ _id: { $in: ids } });
    //console.log(deleteData);
    res.send({
        status: 1,
        msg: deleteData.deletedCount >= 1 ? "Delete Data Succefully" : "Please Select Data to Delete",
        deleteData

    })
}

let colorView = async (req, res) => {
    try {
        let limit=10;
        let search = {};
        console.log(req.query);
        let {title,code,currentPage}=req.query;
        let skip=(currentPage-1)*10;
        let array=[];
        if(title){
            array.push({colorName:new RegExp(title,"i")});
        }
        if(code){
            array.push({colorCode:new RegExp(code,"i")});
        }
        if(title&&code){
            search={
                $and:[{colorName:new RegExp(title,"i")},{colorCode:new RegExp(code,"i")}]
            }
        }

         search=array.length>0?{$or:array}:{};
        /*if (title || code ) {

           search={
              $or:[{colorName:new RegExp(title,"i")},{colorCode:new RegExp(code,"i")}]
           }
        }*/
       //console.log(search);
        /*if (req.query.findColor) {
              let { findColor } = req.query;
              let findData = await colorModel.find({ colorName: { $regex: findColor, $options: 'i' } });
              return res.send({
                  status: 1,
                  msg: "Data found on search",
                  findData
              })
          }*/
         let allItems=await colorModel.find(search);
         let totalPage= Math.ceil((allItems.length)/limit);
        let viewData = await colorModel.find(search).skip(skip).limit(limit);//find all data and give array
        res.send(
            {
                status: 1,
                msg: "Data Read Succefully",
                totalPage,
                viewData
            }
        )
    }
    catch (err) {
        console.log(err);
    }

}

let editStatus=async(req,res)=>{
    try{
         let{id,status}=req.body;
         let updateStatus =await colorModel.updateOne({_id:id},{$set:{colorStatus:status}});
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
        let editData=await colorModel.findOne({_id:id});
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
        let{colorName,colorCode,colorOrder}=req.body;
        let updateData=await colorModel.updateOne({_id:id},{$set:{
            colorName,
            colorCode,
            colorOrder
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

module.exports = { colorView, colorDelete, colorInsert,editStatus,editData,updateData };