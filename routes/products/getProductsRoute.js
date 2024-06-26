const express = require("express");
const route = express.Router();
const ProductModel = require("../../models/productsModel");
const { SendResponse } = require("../../helpers/responseHelper");
const { verifyToken } = require("../../helpers/jwtHelper");

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

module.exports = route;