let express=require("express");
const { checkToken } = require("../../middlewares/checkToken");
const { addOrder, paymentVerify, viewOrder, individualOrder } = require("../../controllers/website/orderController");
let orderRoute=express.Router();

orderRoute.post('/add-order',checkToken,addOrder);
orderRoute.post('/paymentverify',paymentVerify);
orderRoute.post('/vieworder',checkToken,viewOrder);
orderRoute.get('/orderdetail/:id',individualOrder);
module.exports={orderRoute};