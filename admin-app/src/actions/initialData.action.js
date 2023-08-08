/**
 * * title:InitialData action file
 * * description: this file store action regarding the initilData about category and products
 * * author: Tareq Monower
 * *
 *
 * @format
 */

import axios from "../helpers/axios";
import {
  initialDataConstants,
  categoryConstants,
  productConstants,
} from "./constants";

export const getInitialData = () => {
  return async (dispatch) => {

    const res = await axios.post("/initialData");
    
    if (res.status === 200) {
      const { categories, products } = res.data;
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories },
      });
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: { products },
      });
    }
    console.log(res);
  };
};
