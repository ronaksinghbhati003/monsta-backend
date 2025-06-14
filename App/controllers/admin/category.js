const { categortyModel } = require("../../models/categoryModel");
//const { categoryRoute } = require("../../routes/admin/categoryRoutes");

let categortyInsert= async(req,res)=>{
    //console.log(req.body);
    //console.log(req.file);
    const{categoryName,categoryOrder}=req.body;
    //Create Object to save data in database
    let obj={
        categoryName,
        categoryOrder,
        categoryStatus:true,
        
    }
    if(req.file){
        const{filename}=req.file;
        obj={...obj,categoryImage:filename}
    }

    try{
        let insertData=await categortyModel(obj);
        let saveData=await insertData.save();
           res.send({
            status:1,
            msg:"Data Save Succefully",
            saveData
           });
    }
    catch(error)
    {
        res.send({
            status:0,
            msg:"Category name already exist",
            error
        })
    }
   
}


let categortyView=async(req,res)=>{
    let STATICPATH=process.env.STATICPATH+'upload/category/';
    let search={};
    if(req.query.search){
        search={
            categoryName:new RegExp(req.query.search,"i")
            //$or:[{categoryName:new RegExp(req.query.search,"i")}]
        }
    }

    let viewData=await categortyModel.find(search);
    res.send({
        status:1,
        STATICPATH,
        msg:"Data Found Sucessfully",
        viewData
    })
}

let categortyActive=async(req,res)=>{
    let{id}=req.params
    let{status}=req.body;
    let updateStatus=await categortyModel.updateOne({_id:id},{
        $set:{
            categoryStatus:status
        }
    })
    res.send({
        status:1,
        msg:status?"Category Active":"Category Deactivate",
        updateStatus
    });
}

let catEditData=async(req,res)=>{
    let{id}=req.params;
    let previewPath=process.env.STATICPATH+'upload/category/';
    let editGetData=await categortyModel.findOne({_id:id}); 
    res.send({
        status:1,
        previewPath,
        msg:"Edit Data Found",
        editGetData
    });
}

let catUpdate=async(req,res)=>{
    try{
    let{id}=req.params;
    let{categoryName,categoryOrder}=req.body;
    let obj={
        categoryName,
        categoryOrder
    }

    if(req.file){
        obj["categoryImage"]=req.file.filename;
    }

    let catUpdate=await categortyModel.updateOne({_id:id},
        {
        $set: obj
        })
    res.send({
        status:1,
        msg:"Product Update Succefully",
        catUpdate

    });
  }
  catch(error){
    res.send({
        status:0,
        msg:"Product Already Exist",
        error
    })
  }
}

let catDelete=async(req,res)=>{
    try{
        let{ids}=req.body;
        if(ids.length>=1){
            let catDelete=await categortyModel.deleteMany({_id:{$in:ids}});
            res.send({
                status:1,
                msg:"Category Delete Succefully",
                catDelete
            })
        }
        else{
            res.send({
                status:1,
                msg:"Please Select Item"
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



module.exports={categortyInsert,categortyView,categortyActive,catEditData,catUpdate,catDelete};