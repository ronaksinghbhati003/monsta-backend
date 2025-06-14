let express=require("express");
let multer=require("multer");
const { testInsert, testView, testDelete, testActive, testEditData, testUpdate } = require("../../controllers/admin/testimoanial");
let testRoute=express.Router();

let testStorage =multer.diskStorage(
    {
        destination:function(req,file,cb){
            cb(null,"upload/testimoanial");
        },
        filename:function(req,file,cb){
            cb(null,file.fieldname+"-"+Date.now()+"-"+file.originalname);
        }
    }
)

let upload =multer({storage:testStorage});
testRoute.post('/insert',upload.single('testImage'),testInsert);
testRoute.get('/view',testView);
testRoute.post('/delete',testDelete);
testRoute.put('/active',testActive);
testRoute.get('/editdata/:id',testEditData);
testRoute.put('/update/:id',upload.single('testImage'),testUpdate);

module.exports={testRoute};