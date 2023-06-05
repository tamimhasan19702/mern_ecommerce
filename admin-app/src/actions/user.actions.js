import axios from '../helpers/axios';
import { userConstants } from './constants';

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    try {
      const res = await axios.post('/admin/signup', user);
      const { message } = res.data;
      dispatch({
        type: userConstants.USER_REGISTER_SUCCESS,
        payload: { message },
      });
    } catch (error) {
      if (error.response.status !== 200) {
        dispatch({
          type: userConstants.USER_REGISTER_FAILURE,
          payload: { error: error.response.data.error },
        });
      }
    }
  };
};
