let express=require("express");
let multer=require("multer");
const { sliderInsert, sliderView, sliderActive, sliderDelete, sliderEditData, sliderUpdate } = require("../../controllers/admin/slider");
let sliderRoute=express.Router();

let sliderStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'upload/slider');
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now()+"-"+file.originalname);
    }
})

let sliderUpload=multer({storage:sliderStorage});

sliderRoute.post('/insert',sliderUpload.single('sliderImage'),sliderInsert);
sliderRoute.get('/view',sliderView);
sliderRoute.put('/active',sliderActive)
sliderRoute.post('/delete',sliderDelete);
sliderRoute.get('/editdata',sliderEditData);
sliderRoute.put('/update/:id',sliderUpload.single('sliderImage'),sliderUpdate);
module.exports={sliderRoute};