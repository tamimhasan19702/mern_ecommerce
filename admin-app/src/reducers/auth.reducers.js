/**
 * * title: auth.reducer js file
 * * description: reducing auth actions with with state and action
 * * author: Tareq Monower
 * *
 *
 * @format
 */

//* reducer is like dicision maker in a function. reducer takes action from a dispatcher and takes action according to it

import { authConstants } from "../actions/constants";

// creating initial state for the user with a blank user object
const initState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
};

//this is default auth reducer function
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  //switching the conditions as per the user action
  // eslint-disable-next-line default-case
  switch (action.type) {
    // *if the action type is login request change the state to this
    case authConstants.LOGIN_REQUEST:
      state = {
        //destructuring the initial state
        ...state,
        authenticating: true,
      };
      break;

    // *if the action type is Login success change the user state according to this
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;

    //* if the action type is Logout request and the change the user state according to this
    case authConstants.LOGOUT_REQUEST:
      state = {
        ...initState,
        loading: true,
      };
      break;

    //* if the action type is Logout success and the change the user state according to this
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
      };
      break;

    //* if the action type is Logout failure and the change the user state according to this
    case authConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
  }

  //returning the updated state
  return state;
};
