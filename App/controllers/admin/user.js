const { models } = require("mongoose");
const { registerModel } = require("../../models/website/registerModel")

let userView = async (req, res) => {
    try {
        let userSearch = {};
        let { search,currentPage } = req.query;
        let limit=10;
        let skip=(currentPage-1)*limit;
        if (search) {
            userSearch = {
                $or: [{ userName: new RegExp(search, "i") }, { userEmail: new RegExp(search, "i") }]
            }
        }
        let total=await registerModel.find(userSearch);
        let totalPages=Math.ceil(total.length/limit);
        let viewUser = await registerModel.find(userSearch).skip(skip).limit(limit);
        res.send({
            status: 1,
            msg: "User Found Succefully",
            viewUser,
            totalPages
        })
   }
    catch (error) {
        res.send({
            status: 0,
            msg: "Something Went Wrong",
            error
        })
    }

}

let statusUpdate = async (req, res) => {
    try {
        console.log(req.body);
        let obj;
        let { id, status, select,value } = req.body;
        if (select?.length >= 1) {
            let updateStatus = await registerModel.updateMany({ _id: { $in: select } }, {
                $set: {
                    userStatus: value
                }
            })
            obj={
                status:1,
                msg:"Selected User Deactivate Succefully"
            }
        }
        else {
            if (status == null) {
                obj = {
                    status: 0,
                    msg: "Please Select atleast One User"
                }
            }
            else {
                let updataStatus = await registerModel.updateOne({ _id: id }, {
                    $set: {
                        userStatus: status
                    }
                })
                obj={
                    status:1,
                    msg: status ? "User Activate Succefully" : "User Deactivate Succefully"
                }
            }
        }

        res.send(obj);
    }
    catch (error) {
        res.send({
            status: 0,
            msg: "Something Went Wrong",
            error
        })
    }
}

let userDelete=async(req,res)=>{
   try{
        console.log(req.body);
        let{select}=req.body;
        let deleteUser=await registerModel.deleteMany({_id:{$in:select}});
        res.send({
            status:1,
            msg:"User delete Succefully"
        })
   }
   catch(error){
        res.send({
            status: 0,
            msg: "Something Went Wrong",
            error
        })
   }
}

module.exports = { userView, statusUpdate,userDelete };