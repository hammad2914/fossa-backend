const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        ProductCategory: {
            type: String,
            required: true,
        },
        ProductName: {
            type: String,
            required: true,
        },
        ProductDescription: {
            type: String,
            required: true,
        },
        ProductImage: {
            type: String,
            required: true,
        },
        ProductPrice: {
            type: String,
            required: true,
        },
        ProductRating: {
            type: String,
            default: '0',
        },
        ProductSales: {
            type: String,
            default: '0',
        }
    }
)

const ProductModel = mongoose.model('Products', ProductSchema);

module.exports = ProductModel;