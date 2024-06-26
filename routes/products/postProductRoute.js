const express = require("express");
const route = express.Router();
const ProductModel = require("../../models/productsModel");
const { SendResponse } = require("../../helpers/responseHelper");
const { verifyToken } = require("../../helpers/jwtHelper");

// Post Method:

route.post('/', verifyToken, async (req, res) => {

  const { ProductCategory, ProductName, ProductDescription, ProductImage, ProductPrice, ProductRating, ProductSales } = req.body;
  const errorArray = [];

  try {
    if (!ProductCategory) {
      errorArray.push("Product Category : Required");
    }
    if (!ProductName) {
      errorArray.push("Product Name : Required");
    }
    if (!ProductDescription) {
      errorArray.push("Product Description : Required");
    }
    if (!ProductImage) {
      errorArray.push("Product Image : Required");
    }
    if (!ProductPrice) {
      errorArray.push("Product Price : Required");
    }
    if (errorArray.length > 0) {
      res
        .status(400)
        .send(SendResponse(false, errorArray, null, "All Fields Required"));
      return;
    }
    else {
      let Obj = { ProductCategory, ProductName, ProductDescription, ProductImage, ProductPrice, ProductRating, ProductSales };
      let ProductDetail = new ProductModel(Obj);
      await ProductDetail.save();

      if (!ProductDetail) {
        res.status(500).send(SendResponse(false, null, "Internal Server Error"));
      }
      else {
        res.status(200).send(SendResponse(true, ProductDetail, "Data Send Successfully"));
      }
    }
  }

  catch (e) {
    res.status(500).send(SendResponse(false, null, "Internal Server Error"));
  }

});

module.exports = route;