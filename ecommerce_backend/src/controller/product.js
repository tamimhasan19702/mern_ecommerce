/**
 * * title: new product controller function
 * * description: this file is to control and create new product json object according to the req and response
 * * author: Tareq Monower
 *
 * @format */

const Product = require("../models/product");
const shortId = require("shortid");
const slugify = require("slugify");
const Category = require("../models/category");
const product = require("../models/product");

exports.createProduct = (req, res) => {
  //destructuring and taking values from the request body
  const { name, price, description, category, quantity, createdBy } = req.body;

  //blank array
  let productPictures = [];

  //pushing all the productPicture images that were saved in the multer files to blank array
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  // creating new product json object
  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });

  //saving the response to the database
  product.save((error, product) => {
    //retrun error if there's any error left
    if (error) return res.status(400).json({ error });

    //return product response and
    if (product) {
      res.status(201).json({ product, files: req.files });
    }
  });
};

//getting all the categories from the database
exports.getProducts = async (req, res) => {
  const products = await Product.find({ createdBy: req.user._id })
    .select("_id name price quantity slug description productPictures category")
    .populate({ path: "category", select: "_id name" })
    .exec();

  res.status(200).json({ products });
};

//getting product by slug

exports.getProductBySlug = async (req, res) => {
  const { slug } = req.params;
  const category = await Category.findOne({ slug }).select("_id").exec();

  if (category) {
    const products = await Product.find({ category: category._id }).exec();

    if (products.length > 0) {
      const productsByPrice = {
        under5k: products.filter((product) => product.price < 5000),
        under10k: products.filter((product) => product.price < 10000),
        under20k: products.filter((product) => product.price < 20000),
        under30k: products.filter((product) => product.price < 30000),
        under50k: products.filter((product) => product.price < 50000),
      };

      return res.status(200).json({ products, productsByPrice });
    }
  }

  return res.status(200).json({ category });
};
