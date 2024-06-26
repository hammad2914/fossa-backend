const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const { SendResponse } = require("../helpers/responseHelper");

// Post Method:
route.post('/register', async (req, res) => {
  const { FirstName, LastName, EmailAddress, Password, Role } = req.body;
  const errorArray = [];

  try {
    if (!FirstName) {
      errorArray.push("First Name : Required");
    }
    if (!LastName) {
      errorArray.push("Last Name : Required");
    }
    if (!EmailAddress) {
      errorArray.push("Email Address : Required");
    }
    if (!Password) {
      errorArray.push("Password : Required");
    }
    if (!Role) {
      errorArray.push("Role : Required");
    }

    if (errorArray.length > 0) {
      return res
        .status(400)
        .send(SendResponse(false, errorArray, null, "All Fields Required"));
    }

    const duplicateEmail = await UserModel.findOne({ EmailAddress });
    if (duplicateEmail) {
      return res.status(500).send(SendResponse(false, null, "Email Already Exists"));
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    let Obj = { FirstName, LastName, EmailAddress, Password: hashedPassword, Role };
    let UserDetail = new UserModel(Obj);
    await UserDetail.save();

    if (!UserDetail) {
      return res.status(500).send(SendResponse(false, null, "Internal Server Error"));
    } else {
      return res.status(200).send(SendResponse(true, UserDetail, "User Created Successfully"));
    }
  } catch (e) {
    console.error(e);
    return res.status(500).send(SendResponse(false, null, "Internal Server Error"));
  }
});

module.exports = route;
