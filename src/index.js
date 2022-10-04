/*!

=========================================================
* Argon Design System React - v1.1.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Landing from "views/Landing.js";
import Login from "views/admin/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/admin/Register.js";
import Rentals from "views/Rentals";
import { Provider } from "react-redux";
import store from "store";
import Admin from "views/admin/Admin";
import AuthVerify from "common/auth-verify";
import ProtectedRoute from "ProtectedRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => <Landing {...props} />}
        />
        <Route
          path="/login"
          exact
          render={(props) => <Login {...props} />}
        />
        <Route
          path="/profile-page"
          exact
          render={(props) => <Profile {...props} />}
        />
        <Route
          path="/register"
          exact
          render={(props) => <Register {...props} />}
        />
        <Route
          path="/rentals"
          exact
          render={(props) => <Rentals {...props} />}
        />
        <ProtectedRoute
          path="/admin"
          component={Admin}
        />
        <Redirect to="/" />
      </Switch>
      <AuthVerify />
    </BrowserRouter>
  </Provider>
  
);
