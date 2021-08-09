/** @format */

import { Grid, MenuItem, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import InfoIcon from "@material-ui/icons/Info";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import { API } from "../../axios/instance";
import Input from "../Input/Input";
import PopOver from "../PopOver/PopOver";
import PopOverContent from "../PopOverContent/PopOverContent";
import { PopOverdata } from "../../utilityFunctions/popOverData";

export default function PortfolioOverviewBroker() {
  const brokersList = useSelector((state) => state?.appData?.userBrokers);
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [userMarginData, setUserMarginData] = useState(null);
  const [error, setError] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null); // for popOver
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    // console.log("close....");
    setAnchorEl(null);
  };

  async function userMarginApiCall(brokername) {
    const brokerData = brokersList?.filter(
      (item) => item.brokername === brokername
    )[0];
    // console.log("brokerData..", brokerData);
    const body = {
      brokername: brokerData?.brokername,
      brokerid: brokerData?.brokerid,
    };
    const response = await API.post(
      "Raindrop/raintech.php?apicall=getusermargin",
      qs.stringify(body)
    );
    if (response?.data?.E) {
      // console.log("error...", response?.data?.M);
      setError(response?.data?.M);
      setUserMarginData(null);
    } else {
      setError("");
      setUserMarginData(response?.data?.Data?.[0]);
    }
  }
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "SEND_USER_BROKERS_REQUEST" });
  }, []);
  useEffect(() => {
    setSelectedBroker(
      brokersList?.length > 0 ? brokersList?.[0]["brokername"] : ""
    );
    if (brokersList?.length > 0)
      userMarginApiCall(brokersList?.[0]["brokername"]);
  }, [brokersList]);

  const handleChange = (e) => {
    setSelectedBroker(e.target.value);
    userMarginApiCall(e.target.value);
  };
  // console.log("selectedBroker.....", selectedBroker);
  // console.log(userMarginData);
  return (
    <Grid container direction="column" style={{ marginTop: "10px" }}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item container direction="row" alignItems="center" md={6}>
          <Typography variant="body1" color="primary">
            Account Status at Broker{" "}
          </Typography>
          <InfoIcon
            color="primary"
            fontSize="small"
            style={{ marginLeft: "5px" }}
            onClick={handlePopoverOpen}
            id="watchBroker"
          />
          <PopOver
            children={
              <PopOverContent
                handlePopoverClose={handlePopoverClose}
                obj={PopOverdata["Portfolio Watch Broker Summary"]}
              />
            }
            anchorEl={anchorEl}
            handlePopoverClose={handlePopoverClose}
            id="watchBroker"
          />
        </Grid>
        <Grid item>
          {" "}
          <Input
            select={true}
            selectChildren={brokersList?.map((broker) => (
              <MenuItem value={broker.brokername} key={broker.brokerid}>
                {broker.brokername}
              </MenuItem>
            ))}
            onChange={handleChange}
            value={selectedBroker}
            label="Select Broker"
          />
        </Grid>
      </Grid>
      {userMarginData && (
        <>
          {" "}
          <Grid
            container
            direction="row"
            justify="space-between"
            style={{ marginBottom: "5px" }}
          >
            <Typography variant="body2">Total Margin</Typography>
            <Typography variant="body2">
              {userMarginData?.["Total Margin"]}
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-between"
            style={{ marginBottom: "5px" }}
          >
            <Typography variant="body2">Utilized Margin</Typography>
            <Typography variant="body2">
              {userMarginData?.["Utilized Margin"]}
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-between"
            style={{ marginBottom: "5px" }}
          >
            <Typography variant="body2">Un-utilized Margin</Typography>
            <Typography variant="body2">
              {userMarginData?.["Un-utilized Margin"]}
            </Typography>
          </Grid>
        </>
      )}
      {/* errors */}
      <Typography variant="body2">{error}</Typography>
    </Grid>
  );
}
