/**
 * * title: category controller function
 * * description: this file is to control the product category how it will handle the category request
 * * author: Tareq Monower
 *
 * @format */

//third party packages
const slugify = require("slugify");
const shortid = require("shortid");
//importing category model
const Category = require("../models/category");

//creating categories for parentCatgories and subCategories
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

//adding category to the database
exports.addCategory = (req, res) => {
  //creating category object
  const categoryObj = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}`,
  };

  //saving category image to the backend
  if (req.file) {
    categoryObj.categoryImage = `${process.env.API}/public/${req.file.filename}`;
  }

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  //saving new category object as cat
  const cat = new Category(categoryObj);

  //saving the category object to the database with proper error handling
  cat.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) {
      return res.status(201).json({ category });
    }
  });
};

//getting all the categories from the database
exports.getCategories = (req, res) => {
  Category.find({}).exec((error, categories) => {
    //if error found while getting the categories
    if (error) return res.status(400).json({ error });
    // if categorylist found
    if (categories) {
      const categoryList = createCategories(categories);
      res.status(200).json({ categoryList });
    }
  });
};

//updating category to the database
exports.updateCategory = (req, res) => {
  const { name, parentId, type } = req.body;
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if(parentId !== ""){
      caches.parentId = parentId[i];
      }

     const updatedCategory = Category.findOneAndUpdate({_id},category,{new:true});

     
    }
  }

  res.status(200).json({
    body: req.body,
  });
};
