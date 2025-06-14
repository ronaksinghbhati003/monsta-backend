let express=require("express");
let companyRoute=express.Router();
let multer=require("multer");
const { insertData, updateData } = require("../../controllers/admin/company");

let companyStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'upload/company');
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now()+"-"+file.originalname);
    }
})

 let upload=multer({storage:companyStorage});

companyRoute.post('/insert',upload.single('companyLogo'),insertData)
companyRoute.put('/update/:id',upload.single('companyLogo'),updateData);

module.exports={companyRoute};