/** @format */

const Product = require("../models/product");
const shortId = require("shortid");
const slugify = require("slugify");

exports.createProduct = (req, res) => {
  // res.status(200).json({ file: req.files, body: req.body } );

  const { name, price, description, category, createdBy } = req.body;
  let productPictures = [];

  if (req.file.length > 0) {
    productPictures = req.file.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });

  product.save().exec((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product });
    }
  });
};
