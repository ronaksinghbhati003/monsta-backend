const mongoose=require("mongoose");
const http=require('http');
const express=require("express");
let app=express();
const cors=require("cors");
app.use(cors());
require("dotenv").config();
let server=http.createServer(app);

const { routes } = require("./App/routes/admin/adminRoutes");
const { adminModel } = require("./App/models/adminModel");
const { webSiteRoute } = require("./App/routes/website/websiteRoutes");

app.use(express.json());
app.use('/upload/category',express.static('upload/category'))
app.use('/upload/whychooseus',express.static('upload/whychooseus'))
app.use('/upload/slider',express.static('upload/slider'))
app.use('/upload/testimoanial',express.static('upload/testimoanial'));
app.use('/upload/subcategory',express.static('upload/subcategory'));
app.use('/upload/subsubcategory',express.static('upload/subsubcategory'));
app.use('/upload/admin',express.static('upload/admin'));
app.use('/upload/product',express.static('upload/product'));
app.use('/upload/company',express.static('upload/company'));
app.use('/admin',routes);
app.use('/website',webSiteRoute);

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DBNAME}`)
.then(async()=>{
    console.log("Data Base Created",process.env.DBNAME)
    server.listen(process.env.PORT,()=>{
         console.log(process.env.PORT);
    })
    /*app.listen(process.env.PORT,()=>{
    console.log(process.env.PORT);
})*/
  let check=await adminModel.find();
  if(check.length!=0){
      return "Admin Already Exist";
  }
  else{
      await adminModel.insertOne({admin_UserName:'ronak8890',adminPassword:"ronak8890"});
  }

})
.then(res=>{
    console.log(res);
})
.catch((error)=>{
    console.log("Conection Failed",error.message)
})
