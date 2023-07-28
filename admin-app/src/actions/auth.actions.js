/**
 * * title: auth.action js file
 * * description: this file is to do the authentication for users
 * * author: Tareq Monower
 * *
 *
 * @format
 */

//importing constants and axios for api call
import { authConstants } from "./constants";
import axios from "../helpers/axios";

// auth login function for the user
export const login = (user) => {
  // dispatching an login action
  return async (dispatch) => {
    //dispatch takes an object with a type and payload for argument
    dispatch({ type: authConstants.LOGIN_REQUEST });

    //doing a axios post request in the server
    const res = await axios.post(`/admin/signin`, {
      ...user,
    });

    if (res.status === 200) {
      const { token, user } = res.data;
      //setting token and user in the localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

//checking if user is logged in or not
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    //getting token from the localStorage
    const token = localStorage.getItem("token");

    if (token) {
      //getting user from the localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      //dispatching login success action
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      //dispatching login failure action
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};

// signing out function for the user
export const signout = () => {
  return async (dispatch) => {
    //dispatching logout request
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    const res = await axios.post(`/admin/signout`);

    //if response success
    if (res.status === 200) {
      localStorage.clear();
      //dispatching logout success
      dispatch({ type: authConstants.LOGOUT_SUCCESS });
    } else {
      //dispatching logout failure
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
