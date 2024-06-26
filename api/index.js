const express = require('express');
const app = express();
const cors = require('cors');

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
.then((response) => {
    app.listen(process.env.PORT, () => {
        console.log('Database connected successfully!');
    });
})
.catch((error) => {
    console.log(error);
});