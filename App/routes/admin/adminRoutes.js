let express=require("express");
let multer=require("multer");
const { color } = require("./colorRoutes");
const { materialRoute } = require("./materialRoute");
const {faqRoutes} =require('./faqRoutes.js');
const { categoryRoute } = require("./categoryRoutes.js");
const { whychooseusRoute } = require("./whychooseusRoutes.js");
const { sliderRoute } = require("./sliderRoutes.js");
const { countryRoute } = require("./countryRoute.js");
const { subcategoryRoute } = require("./subcategoryRoute.js");
const { testRoute } = require("./testimoanialRoute.js");
const { subSubCatRoute } = require("./subSubCategoryRoute.js");
const { adminInsert, changePassword, adminEditProfile, adminView } = require("../../controllers/admin/admin.js");
const { productRoute } = require("./productRoute.js");
const { companyRoute } = require("./companyRoute.js");
const { userRoute } = require("./userRoute.js");
const { orderAdminRoute } = require("./orderAdminRoute.js");
let routes=express.Router();

routes.use('/color',color);
routes.use('/material',materialRoute)
routes.use('/faq',faqRoutes);
routes.use('/category',categoryRoute);
routes.use('/whychooseus',whychooseusRoute)
routes.use('/slider',sliderRoute);
routes.use('/country',countryRoute);
routes.use('/subcategory',subcategoryRoute);
routes.use('/testimoanial',testRoute);
routes.use('/subsubcategory',subSubCatRoute);
routes.use('/product',productRoute);
routes.use('/company',companyRoute);
routes.use('/user',userRoute);
routes.use('/order-admin',orderAdminRoute);


let adminStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'upload/admin');
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now()+"-"+file.originalname);
    }
})

let upload=multer({storage:adminStorage});
routes.post('/insert',adminInsert);
routes.put('/changepassword/:id',changePassword)
routes.put('/editprofile/:id',upload.single('profileImage'),adminEditProfile);
routes.get('/view',adminView);

module.exports={routes};