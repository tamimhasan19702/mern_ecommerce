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

export const login = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.LOGIN_REQUEST });

      const res = await axios.post(`/admin/signin`, {
        ...user,
      });

      if (res.status === 200) {
        const { token, user } = res.data;
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
    } catch (error) {
      console.log(error);
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
