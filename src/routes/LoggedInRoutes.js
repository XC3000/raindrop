/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import HomePage from "../containers/Home/HomePage";
import PortfolioWatch from "../containers/PortfolioWatch/PortfolioWatch";
import Quantstats from "../containers/Quantstats/Quantstats";
import StrategyLibrary from "../containers/StrategyLibrary/StrategyLibrary";
import TradeLogs from "../containers/TradeLogs/TradeLogs";
import Theme from "../theme/Theme";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { newtrade } from "../socket";
import Help from "../containers/Help/Help";
import AccountSettings from "../containers/AccountSettings/AccountSettings";
import { fetchData } from "../actions/action.RequestData";

function LoggedInRoutes() {
  let match = useRouteMatch();
  const jwt = useSelector((state) => state?.authReducer?.user?.jwt);
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  // to get userKYC details
  useEffect(() => {
    dispatch(fetchData({ type: "SEND_USER_KYC_REQUEST" }));
  }, []);
  //socket connection
  useEffect(() => {
    try {
      const socket = io.connect("https://socket.raintech.ai/", {
        reconnection: false,
      });
      // newtrade();
      socket.on("connect", () => {
        console.log("connected");
        socket.emit("authenticate", jwt);
        socket.on("updateaccounts", (data) => {
          console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
          console.log(data);
          console.log(" Client Action initated: Getting new Trade Data");
          // newtrade();
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, [user, location?.pathname, jwt]);

  if (user === null) {
    return <Redirect to="/login" />;
  } else {
    return (
      <Theme>
        <Switch>
          <Route path={`${match.path}/home`} exact component={HomePage} />
          <Route
            path={`${match.path}/market-place`}
            exact
            component={StrategyLibrary}
          />
          <Route
            path={`${match.path}/portfolio-watch`}
            exact
            component={PortfolioWatch}
          />
          <Route
            path={`${match.path}/quantstats`}
            exact
            component={Quantstats}
          />
          <Route path={`${match.path}/support`} exact component={Help} />
          <Route path={`${match.path}/tradelog`} exact component={TradeLogs} />
          <Route
            path={`${match.path}/account-setting/account-details`}
            exact
            component={AccountSettings}
          />
          <Route
            path={`${match.path}/account-setting/user-details`}
            exact
            component={AccountSettings}
          />
          <Route
            path={`${match.path}/account-setting/configure-broker`}
            exact
            component={AccountSettings}
          />
          <Route
            path={`${match.path}/account-setting`}
            exact
            component={AccountSettings}
          />
          <Route path="/dashboard">
            <Redirect to="/dashboard/portfolio-watch" />
          </Route>
        </Switch>
      </Theme>
    );
  }
}

export default LoggedInRoutes;
