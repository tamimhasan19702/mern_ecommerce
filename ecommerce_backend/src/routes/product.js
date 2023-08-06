/**
 * * title: product route file
 * * description: this is the product route files to access request,response of the user
 * * author: Tareq Monower
 *
 * @format */

const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middlewires");
const { createProduct, getProducts } = require("../controller/product");
const multer = require("multer");
const router = express.Router();
const shortId = require("shortid");
const path = require("path");

// creating storage of diskstorage using multer
const storage = multer.diskStorage({
  //multer diskstorage destination with callback of the folder name where file uploads
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  //filename which generates according to the file's original name as callback
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + "-" + file.originalname);
  },
});

// adding the storage into the multer
const upload = multer({ storage });

router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPicture"),
  createProduct
);



module.exports = router;
