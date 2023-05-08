/** @format */

const Product = require("../models/product");

exports.createProduct = (req, res) => {
  res.status(200).json({ file: req.file, body: req.body });
};
