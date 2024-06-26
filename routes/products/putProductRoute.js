const express = require("express");
const route = express.Router();
const ProductModel = require("../../models/productsModel");
const { SendResponse } = require("../../helpers/responseHelper");
const { verifyToken } = require("../../helpers/jwtHelper");

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


module.exports = route;