/** @format */

import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { APIDetails } from "./AddApiDetails";

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

// Step 2 from response
export function BrokerCredential({
  handleChange,
  brokersList,
  brokerName,
  addBrokerFormData,
}) {
  let inputsArray = [];
  if (!brokerName) {
    console.log("brokername not selected");
  } else {
    let StepsObj = brokersList.filter(
      (item) => item?.["Broker Details"]["Broker Name"] === brokerName
    )[0]["Step 1"];
    for (let x in StepsObj) {
      inputsArray = [...inputsArray, [x, StepsObj[x][0]]];
    }
  }
  // console.log("inputsArray...", inputsArray);
  // console.log(console.log(brokersList.map()));
  // console.log(addBrokerFormData?.item?.[1]);
  const classes = useStyles();
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
