const express = require("express");
const route = express.Router();
const ProductModel = require("../models/productsModel");
const { SendResponse } = require("../helpers/responseHelper");
const { verifyToken } = require("../helpers/jwtHelper");

// Get Method:

route.get('/', verifyToken, async (req, res) => {

  try {
    const result = await ProductModel.find();

    if (!result) {
      res.status(404).send(SendResponse(false, null, "Data Not Found"));
    }
    else {
      res.status(200).send(SendResponse(true, result));
    }
  }
  catch (e) {
    res.status(500).send(SendResponse(false, null, "Internal Server Error"));
  }

});

// Get By Id Method:

route.get('/:id', verifyToken, async (req, res) => {
  try {
    let id = req.params.id;
    const result = await ProductModel.findById(id);
    if (!result) {
      res.status(404).send(SendResponse(false, null, "No Data Found"));
    } else {
      res.status(200).send(SendResponse(true, result));
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(SendResponse(false, null, "Internal Server Error"));
  }

});

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

// Put Method:

route.put('/:id', verifyToken, async (req, res) => {
  try {
    let id = req.params.id;
    let result = await ProductModel.findById(id);
    if (!result) {
      res.status(400).send(SendResponse(false, null, "No Data Found"));
    } else {
      let updateResult = await ProductModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updateResult) {
        res.status(404).send(SendResponse(false, null, "Error"));
      } else {
        res
          .status(200)
          .send(SendResponse(true, updateResult, "Updated Successfully"));
      }
    }
  } catch (e) {
    res.status(500).send(SendResponse(false, null, "Error"));
  }

});

// Delete Method:

route.delete('/:id', verifyToken, async (req, res) => {
  try {
    let id = req.params.id;
    let result = await ProductModel.findById(id);
    if (!result) {
      res.status(404).send(SendResponse(false, null, "No Data on this ID"));
    } else {
      let delResult = await ProductModel.findByIdAndDelete(id);
      if (!delResult) {
        res.status(404).send(SendResponse(false, null, "Error"));
      } else {
        res.status(200).send(SendResponse(true, null, "Deleted Successfully"));
      }
    }
  } catch (e) {
    res.status(404).send(SendResponse(false, null, "No Data on this ID"));
  }

});


module.exports = route;