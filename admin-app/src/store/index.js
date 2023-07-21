/**
 * * title: Store js file
 * * description: This is the main Store file
 * * author: Tareq Monower
 * * 
 */

import {legacy_createStore as createStore,applyMiddleware} from 'redux';
//callback function import - reducer
import rootReducer from '../reducers'
//middlewire
import thunk from 'redux-thunk'

//creating store with redux
const store = createStore(rootReducer,applyMiddleware(thunk)); //createstore(callback func, middlewire)

export default store;