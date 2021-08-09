/** @format */

import React from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import LoginAndRegister from "../containers/loginAndRegister";
import LoggedInRoutes from "./LoggedInRoutes";

function Routes() {
  return (
    <Switch>
      <Route path="/login" component={LoginAndRegister} />
      <Route path="/register" component={LoginAndRegister} />
      <Route path="/dashboard" component={withRouter(LoggedInRoutes)} />

      <Route path="/">
        <Redirect to="/dashboard" />
      </Route>
    </Switch>
  );
}

export default Routes;
