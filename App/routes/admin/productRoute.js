let express=require("express");
let multer=require("multer");
const { productParentCategory, insertProduct, subCategory, subSubCategory, productMaterial, productColor, productView, productDetail } = require("../../controllers/admin/product");
let productRoute=express.Router();

let productStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"upload/product")
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+'-'+file.originalname);
    }
})

let upload=multer({storage:productStorage});
let cupload=upload.fields([
    {name:"productImage",maxCount:1},
    {name:"productBackImage",maxCount:1},
    {name:"productGallery",maxCount:12}
])

productRoute.post('/insert',cupload,insertProduct);
productRoute.get('/parentCategory',productParentCategory);
productRoute.get('/subCategory/:pid',subCategory);
productRoute.get('/subSubCategory/:pid',subSubCategory);
productRoute.get('/material',productMaterial);
productRoute.get('/color',productColor);
productRoute.get('/view',productView);
productRoute.get('/productdetail/:id',productDetail);

module.exports={productRoute}