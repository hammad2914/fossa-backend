const express = require("express");
const route = express.Router();
const ProductModel = require("../../models/productsModel");
const { SendResponse } = require("../../helpers/responseHelper");
const { verifyToken } = require("../../helpers/jwtHelper");

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

module.exports = route;