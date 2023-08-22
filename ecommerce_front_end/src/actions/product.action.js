/** @format */

import axios from "../helpers/axios";

export const getProductBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axios.get(`/products/${slug}`);
    if (res.status === 200) {
      dispatch();
    }
  };
};
