let express=require("express");
const { getData } = require("../../controllers/website/faq");
let faqRoute=express.Router();

faqRoute.get("/view",getData);

module.exports={faqRoute};