/** @format */

import axios from "../helpers/axios.js";
import { productConstants } from "./constants.js";

export const getProductBySlug = (slug) => {
  return async dispatch => {
    const res = await axios.get(`/product/getproductbyslug/${slug}`);
    if(res.status === 200){
        dispatch({
            type: productConstants.GET_PRODUCT_BY_SLUG_SUCCESS,
            payload: res.data
        });
    }else{
        
    }
  }
};

