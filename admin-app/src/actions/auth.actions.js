import axios from "axios"
import axiosIntance from "../helpers/axios"
import { authConstants } from "./constants"

export const login = (user) => {
    console.log(user)
    return async (dispatch) => {

        const res = await axios.post(`/admin/signin`,{
            
        })

        dispatch({
            type: authConstants.LOGIN_REQUEST,
            payload: {
                ...user
            }
        })
    }
}