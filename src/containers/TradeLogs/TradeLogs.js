/** @format */

import { Typography } from "@material-ui/core";
import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import TradeLog from "./TradeLog.png";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "90vh",
    marginTop: "-80px",
  },
}));

export default function TradeLogs() {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
        spacing={2}
        style={{ flex: ".3" }}
      >
        <Grid item>
          <Typography variant="h3">TradeLog</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">
            Analyse your account performance across different time-periods,
            instruments, strategies and brokers easily.
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            color="primary"
            style={{
              fontSize: "26px",
              fontFamily: "Roboto, Helvetica, Arial, sans-serif",
              fontWeight: "600",
            }}
          >
            Coming Soon!
          </Typography>
        </Grid>
      </Grid>
      <Grid container style={{ flex: ".5" }}>
        <img
          src={TradeLog}
          alt="quantstats"
          style={{
            padding: "30px 30px 30px 0px",
            position: "relative",
            top: "40px",
            height: "500px",
            width: "700px",
          }}
        />
      </Grid>
    </Grid>
  );
}
