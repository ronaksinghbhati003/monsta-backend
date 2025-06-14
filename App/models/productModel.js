let mongoose = require("mongoose");
const { subCategory } = require("../controllers/admin/subSubCategory");
let productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            unique: true,
            trim:true,
            required: true,
            minlength: 3,
            
        },
        parentCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category'
        },
        subCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subcategory'
        },
        subSubCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subsubcategory'
        },
        productMaterialType: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'materiales'
        }],
        productColor: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'color'
        }],

        productType: {
            type: Number,
            enum: [0, 1, 2],
            required: true
        },

        productBestSelling: {
            type: Boolean,
        },

        productTopRated: {
            type: Boolean
        },
        productUpSell: {
            type: Boolean
        },
        productActualPrice: {
            type: Number
        },
        productSalePrice: {
            type: Number
        },
        productStock: {
            type: Number
        },
        productOrder: {
            type: Number
        },
        productImage: {
            type: String
        },
        productBackImage: {
            type: String
        },
        productGallery:{
            type:[String],
            default:[]
        },
       
        productDescription: {
            type: String
        },
        productStatus:{
            type:Boolean
        }


    }
)

let productModel = mongoose.model('product', productSchema);
module.exports = { productModel };