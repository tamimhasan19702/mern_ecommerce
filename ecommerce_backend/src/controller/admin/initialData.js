/**
 * * title: Initial data admin controller
 * * description: it controlls the the product with the specific category
 * * author: Tareq Monower
 *
 * @format */

const Category = require("../../models/category");
const Product = require("../../models/product");

exports.initialData = async (req, res) => {
  const categories = await Category.find({}).exec();
  const products = await Product.find({})
    .select("_id name price quantity slug description productPictures category")
    .exec();

  res.status(200).json({
    categories,
    products,
  });
};
