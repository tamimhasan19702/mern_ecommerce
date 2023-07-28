/**
 * * title: user.reducer js file
 * * description: reducing user actions with with state and action
 * * author: Tareq Monower
 * *
 *
 * @format
 */

import { userConstants } from "../actions/constants";

//initial user state
const initState = {
  error: null,
  message: "",
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  //using switch to switch between user actions
  // eslint-disable-next-line default-case
  switch (action.type) {
    //new user registration request done
    case userConstants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    //new user registration success
    case userConstants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    //new user registration failure
    case userConstants.USER_REGISTER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }

  return state;
};
