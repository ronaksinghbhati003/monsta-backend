const { cartModel } = require("../../models/website/addToCartModel");

let addToCartProduct=async(req ,res)=>{
    try{
    //console.log(req.body);
    let{index,color,product,id}=req.body;
    let checkAlreadyExist=await cartModel.findOne({$and:[{index:index},{color:color}]});
    checkAlreadyExist?res.send({
      status:0,
      msg:`${checkAlreadyExist.product?.productName} is alredy exist`
    })
    :null;

    let obj={
        userId:id,
        index,
        color,
        quantity:1,
        product
    }
    let cartItem=await cartModel.insertOne(obj);
    res.send({
        status:1,
        msg:`${product.productName} Succefully Added to Cart`,
        cartItem
    })
  }
  catch(error){
    res.send({
        status:0,
        msg:"Something Went Wrong",
        error
    })
  }
}


let viewCart=async(req,res)=>{
     try{
      let{id}=req.body;
      const staticPath=process.env.STATICPATH+'upload/product/';
      let viewCart=await cartModel.find({userId:id}).populate('color');
      res.send({
        status:1,
        staticPath,
        msg:"Data Found",
        viewCart
      })
     
    }
      catch(error){
      res.send({
        status:0,
        msg:"Something went wrong",
        error
      })
     }
}

let updateQuantity=async(req,res)=>{
  try{
    let{value,id}=req.body;
    let findQyt=await cartModel.findOne({_id:id}).select("quantity");
    if(!findQyt){
      return res.send({
         status:1,
         msg:"Item Not Found"
      })
    }
    /*if(findQyt.quantity==0){
      let updateQuantity=await cartModel.updateOne({_id:id},{
      $set:{
        quantity:1
      }
    })
    }*/
    else{
      let updateQuantity=await cartModel.updateOne({_id:id},{
      $set:{
        quantity:value=="plus"?findQyt.quantity+1:findQyt.quantity-1
      }
    })
    }
    
    
     res.send({
      status:1,
      msg:"Quantity Increase "
     })
  }
  catch(error){
    res.send({
        status:0,
        msg:"Something went wrong",
        error
      })
  }
}


let customQuantity=async(req,res)=>{

     try{
     let{id,value}=req.body;
     let customQuantity=await cartModel.updateOne({_id:id},{
        $set:{
          quantity:value
        }
     })
     res.send({
      status:1,
      msg:"Data Update"
     });
    }
    catch(error){
       res.send({
        status:0,
        msg:"Something went wrong",
        error
      })
      }
}

let removeCart=async(req,res)=>{
    try{
        let{id}=req.params;
        let removeCart=await cartModel.deleteOne({_id:id});
        res.send({
          status:1,
          msg:"Cart Remove Succefully"
        })
        
    }
    catch(error){
       res.send({
        status:0,
        msg:"Something went wrong",
        error
      })
    }
}
module.exports={addToCartProduct,viewCart,updateQuantity,customQuantity,removeCart};