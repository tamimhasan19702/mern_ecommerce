
import authReducer from "./auth.reducers";
import { combineReducers } from "redux";
import userReducer from './user.reducers';
import productReducer from './product.reducers'
import categoryReducer from './category.reducers'
import orderReducer from './order.reducers'

const rootReducer = combineReducers({
     auth: authReducer,
     user: userReducer,
     category: categoryReducer,
     order: orderReducer,
     product: productReducer
})

export default rootReducer 