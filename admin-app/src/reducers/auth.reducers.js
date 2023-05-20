/** @format */

import { authConstants } from "../actions/constants";

const initState = {
  name: "Tamim",
};

export default (state = initState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state
      }
      break;
  }
  return state;
};
