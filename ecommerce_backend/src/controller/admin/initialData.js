/**
 * * title: Initial data admin controller
 * * description: it controlls the the product with the specific category
 * * author: Tareq Monower
 *
 * @format */

const Category = require("../../models/category");
const Product = require("../../models/product");

/**
 * Fetches initial data for the API.
 * Retrieves categories and products from the database.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with initial data.
 */
exports.initialData = async (req, res) => {
  // Fetch all categories from the database
  const categories = await Category.find({}).exec();

  // Fetch all products from the database
  const products = await Product.find({})
    .select("_id name price quantity slug description productPictures category")
    .populate({ path: "category", select: "_id name" })
    .exec();

  // Send the response with initial data
  res.status(200).json({
    categories: createCategories(categories),
    products,
  });
};



/**
 * Creates a list of categories based on the provided categories array and parentId.
 * @param {Array} categories - The array of categories.
 * @param {string|null} parentId - The parentId to filter the categories by.
 * @returns {Array} - The list of categories.
 */
function createCategories(categories, parentId = null) {
  const categoryList = [];

  let category;

  if (parentId == null) {
    // Filter the categories where parentId is undefined
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    // Filter the categories where parentId matches the provided parentId
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    // Create a custom category object and add it to the categoryList array
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}