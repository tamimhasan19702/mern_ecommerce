/**
 * eslint-disable no-duplicate-case
 *
 * @format
 */

/* eslint-disable default-case */
/** @format */

import { productConstants } from "../actions/constants";

const initState = {
  products: [],
  productsByPrice: {
    under5k: [],
    under10k: [],
    under20k: [],
    under30k: [],
    under50k: [],
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCT_BY_SLUG_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
        productsByPrice: { ...action.payload.productsByPrice },
      };
      break;
  }
  return state;
};
