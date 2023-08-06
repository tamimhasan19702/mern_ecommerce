/**
 * * title: product.action js file
 * * description: this file is to store the action related for the products
 * * author: Tareq Monower
 * *
 *
 * @format
 */

import axios from "../helpers/axios";
import { productConstants } from "./constants";

//getting product from the backend with this async action
export const getProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
      const res = await axios.post(`product/getProducts`);
      if (res.status === 200) {
        const { products } = res.data;
        dispatch({
          type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
          payload: { products },
        });
      } else {
        dispatch({ type: productConstants.GET_ALL_PRODUCTS_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//adding product from the backend
export const addProduct = (form) => {
  return async (dispatch) => {
    //dispatching product add request
    dispatch({ type: productConstants.ADD_PRODUCT_REQUEST });
    try {
      //expecting a form in the this function argument a with the product/create route
      const res = await axios.post(`product/create`, form);

      //if response status code is 201 then return this process request and also dispatch getProducts function
      if (res.status === 201) {
        dispatch({ type: productConstants.ADD_PRODUCT_SUCCESS });
        dispatch(getProducts());
      } else {
        //if response failed then response this request
        dispatch({ type: productConstants.ADD_PRODUCT_FAILURE });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
