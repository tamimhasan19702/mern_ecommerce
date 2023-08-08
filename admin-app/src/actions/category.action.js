/**
 * * title: category.action js file
 * * description: this file is to hold all the category actions
 * * author: Tareq Monower
 * *
 *
 * @format
 */

//importing axios instance and constants
import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

//getting all the product categories form the backend server
export const getAllCategory = () => {
  return async (dispatch) => {
    //dispatching getting all category constants request
    dispatch({ type: categoryConstants.GET_All_CATEGORIES_REQUEST });

    //getting response from the server with this route
    const res = await axios.get(`category/getcategory`);

    //if response status code is 200 then dispatch category success action
    if (res.status === 200) {
      //getting categoriList as response data
      const { categoryList } = res.data;

      //category success action with categoryList payload
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories: categoryList },
      });
    } else {
      //if there's error in getting category send dispatch and payload as error
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

// creating actions for adding category to the backend
export const addCategory = (form) => {
  return async (dispatch) => {
    //dispatching add new category request
    dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST});

    try {
      //post request with the axios with the form data as argument
      const res = await axios.post(`/category/create`, form);

      if (res.status === 201) {
        // if res === 201 the send category as payload
        dispatch({
          type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
          payload: { category: res.data.category },
        });
      } else {
        //if it failed send error as payload
        dispatch({
          type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
          payload: res.data.error,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
