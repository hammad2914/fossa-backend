const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// updated
// Routes Import
const GetProductRouter = require('../routes/products/getProductsRoute');
const GetProductByIdRouter = require('../routes/products/getProductByIdRoute');
const PostProductRouter = require('../routes/products/postProductRoute');
const UpdateProductRouter = require('../routes/products/putProductRoute');
const DeleteProductRouter = require('../routes/products/deleteProductRoute');
const SignUpRouter = require('../routes/signupRoute');
const LoginRouter = require('../routes/loginRoute');

require('dotenv').config();

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

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then((res)=>{
    app.listen(process.env.PORT,()=>{
        console.log("Database connected successfully & server is listen on 5000...");
});

}).catch((err)=>{
console.log(err);
})

