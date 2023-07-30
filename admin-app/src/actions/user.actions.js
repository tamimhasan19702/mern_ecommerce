/**
 * * title: user.action js file
 * * description: this file is to store the signup function which eventually creates a user
 * * author: Tareq Monower
 * *
 *
 * @format
 */

import { userConstants } from "./constants";
import axios from "../helpers/axios";

//signup function for the user
export const signup = (user) => {
  console.log(user);

  return async (dispatch) => {
    //dispatching new  user registration request
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    // user response
    const res = await axios.post(`/admin/signup`, {
      ...user,
    });

    //if user registration success
    if (res.status === 201) {
      const { message } = res.data;
      //dispatching new user registration
      dispatch({
        type: userConstants.USER_REGISTER_SUCCESS,
        payload: { message },
      });
    } else {
      if (res.status === 400) {
        //dispatching registration failure action
        dispatch({
          type: userConstants.USER_REGISTER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
