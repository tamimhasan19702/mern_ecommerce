import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

export const getAllCategory = () => {
    return async dispatch => {

        dispatch({ type: categoryConstants.GET_All_CATEGORIES_REQUEST });
        const res = await axios.get(`category/getcategory`);
        console.log(res)

        if(res.status === 200){
            const  {categoryList} = res.data;

            dispatch({
                type: categoryConstants.GET_All_CATEGORIES_SUCCESS,
                payload: {categories : categoryList}
            })
        }else{
            dispatch({
                type: categoryConstants.GET_All_CATEGORIES_FAILURE,
                payload: {error: res.data.error}})
        }

    }
}


export const addCategory = (form) => {
    return async dispatch => {
        const res = await axios.post(`/category/create`,form);
        console.log(res)
    }
}