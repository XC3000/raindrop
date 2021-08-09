/** @format */

import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import MenuItems from "./MenuItems";
import AccountDetails from "../../components/accontSetting/AccountDetails/AccountDetails";
import UserDetails from "../../components/accontSetting/UserDetails/UserDetails";
import { useLocation } from "react-router-dom";
import ConfigureBroker from "../../components/accontSetting/ConfigureBroker/ConfigureBroker";

const useStyles = makeStyles((theme) => ({
  settingContainer: {
    maxWidth: "98vw",
    minWidth: "98vw",
    minHeight: "90vh",
    maxHeight: "90vh",
    margin: "10px",
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.background.stroke}`,
    borderRadius: "13px",
  },
  menuItem: {
    flex: "0.25",
    // padding: "10px",
    borderRight: `1px solid ${theme.palette.background.stroke}`,
  },
  accountSetting: {
    flex: "0.75",
    padding: "10px",
  },
}));

export default function AccountSettings() {
  const classes = useStyles();
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState("Account Details");

  function getComponents() {
    if (activeMenuItem === "Account Details") return <AccountDetails />;
    if (activeMenuItem === "User Details") return <UserDetails />;
    if (activeMenuItem === "Configure Broker") return <ConfigureBroker />;
  }

  useEffect(() => {
    if (location.pathname === "/dashboard/account-setting")
      setActiveMenuItem("Account Details");
    if (location.pathname === "/dashboard/account-setting/account-details")
      setActiveMenuItem("Account Details");
    if (location.pathname === "/dashboard/account-setting/user-details")
      setActiveMenuItem("User Details");
    if (location.pathname === "/dashboard/account-setting/configure-broker")
      setActiveMenuItem("Configure Broker");
  }, [location.pathname]);

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      className={classes.settingContainer}
    >
      <Grid item className={classes.menuItem}>
        <MenuItems activeMenuItem={activeMenuItem} />
      </Grid>
      <Grid item className={classes.accountSetting}>
        {" "}
        {getComponents()}
      </Grid>
    </Grid>
  );
}
