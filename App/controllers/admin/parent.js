const { default: mongoose } = require("mongoose");
const { parentCatModel } = require("../../models/parentCatModel")

let parentCatInsert=async(req , res)=>{
    let value={
        parentCatImage:"smile.jpg",
        parentCatName:"Ronak",
        parentCatOrder:1,
        parentCatStatus:true
    }

    let parentStore=await parentCatModel(value);
   // console.log(parentStore);
    let parentValue=await parentStore.save();
    res.send({
        stauts:1,
        msg:"Parent Category Add Succefully",
        parentValue
    })

}

let parentCatView=async(req,res)=>{
    res.send("Parent View");
}

let parentCatDelete=async(req,res)=>{
    res.send("Parent View");
}
module.exports={parentCatInsert,parentCatView,parentCatDelete};