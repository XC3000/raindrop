/** @format */

import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuItemBlock: {},
  menuItemBlockTitle: {
    // border: "1px solid red",
    padding: "10px 10px",
    borderBottom: `1px solid ${theme.palette.background.stroke}`,
    marginBottom: "3px",
  },
  menuItemBlockItems: {
    padding: "5px 15px",
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.primary.main,
      borderLeft: `2px solid ${theme.palette.primary.main}`,
    },
  },
}));

export default function MenuItems({ activeMenuItem }) {
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <Grid container direction="column" className={classes.menuItemBlock}>
        <Grid item className={classes.menuItemBlockTitle}>
          <Typography variant="body1">Account Management</Typography>
        </Grid>
        <Link to="/dashboard/account-setting/account-details">
          <Grid
            item
            className={classes.menuItemBlockItems}
            style={{
              color: `${activeMenuItem === "Account Details" ? "#4684F0" : ""}`,
            }}
          >
            Account Details
          </Grid>
        </Link>
        <Link to="/dashboard/account-setting/user-details">
          <Grid
            item
            className={classes.menuItemBlockItems}
            style={{
              color: `${activeMenuItem === "User Details" ? "#4684F0" : ""}`,
            }}
          >
            User Details
          </Grid>
        </Link>
      </Grid>
      {/* -------------Broker Management--------------- */}
      <Grid container direction="column" className={classes.menuItemBlock}>
        <Grid item className={classes.menuItemBlockTitle}>
          <Typography variant="body1">Broker Management</Typography>
        </Grid>
        <Link to="/dashboard/account-setting/configure-broker">
          <Grid
            item
            className={classes.menuItemBlockItems}
            style={{
              color: `${
                activeMenuItem === "Configure Broker" ? "#4684F0" : ""
              }`,
            }}
          >
            Configure Broker Account
          </Grid>
        </Link>
      </Grid>
    </Grid>
  );
}
