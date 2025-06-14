let express=require("express");
let multer=require('multer');
const { whychooseusInsert, whychooseusView, whychoosusActiveStatus, whychooseusDelete, whychooseusEditData, whychooseusUpdate } = require("../../controllers/admin/whychooseus");
let whychooseusRoute=express.Router();

let whychooseusStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"upload/whychooseus");
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now()+"-"+file.originalname);
    }
})

let whychooseusUpload=multer({storage:whychooseusStorage})

whychooseusRoute.post('/insert',whychooseusUpload.single('whyChooseUsImage'),whychooseusInsert);
whychooseusRoute.get('/view',whychooseusView);
whychooseusRoute.put('/active',whychoosusActiveStatus);
whychooseusRoute.post('/delete',whychooseusDelete);
whychooseusRoute.get('/edit-data/:id',whychooseusEditData);
whychooseusRoute.put('/update/:id',whychooseusUpload.single('whyChooseUsImage'),whychooseusUpdate);

module.exports={whychooseusRoute};