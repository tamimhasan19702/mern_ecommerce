/** @format */

const express = require("express");
const {requireSignin,adminMiddleware} = require("../common-middlewires");
const {createProduct} = require('../controller/product');
const multer = require('multer');
const upload = multer({dest: 'uploads/'})
const router = express.Router();

const storage = multer.diskStorage({
        destination: function(req,file,cb){
                cb(null, '/tmp/my-uploads')
        },
        filename: function(req,file,cb){
                cb(null, file.fieldname + '-' + Date.now())
        }
})

        router.post("/product/create",
        requireSignin,
        adminMiddleware,
        upload.single('productPicture'),
        createProduct);

        
module.exports = router;
