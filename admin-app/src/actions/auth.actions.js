import axios from "../helpers/axios"
import { authConstants } from "./constants"

export const login = (user) => {
   
    
    return async (dispatch) => {

        // const res = await axios.post(`/admin/signin`,{
            
        // })

        dispatch({
            type: authConstants.LOGIN_REQUEST,
            payload: {
                ...user
            }
        })
    }
}