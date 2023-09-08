/**
 * * title: auth.action js file
 * * description: this file is to hold all the necessary authentication action
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

  console.log(user)
  // dispatching an login action
  return async (dispatch) => {
    //dispatch takes an object with a type and payload for argument
    dispatch({ type: authConstants.LOGIN_REQUEST });

    //doing a axios post request in the server
    const res = await axios.post(`/admin/signin`, {
      //destructuring the user object
      ...user,
    });

    if (res.status === 200) {
      const { token, user } = res.data;
      //setting token and user in the localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      //dispatching the login success action
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      if (res.status === 400) {
        //if status 400 then dispatch login failure action
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

// if user is logged in or not function
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

export const signout = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.LOGOUT_REQUEST });

      const res = await axios.post(`/admin/signout`);

      if (res.status === 200) {
        localStorage.clear();
        dispatch({ type: authConstants.LOGOUT_SUCCESS });
      } else {
        dispatch({
          type: authConstants.LOGOUT_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (error) {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: { error: error.message },
      });
    }
  };
};
