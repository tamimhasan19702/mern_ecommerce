/**
 * * title:App js file
 * * description: Main App file the admin app
 * * author: Tareq Monower
 * *
 *
 * @format
 */

import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import Signin from "./containers/Signin/Signin";
import Signup from "./containers/Signup/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn,getInitialData  } from "./actions";
import Products from "./containers/Products/Products";
import Orders from "./containers/Orders/Orders";
import Category from "./containers/category/Category";


//App function
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  //calling this function to get all the initialData to the frontend first
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData())
  }, [auth.authenticate, dispatch]);

  return (
    <div className="App">
      <Switch>
        {/* private route setup */}
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/category" exact component={Category} />
        <PrivateRoute path="/products" exact component={Products} />
        <PrivateRoute path="/orders" exact component={Orders} />

        {/* common route */}
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
