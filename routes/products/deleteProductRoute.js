const express = require("express");
const route = express.Router();
const ProductModel = require("../../models/productsModel");
const { SendResponse } = require("../../helpers/responseHelper");
const { verifyToken } = require("../../helpers/jwtHelper");

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