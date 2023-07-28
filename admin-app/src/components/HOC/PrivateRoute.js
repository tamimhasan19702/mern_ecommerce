/**
 * * title:private route
 * * description: this is an higher order component it checks token available or not.if not available then redirects
 * * to the sign in
 * * author: Tareq Monower
 * *
 *
 * @format
 */

import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      //rendering element if token in stored in localstorage
      component={(props) => {
        const token = window.localStorage.getItem("token");
        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/signin"} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
