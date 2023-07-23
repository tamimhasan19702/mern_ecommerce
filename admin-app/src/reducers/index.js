/**
 * * title: reducer js file
 * * description: main Reducer file to hold all the reducer custom hooks
 * * author: Tareq Monower
 * * 
 */


import authReducer from "./auth.reducers";
import { combineReducers } from "redux";
import userReducer from './user.reducers';
import productReducer from './product.reducers'
import categoryReducer from './category.reducers'
import orderReducer from './order.reducers'

// reducer with a state and action as argument. reducer(state,action)
// adding all the reducer in a object
const rootReducer = combineReducers({
     auth: authReducer,
     user: userReducer,
     category: categoryReducer,
     order: orderReducer,
     product: productReducer
})

export default rootReducer 