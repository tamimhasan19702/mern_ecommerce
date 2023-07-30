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

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    //getting all the categoris success request and sending categories as payload
    case categoryConstants.GET_All_CATEGORIES_SUCCESS:
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
      const category = action.payload.category;
      const updatedCategories = buildNewCategories(
        category.parentId,
        state.categories,
        category
      );
      console.log(updatedCategories);

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
      };
      break;
  }

  //returning the state after all the actions
  return state;
};

const buildNewCategories = (parentId, categories, category) => {
  let myCategories = [];

  for (let cat of categories) {
    if (cat._id == parentId) {
      myCategories.push({
        ...cat,
        children:
          cat.children && cat.children.length > 0
            ? buildNewCategories(
                parentId,
                [
                  ...cat.children,
                  {
                    _id: category._id,
                    name: category.name,
                    slug: categories.slug,
                    parentId: category.parentId,
                    children: category.children,
                  },
                ],
                category
              )
            : [],
      });
    } else {
      myCategories.push({
        ...cat,
        children:
          cat.children && cat.children.length > 0
            ? buildNewCategories(parentId, cat.children, category)
            : [],
      });
    }
  }

  return myCategories;
};
