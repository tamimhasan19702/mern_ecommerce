/** @format */

import axios from "../helpers/axios.js";
import { productConstants } from "./constants.js";

export const getProductBySlug = (slug) => {
  return async dispatch => {
    try {
      const res = await axios.get(`/products/${slug}`);
      dispatch({
        type: productConstants.GET_PRODUCT_BY_SLUG_SUCCESS,
        payload: res.data
      });
      console.log(res)
    } catch (error) {
      dispatch({
        type: productConstants.GET_PRODUCT_BY_SLUG_FAILURE,
        payload: error
      });
    }
  }
};

