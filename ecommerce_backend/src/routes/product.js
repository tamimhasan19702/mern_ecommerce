/** @format */

const express = require("express");
const router = express.Router();
const Product = require('../models/product')

const {requireSignin,adminMiddleware} = require('../common-middlewires/index')

        router.post("/product/create",
        requireSignin,
        adminMiddleware,
        (req,res) => {
                res.status(200).json({message: 'Hello'})
        });

        
module.exports = router;
