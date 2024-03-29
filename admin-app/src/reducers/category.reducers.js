/**
 * * title: category.reducer js file
 * * description: reducing category actions with the proper state and action
 * * author: Tareq Monower
 * *
 *
 * @format
 */

import { categoryConstants } from "../actions/constants";

//intial state of the categories
const initState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (parentId, categories, category) => {
  // creating blank categories array
  let myCategories = [];

  //if we want to create the main parent Category
  if (parentId === undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        type: category.type,
        children: [],
      },
    ];
  }

  //working with  the category children
  for (let cat of categories) {
    //if previous category element's id matches with the parentId then proceed this
    if (cat._id === parentId) {
      const newCategory = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        parentId: category.parentId,
        type: category.type,
        children: [],
      };

      //pushing category element and also setting the children category
      myCategories.push({
        ...cat,
        children:
          cat.children.length > 0
            ? [...cat.children, newCategory]
            : [newCategory],
      });
    } else {
      // if category id doesn't match with the parentId then
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(parentId, cat.children, category)
          : [],
      });
    }
  }

  return myCategories;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    //getting all the categoris success request and sending categories as payload
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories,
      };
      break;
    // adding new category in the backend request
    case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    //adding the new category success reducer with action type
    case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
      //newly added category from action.payload
      const category = action.payload.category;

      const updatedCategories = buildNewCategories(
        category.parentId,
        state.categories,
        category
      );

      //updated category
      state = {
        ...state,
        categories: updatedCategories,
        loading: false,
      };
      break;
    //adding the new category failurereducer with action type
    case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      break;
  }
  //returning the state after all the actions
  return state;
};
