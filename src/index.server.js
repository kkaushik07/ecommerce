const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv').config();   // WHY?? why not just use the hard quoted server like app.listen(3000,console.log('server is running on port 3000' ))*/
const mongoose = require('mongoose');
const cors = require('cors');

//routes
const userRoutes = require('./routes/user/auth');
const adminRoutes = require('./routes/admin/auth');
const catagoryRoutes = require('./routes/catagory');
const productRoutes = require('./routes/product');
const cartRoutes = require ("./routes/cart");

//problem in using import statements
/*import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import mongoose from "mongoose";*/

const app = express(); //telling app to use express


//mongoDB Connection
//mongodb+srv://root:<password>@cluster0.vrknt.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.vrknt.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => { console.log("dbConnected successfully"); });


app.use(bodyParser.json());
app.use(cors());

app.use('/api',userRoutes); // middleware but why 
app.use('/api',adminRoutes); 
app.use('/api',catagoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);






app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});