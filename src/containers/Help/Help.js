/** @format */

import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import HelpImg from "./Help.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "90vh",
  },
}));

export default function Help() {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.container}
      spacing={2}
    >
      <Grid item>
        <Typography variant="h4">User Guide</Typography>
      </Grid>
      <Grid item>
        <img src={HelpImg} ait="help_img" />
      </Grid>
      <Grid item>
        <a
          href="https://www.notion.so/User-Guide-8540ac004d6a4a57b84841256e85cc73"
          target={"_blank"}
        >
          <Button variant="contained" color="primary">
            Go to user Guide
          </Button>
        </a>
      </Grid>
    </Grid>
  );
}
