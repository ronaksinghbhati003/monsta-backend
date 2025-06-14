let express =require("express");
const { viewOrderAtAdmin } = require("../../controllers/admin/orderAdmin");
let orderAdminRoute=express.Router();

orderAdminRoute.get('/vieworder',viewOrderAtAdmin);
module.exports={orderAdminRoute}