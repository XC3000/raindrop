/** @format */

import { makeStyles, Typography, Grid } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  statisticCardContainer: {
    display: "flex",
    flexDirection: "column",
    border: `1px solid ${theme.palette.background.stroke}`,
    backgroundColor: theme.palette.background.BG,
    borderRadius: "13px",
    padding: "10px",
    minWidth: "140px",
    maxWidth: "140px",
    minHeight: "65px",
    maxHeight: "65px",
    marginRight: "10px",
    marginBottom: "10px",
  },
  column: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5px",
  },
}));

export default function StatisticCardComponent({ cardData, cardType }) {
  const classes = useStyles();
  return (
    <div className={classes.statisticCardContainer}>
      <Grid container direction="row" justify="center">
        <Grid item>
          <Typography style={{ fontSize: "16px" }}>
            {cardData["Strategy Display"]}
          </Typography>
        </Grid>
      </Grid>
      <div className={classes.column}>
        <Typography variant="body1" color="primary">
          {cardData["Parameter"]}
        </Typography>
      </div>

      {/* <div className={classes.column}>
        <Typography variant="body2">Strategy</Typography>
        <Typography variant="body2">{cardData["Strategy Display"]}</Typography>
      </div> */}
      {/* <div className={classes.column}>
				<Typography variant="body2">Benchmark</Typography>
				<Typography variant="body2">
					{" "}
					{cardData["Benchmark Display"]}
				</Typography>
			</div> */}
    </div>
  );
}
