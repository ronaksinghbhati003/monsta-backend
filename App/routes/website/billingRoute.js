let express=require("express");
let multer=require("multer");
const { insertBillingInfo, getBillingInfo, billingUpdate } = require("../../controllers/website/billingAddress");
const { checkToken } = require("../../middlewares/checkToken");
let billingRoute=express.Router();

let upload=multer({storage:''});


billingRoute.post("/addbillinginformation",upload.none(),checkToken,insertBillingInfo);
billingRoute.post("/viewbillinginfo",checkToken,getBillingInfo);
billingRoute.put('/updatebillinginfo',upload.none(),checkToken,billingUpdate);



module.exports={billingRoute}