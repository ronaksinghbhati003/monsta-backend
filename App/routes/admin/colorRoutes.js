let express=require("express");
const { colorView, colorDelete, colorInsert, editStatus, editData, updateData } = require("../../controllers/admin/color");
let color=express.Router();
color.get("/view",colorView)
color.delete("/delete",colorDelete)
color.post("/insert",colorInsert)
color.put('/active',editStatus);
color.get('/editdata/:id',editData);
color.put('/update/:id',updateData);
module.exports={color};