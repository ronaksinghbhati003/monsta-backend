let express =require("express");
const { viewOrderAtAdmin, deleteOrder } = require("../../controllers/admin/orderAdmin");
let orderAdminRoute=express.Router();

orderAdminRoute.get('/vieworder',viewOrderAtAdmin);
orderAdminRoute.delete('/deleteorder',deleteOrder)
module.exports={orderAdminRoute}