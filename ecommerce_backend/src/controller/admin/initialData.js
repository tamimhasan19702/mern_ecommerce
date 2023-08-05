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
    categories : createCategories(categories),
    products,
  });
};


//create category function created previously in the category controller
createCategories = (categories, parentId = null) => {
  //blank categorylist array
  const categoryList = [];

  let category;

  //if parentId in null then execute this
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } //else execute this
  else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  //creating custom category object to import it to the categoryList array
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }

  //returning the filtered catrgory list
  return categoryList;
};
