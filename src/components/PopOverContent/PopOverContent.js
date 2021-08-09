/** @format */

import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "fit-content",
    width: "500px",
    overflow: "auto",
    padding: "5px",
    textAlign: "justify",
  },
}));

export default function PopOverContent({ obj, handlePopoverClose }) {
  const classes = useStyles();
  let keys = Object.entries(obj).slice(1);

  return (
    <>
      {" "}
      <ClickAwayListener onClickAway={handlePopoverClose}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          className={classes.container}
          spacing={1}
        >
          <Grid item>
            {/* title */}
            <Typography color="primary" style={{ fontWeight: "600" }}>
              {obj.Title}
            </Typography>
          </Grid>
          {keys.map((item) => (
            <Grid item>
              {/* title */}
              <Typography
                variant="body2"
                display="inline"
                style={{ fontWeight: "600" }}
              >
                {item[0]}
              </Typography>
              :{" "}
              <Typography variant="body2" display="inline">
                {item[1]}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </ClickAwayListener>
    </>
  );
}
