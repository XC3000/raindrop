/** @format */

import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import ErrorPage from "../errorPage/ErrorPage";

const useStyles = makeStyles((theme) => ({
  performanceTableContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "80px",
    mixHeight: "80px",
    backgroundColor: theme.palette.background.BG,
    padding: "10px",
    border: `1px solid ${theme.palette.background.stroke}`,
    borderRadius: "13px",
    marginBottom: "20px",
  },

  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  items: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  column1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  parameter: {
    wordWrap: "break-word",
    whiteSpace: "normal",
  },
  strategy: {
    backgroundColor: theme.palette.background.default,
    // border: "1px solid red",
  },
}));

function Performancetable() {
  const classes = useStyles();
  const performanceData = useSelector(
    (state) => state?.appData?.performanceData
  );
  const error = useSelector((state) => state?.appError?.performanceData);
  // console.log(performanceData);

  if (error) {
    return <ErrorPage errorText={error} component="performanceTable" />;
  }
  return (
    <div className={classes.performanceTableContainer}>
      <Typography
        variant="body1"
        color="primary"
        style={{ marginBottom: "5px" }}
      >
        Performance
      </Typography>
      <div className={classes.content}>
        <div className={classes.column1}>
          <Typography variant="body2">Parameter</Typography>
          <Typography variant="body2">Strategy</Typography>
          {/* <Typography variant="body2">Benchmark</Typography> */}
        </div>
        {performanceData?.map((item) => (
          <div className={classes.items}>
            <span classes={classes.parameter}>
              <Typography variant="body2">{item["Parameter"]}</Typography>
            </span>

            <span classes={classes.strategy}>
              <Typography variant="body2">{item["Strategy"]}</Typography>
            </span>
            {/* <span classes={classes.benchmark}>
							<Typography variant="body2">{item["Benchmark"]}</Typography>
						</span> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Performancetable;
