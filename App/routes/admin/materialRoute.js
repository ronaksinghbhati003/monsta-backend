let express=require("express");
const { materialView, materialDelete, materialInsert, editStatus, editData, updateData } = require("../../controllers/admin/material");
let materialRoute=express.Router();

materialRoute.get('/view',materialView)

materialRoute.delete('/delete',materialDelete)

materialRoute.post('/insert',materialInsert)
materialRoute.put('/active',editStatus);
materialRoute.get('/editdata/:id',editData);
materialRoute.put('/update/:id',updateData);
module.exports={materialRoute};