let express=require("express");
let multer=require("multer");
let path=require("path");
const { categortyInsert, categortyView, categortyActive, catEditData, catUpdate, catDelete } = require("../../controllers/admin/category");
let categoryRoute=express.Router();


let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'upload/category');
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname +"-" + Date.now()+ "-"+file.originalname);
    }
})

//Intialize method
 let upload=multer({storage:storage});

 categoryRoute.post('/insert',upload.single("categoryImage"),categortyInsert);
 categoryRoute.get('/view',categortyView);
 categoryRoute.put('/active/:id',categortyActive);
 categoryRoute.get('/edit-data/:id',catEditData);
 categoryRoute.put('/update/:id',upload.single("categoryImage"),catUpdate);
 categoryRoute.post('/delete',catDelete);
  module.exports={categoryRoute};