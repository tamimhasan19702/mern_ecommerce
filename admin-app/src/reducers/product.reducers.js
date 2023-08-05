/**
 * * title: product.reducer js file
 * * description: reducing product actions with the proper state and action
 * * author: Tareq Monower
 * *
 *
 * @format
 */

import { productConstants } from "../actions/constants";

const initialState = {
    products: []
}


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
      };
      break;
  }

  return state;
};
