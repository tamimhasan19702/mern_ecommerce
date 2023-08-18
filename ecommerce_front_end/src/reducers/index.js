/**
 * * title: reducer js file
 * * description: main Reducer file to hold all the reducer custom hooks
 * * author: Tareq Monower
 * *
 *
 * @format
 */

import { combineReducers } from "redux";
import categoryReducer from "./category.reducers";

// reducer with a state and action as argument. reducer(state,action)
// combinig all the reducer in a root reducer object
const rootReducer = combineReducers({
  category: categoryReducer,
});

export default rootReducer;
