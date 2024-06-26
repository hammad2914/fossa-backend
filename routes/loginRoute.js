const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const { SendResponse } = require("../helpers/responseHelper");
const { generateToken } = require("../helpers/jwtHelper");

// Post Method:
route.post('/login', async (req, res) => {
    const { EmailAddress, Password } = req.body;

    try {
        const user = await UserModel.findOne({ EmailAddress });
        if (!user) {
            return res.status(404).send(SendResponse(false, null, "Invalid Email Address"));
        }

        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            return res.status(404).send(SendResponse(false, null, "Invalid Password"));
        }

        const token = generateToken(user);
        return res.status(200).send(SendResponse(true, { user: user, token: token }, "Login Successful"));
    } catch (e) {
        console.error(e);
        return res.status(500).send(SendResponse(false, null, "Internal Server Error"));
    }
});

module.exports = route;
