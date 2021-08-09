/** @format */

import { Checkbox, Grid, makeStyles, Typography } from "@material-ui/core";
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
export default function SelectBroker({
  handleChange,
  brokersList,
  brokerName,
  addBrokerFormData,
}) {
  //   console.log(brokersList.map((item) => item["Broker Details"]["Broker Name"]));
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  const handleCheckbox = (event) => {
    setChecked(!checked);
  };
  return (
    <Grid container direction="column" justify="flex-start">
      <Grid container direction="row" justify="flex-start">
        <Grid item>
          <label>
            <Typography variant="body2">Broker Name</Typography>
          </label>
          <select
            className={classes.subscribeInputs}
            name="brokername"
            onChange={handleChange}
            required
            value={
              addBrokerFormData?.brokername
                ? addBrokerFormData?.brokername
                : null
            }
          >
            {brokersList.length > 0 ? (
              brokersList.map((item) => (
                <option
                  value={item["Broker Details"]["Broker Name"]}
                  style={{ width: "100%" }}
                >
                  {item["Broker Details"]["Broker Name"]}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No broker available
              </option>
            )}
            <option hidden disabled selected value></option>
          </select>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <Grid item>
          <Checkbox
            checked={checked}
            color="primary"
            onChange={handleCheckbox}
            inputProps={{ "aria-label": "secondary checkbox" }}
            style={{ marginLeft: "-10px" }}
          />
        </Grid>
        <Grid item>
          <Typography variant="body2">
            I have an API enabled brokerage account.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
