/** @format */

import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  subscribeInputs: {
    width: "200px",
    height: "30px",
    padding: "0px 5px",
    boxSizing: "border-box",
    borderRadius: "5px",
    fontSize: "12px",
    backgroundColor: theme.palette.background.BG,
    border: `1px solid ${theme.palette.background.stroke}`,
    color: theme.palette.text.primary,
    "&:focus": {
      outline: "none",
      border: "1px solid #4684f0",
    },
  },
}));

export default function APICredentials({
  handleChange,
  brokersList,
  brokerName,
  addBrokerFormData,
}) {
  const classes = useStyles();
  let inputsArray = [];
  if (!brokerName) {
    console.log("Broker not selected", brokerName);
  } else {
    let StepsObj = brokersList.filter(
      (item) => item?.["Broker Details"]["Broker Name"] === brokerName
    )[0]["Step 2"];

    for (let x in StepsObj) {
      inputsArray = [...inputsArray, [x, StepsObj[x][0]]];
    }
  }
  //   console.log("Step2...", inputsArray);
  return (
    <Grid container direction="row" spacing={2} justify="flex-start">
      {inputsArray?.map((item) => (
        <Grid item key={item[0]}>
          <label>
            <Typography variant="body2">{item[0]}</Typography>
          </label>
          <input
            type="text"
            className={classes.subscribeInputs}
            name={item[1]}
            onChange={handleChange}
            value={addBrokerFormData?.[item[1]]}
          />
        </Grid>
      ))}
    </Grid>
  );
}
