/**
 * * title: product.reducer js file
 * * description: reducing product actions with the proper state and action
 * * author: Tareq Monower
 * *
 *
 * @format
 */

import { productConstants } from "../actions/constants";

const initState = {
  products: [],
  loading: false,
  error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    // eslint-disable-next-line no-duplicate-case
    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      state = {
        ...state,
        products: action.payload.products
      };

      break;
  }

  return state;
};
