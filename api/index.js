const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

// Routes Import
const GetProductRouter = require('../routes/products/getProductsRoute');
const GetProductByIdRouter = require('../routes/products/getProductByIdRoute');
const PostProductRouter = require('../routes/products/postProductRoute');
const UpdateProductRouter = require('../routes/products/putProductRoute');
const DeleteProductRouter = require('../routes/products/deleteProductRoute');
const SignUpRouter = require('../routes/signupRoute');
const LoginRouter = require('../routes/loginRoute');

require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

// API URLS
app.use('/fossaAPI/getProducts', GetProductRouter);
app.use('/fossaAPI/getProductById', GetProductByIdRouter);
app.use('/fossaAPI/postProduct', PostProductRouter);
app.use('/fossaAPI/updateProduct', UpdateProductRouter);
app.use('/fossaAPI/deleteProduct', DeleteProductRouter);
app.use('/fossaAPI/user', SignUpRouter);
app.use('/fossaAPI/auth', LoginRouter);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Database connected successfully!');
})
.catch((error) => {
    console.log(error);
});

module.exports = app;
module.exports.handler = serverless(app);