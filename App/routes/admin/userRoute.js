let express=require("express");
const { userView, statusUpdate, userDelete } = require("../../controllers/admin/user");
let userRoute=express.Router();

userRoute.get('/userview',userView);
userRoute.put('/updatestatus',statusUpdate);
userRoute.delete('/deleteuser',userDelete);

module.exports={userRoute};