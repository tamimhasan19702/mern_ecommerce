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
    dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });

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

