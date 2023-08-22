/** @format */

import axios from "../helpers/axios.js";
import { productConstants } from "./constants.js";

export const getProductBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axios.get(`/products/${slug}`);
    // if (res.status === 200) {
    //   dispatch({
    //     type: productConstants.GET_PRODUCT_BY_SLUG_SUCCESS,
    //     payload: res.data
    //   });
    // }else{
    //   dispatch({
    //     type: productConstants.GET_PRODUCT_BY_SLUG_FAILURE,
    //     payload: { error: res.data.error }
    //   });
    // }
    console.log(res)
  };
};
