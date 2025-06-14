let express=require("express");
const { companyView } = require("../../controllers/admin/company");
let contactRoute=express.Router();

contactRoute.get('/view',companyView)

module.exports={contactRoute};