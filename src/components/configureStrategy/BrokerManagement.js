/** @format */

import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import ErrorMsg from "../screenMessages/ErrorMsg";
import SuccessMsg from "../screenMessages/SuccessMsg";
import updatestrategybrokermapping from "../../apicalls/updatestrategybrokermapping";

const useStyles = makeStyles((theme) => ({
  SubscribeStrategyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",

    minWidth: "700px",
    maxWidth: "700px",
    minHeight: "500px",
    maxHeight: "500px",
  },
  cards: {
    minWidth: "180px",
    maxWidth: "180px",
    height: "70px",
    borderRadius: "13px",
    backgroundColor: theme.palette.background.BG,
    border: `1px solid ${theme.palette.background.stroke}`,
    padding: "5px",
    marginRight: "10px",
    cursor: "pointer",
    boxSizing: "border-box",
  },
  changeBrokerMapping: {
    display: "flex",
    flexDirection: "row",
    justify: "flex-start",
    flexWrap: "wrap",
    minWidth: "600px",
    maxWidth: "600px",
    // overflowX: "scroll",
    // overflowY: "hidden",
    minHeight: "200px",
    // maxHeight: "100px",
    paddingTop: "5px",
    paddingLeft: "5px",
    // border: "1px solid red",
  },
}));

export default function BrokerManagement({ setaddBrokerActive, handleClose }) {
  const classes = useStyles();
  const [errorMsgFromCall, setErrorMsgFromCall] = useState(null);
  const [successMsgFromCall, setSuccessMsgFromCall] = useState(null);

  const userStrategyDetails = useSelector(
    (state) => state?.selectedPortfolioCard
  );
  const userId = useSelector((state) => state?.authReducer?.user?.uid);

  const availableUserBrokers = useSelector(
    (state) => state?.appData?.userBrokers
  );
  const currentBroker = availableUserBrokers?.filter(
    (item) => item.brokername === userStrategyDetails?.["Broker Name"]
  )[0];
  const brokersAvailabletoMap = availableUserBrokers?.filter(
    (item) => item.brokername !== userStrategyDetails?.["Broker Name"]
  );
  const [brokerSelected, setbrokerSeleted] = useState(
    currentBroker?.brokername
  );
  const [configureData, setConfigureData] = useState({});

  useEffect(() => {
    if (currentBroker)
      setConfigureData({
        ...configureData,
        brokername: currentBroker?.brokername,
        brokerid: currentBroker?.brokerid,
      });
  }, [currentBroker]);

  async function handleSubmit() {
    setErrorMsgFromCall(null);
    setSuccessMsgFromCall(null);
    let formData = {
      ...configureData,
      userid: userId,
      strategyid: userStrategyDetails?.["Strategy ID"],
    };
    const { error, successMsg } = await updatestrategybrokermapping(formData);
    if (error) setErrorMsgFromCall(error);
    if (successMsg) setSuccessMsgFromCall(successMsg);
  }
  function getMsgComponent() {
    if (errorMsgFromCall) return <ErrorMsg message={errorMsgFromCall} />;
    if (successMsgFromCall) return <SuccessMsg message={successMsgFromCall} />;
    if (!errorMsgFromCall && !successMsgFromCall) return null;
  }
  // console.log("configureData", configureData);
  return (
    <div className={classes.SubscribeStrategyContainer}>
      {/* -------------------------------------------------Current Broker ---------------------------------------------- */}
      <Typography
        variant="body1"
        color="primary"
        style={{ marginBottom: "10px", fontWeight: "700" }}
      >
        Current Broker
      </Typography>
      <Grid container direction="row" justify="flex-start">
        {currentBroker && (
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={1}
            className={classes.cards}
          >
            <Grid item direction="column" justifu="flex-start">
              <Typography variant="body2" color="primary">
                {currentBroker?.brokername}
              </Typography>
              <Typography variant="body2">Verified</Typography>
              <Typography variant="body2">
                {currentBroker?.["timestamp"]}
              </Typography>
            </Grid>
          </Grid>
        )}
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.cards}
          onClick={() => setaddBrokerActive(true)}
        >
          <AddCircleOutlineIcon />
          <Typography variant="body1" color="primary">
            Add a new Broker
          </Typography>
        </Grid>
      </Grid>
      {/* -------------------------------------------------Change Broker Mapping ---------------------------------------------- */}
      {brokersAvailabletoMap.length > 0 && (
        <>
          <Typography
            variant="body1"
            color="primary"
            style={{
              marginBottom: "10px",
              fontWeight: "700",
              marginTop: "10px",
            }}
          >
            Change Broker Mapping
          </Typography>
          <div className={classes.changeBrokerMapping}>
            {brokersAvailabletoMap?.map((item) => (
              <Grid
                item
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={1}
                className={classes.cards}
                onClick={() => {
                  setbrokerSeleted(item?.["brokername"]);
                  setConfigureData({
                    ...configureData,
                    brokername: item?.["brokername"],
                    brokerid: item?.["brokerid"],
                  });
                }}
                style={{
                  border:
                    brokerSelected === item?.["brokername"]
                      ? "2px solid #4684F0"
                      : "none",
                }}
              >
                <Grid item direction="column" justify="flex-start">
                  {brokerSelected === item?.["brokername"] ? (
                    <RadioButtonCheckedIcon style={{ fontSize: "16px" }} />
                  ) : (
                    <RadioButtonUncheckedIcon style={{ fontSize: "16px" }} />
                  )}
                </Grid>
                <Grid item direction="column" justifu="flex-start">
                  <Typography variant="body2" color="primary">
                    {item?.["brokername"]}
                  </Typography>
                  <Typography variant="body2">Verified</Typography>
                  <Typography variant="body2">{item?.["timestamp"]}</Typography>
                </Grid>
              </Grid>
            ))}
          </div>
        </>
      )}

      {/* ----------------------------------------Button-------------------------------- */}
      <Grid
        container
        fullWidth
        style={{ marginTop: "20px" }}
        direction="row"
        justify="flex-start"
      >
        <Button
          variant="contained"
          color="secondary"
          style={{ width: "30%", textTransform: "inherit" }}
          onClick={handleSubmit}
        >
          Update Broker Mapping
        </Button>
      </Grid>
      {getMsgComponent()}
    </div>
  );
}
