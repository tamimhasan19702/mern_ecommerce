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

export const getAllCategory = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });

      const res = await axios.get('category/getcategory');

      if (res.status === 200) {
        const { categoryList } = res.data;

        dispatch({
          type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
          payload: { categories: categoryList },
        });
      } else {
        dispatch({
          type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (error) {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: error.message },
      });
    }
  };
};

