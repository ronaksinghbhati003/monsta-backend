let express=require("express");
let multer=require("multer");
const { categoryData, subCatInsert, subCatView, subCatDelete, subCatActive, subEditData, subCatUpdate } = require("../../controllers/admin/subcategory");
let subcategoryRoute=express.Router();

let subCatStorage=multer.diskStorage({
       destination:function(req,file,cb){
        cb(null,"upload/subcategory");
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now()+"-"+file.originalname);
    }
})

let upload=multer({storage:subCatStorage});

subcategoryRoute.get('/categorydata',categoryData);
subcategoryRoute.post('/insert',upload.single('subCategoryImage'),subCatInsert);
subcategoryRoute.get('/view',subCatView);
subcategoryRoute.post('/delete',subCatDelete);
subcategoryRoute.put('/active',subCatActive);
subcategoryRoute.get('/editdata/:id',subEditData);
subcategoryRoute.put('/update/:id',upload.single('subCategoryImage'),subCatUpdate);
module.exports={subcategoryRoute};