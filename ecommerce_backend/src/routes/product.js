/**
 * * title: product route file
 * * description: this is the product route files to access request,response of the user
 * * author: Tareq Monower
 *
 * @format */

const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middlewires");
const { createProduct, getProducts, getProductBySlug } = require("../controller/product");

const multer = require("multer");
const router = express.Router();
const shortId = require("shortid");
const path = require("path");

// creating storage of diskstorage using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPicture"),
  createProduct
);

router.get("/products/:slug", getProductBySlug);

router.post(
  "/product/getProducts",
  requireSignin,
  adminMiddleware,
  getProducts
);

module.exports = router;
