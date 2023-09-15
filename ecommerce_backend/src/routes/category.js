/**
 * * title: category route file
 * * description: this is the product category route file to direct the product categories with specific routes
 * * author: Tareq Monower
 *
 * @format */

const express = require("express");
const router = express.Router();

//inserting required controller functions
const {
  addCategory,
  getCategories,
  updateCategories,
} = require("../controller/category");
//inserting all the common middlewires
const { requireSignin, adminMiddleware } = require("../common-middlewires");
//third party packages
const multer = require("multer");
const shortId = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + "-" + file.originalname);
  },
});

//using multer package which will store files
const upload = multer({ storage });

router.post(
  "/category/create",
  requireSignin,
  adminMiddleware,
  upload.single("categoryImage"),
  addCategory
);

router.get("/category/getcategory", getCategories);

router.post(
  "/category/update",
  upload.array("categoryImage"),
  updateCategories
);

module.exports = router;
