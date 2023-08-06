/**
 * * title: reducer js file
 * * description: main Reducer file to hold all the reducer custom hooks
 * * author: Tareq Monower
 * *
 *
 * @format
 */

import authReducer from "./auth.reducers";
import { combineReducers } from "redux";
import userReducer from "./user.reducers";
import productReducers from "./product.reducers";
import categoryReducer from "./category.reducers";
import orderReducer from "./order.reducers";

// reducer with a state and action as argument. reducer(state,action)
// combinig all the reducer in a root reducer object
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  order: orderReducer,
  product: productReducers,
});

export default rootReducer;
