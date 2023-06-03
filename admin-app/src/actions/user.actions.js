/** @format */

// signup action function

import axios from "../helpers/axios";
import { authConstants } from "./constants";

export const Signup = (user) => {
  console.log(user);

  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const res = await axios.post(`/admin/signup`, {
      ...user,
    });

    if (res.status === 200) {
      const { message } = res.data;
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
