/** @format */

import React, { useState } from "react";
import {
  AppBar,
  Button,
  List,
  ListItem,
  ListItemIcon,
  makeStyles,
  Typography,
} from "@material-ui/core";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { types as authTypes } from "../../actions/action.auth";
import { types } from "../../actions/action.changeTheme";
import { useHistory } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import logoBetaDark from "./logoBetaDark.svg";
import logoBetaLight from "./logoBetaLight.svg";
import dark_mode_black_24dp from "./dark_mode_black_24dp.svg";
import dark_mode_white_24dp from "./dark_mode_white_24dp.svg";
import light_mode_white_24dp from "./light_mode_white_24dp.svg";

const useStyles = makeStyles((theme) => ({
  navbarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.palette.background.nav,
    paddingLeft: "10px",
    minHeight: "50px",
    maxHeight: "50px",
    position: "static",
    boxShadow: "none",
    // border: "2px red solid",
    color: theme.palette.text.primary,
  },
  theme_icon: {
    color: theme.palette.text.primary,
  },
  logout: {
    color: "#930202",
    textDecoration: "inherit",
    fontWeight: "600",
    " &:hover": {
      backgroundColor: "inherit",
    },
  },
  iconContainer: {
    marginLeft: "-40px",
    height: "28px",
    width: "78px",
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.background.stroke}`,
    borderRadius: "15px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icondiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    padding: "4px",
    height: "24px",
    width: "100%",
    borderRadius: "15px",
    cursor: "pointer",
    margin: "0 1px",
  },
}));

const navItems = [
  {
    name: "Home",
    link: "/dashboard/home",
  },
  {
    name: "PortfolioWatch",
    link: "/dashboard/portfolio-watch",
  },
  {
    name: "MarketPlace",
    link: "/dashboard/market-place",
  },
  {
    name: "QuantStats",
    link: "/dashboard/quantstats",
  },
  {
    name: "TradeLog",
    link: "/dashboard/tradelog",
  },

  {
    name: "Support",
    link: "/dashboard/support",
  },
  {
    name: "",
    link: "/dashboard/account-setting/account-details",
  },
];

function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { darkTheme } = useSelector((state) => state.changeThemeReducer);
  const userId = useSelector((state) => state?.authReducer?.user?.uid);
  const classes = useStyles();
  const { pathname } = useLocation();
  // console.log(pathname);

  const handleClick = () => {
    dispatch({ type: types.CHANGE_THEME });
  };

  const handleLogout = () => {
    dispatch({ type: authTypes.AUTH_LOGOUT });
    history.push("/login");
  };

  return (
    <AppBar className={classes.navbarContainer}>
      <Link to="/dashboard/home">
        <div className="navbar_icon">
          <img src={darkTheme ? logoBetaDark : logoBetaLight} alt="logo" />
        </div>
      </Link>

      <List className="navbar_items">
        {navItems.map((item) => (
          <ListItem
            key={item}
            style={{ whiteSpace: "nowrap", cursor: "pointer" }}
          >
            <Link to={item.link}>
              <Typography
                variant="body1"
                color={pathname === item.link ? "primary" : ""}
              >
                {item.name}
              </Typography>
            </Link>
          </ListItem>
        ))}
        <ListItem>
          <div className={classes.iconContainer}>
            {/* ---------------light theme icon-------- */}
            <div
              className={classes.icondiv}
              style={{
                backgroundColor: darkTheme ? null : "#808080",
              }}
            >
              <img
                src={light_mode_white_24dp}
                alt="light mode"
                onClick={handleClick}
                style={{ height: "16px" }}
              />
            </div>
            {/* ---------------dark theme icon-------- */}
            <div
              className={classes.icondiv}
              style={{
                backgroundColor: darkTheme ? "#34323D" : null,
              }}
            >
              <img
                src={darkTheme ? dark_mode_white_24dp : dark_mode_black_24dp}
                alt="dark mode"
                style={{
                  height: "16px",
                }}
                onClick={handleClick}
              />
            </div>
          </div>
        </ListItem>
        <Link to="/dashboard/account-setting/account-details">
          <ListItem>
            <Typography
              variant="body1"
              color="primary"
              style={{
                fontWeight: "600",
                // border: "1px solid red",
                margin: "10px 0",
              }}
            >
              {userId}
            </Typography>
          </ListItem>
        </Link>

        <ListItem>
          <Button
            variant="text"
            className={classes.logout}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </ListItem>
      </List>
    </AppBar>
  );
}

export default Navbar;
