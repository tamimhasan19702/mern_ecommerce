/** @format */

const express = require("express");
const router = express.Router();

const { addCategory, getCategories } = require("../controller/category");

router.post("/category/create", addCategory);
router.get("/category/getcategories", getCategories);

module.exports = router;
