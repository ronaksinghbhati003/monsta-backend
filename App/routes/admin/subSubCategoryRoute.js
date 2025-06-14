let express=require('express');
let multer=require("multer");
const { subSubCatInsert, parentCategory, subCategory, subSubCatView, subSubCatDelete, subSubCatActive, updateSubSubCat, subSubEditData } = require('../../controllers/admin/subSubCategory');
let subSubCatRoute=express.Router();


let subSubCatStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'upload/subsubcategory');
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now()+"-"+file.originalname);
    }
})

let upload=multer({storage:subSubCatStorage});
subSubCatRoute.post('/insert',upload.single('subSubCategoryImage'),subSubCatInsert);
subSubCatRoute.get('/parentCategory',parentCategory);
subSubCatRoute.get('/subCategory/:id',subCategory);
subSubCatRoute.get('/view',subSubCatView);
subSubCatRoute.post('/delete',subSubCatDelete);
subSubCatRoute.put('/active/:id',subSubCatActive);
subSubCatRoute.put('/update/:id',upload.single('subSubCategoryImage'),updateSubSubCat);
subSubCatRoute.get('/edit/:id',subSubEditData);

module.exports={subSubCatRoute};
