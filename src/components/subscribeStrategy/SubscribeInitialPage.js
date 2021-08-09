/** @format */

import React, { useState } from "react";
import {
  Button,
  Grid,
  makeStyles,
  Typography,
  Slider,
  withStyles,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import { getStringToNumber } from "../../utilityFunctions/getStringToNumber";
import { useSelector } from "react-redux";
import { numberWithCommas } from "../../utilityFunctions/numberWithCommas";
import { PrettoSlider } from "../PrettoSlider";

const useStyles = makeStyles((theme) => ({
  SubscribeStrategyContainer: {
    minWidth: "700px",
    maxWidth: "700px",
    minHeight: "650px",
    maxHeight: "650px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "0px 20px 20px 20px",
    boxSizing: "border-box",
    overflowX: "hidden",
    backgroundColor: theme.palette.background.paper,
    margin: "0 auto",
    borderRadius: "13px",
    // border: "1px solid red",
  },
  masterDiv: {
    margin: "0 auto",
  },
  header: {
    position: "sticky",
    top: "0",
    backgroundColor: theme.palette.background.paper,
    height: "40px",
    padding: "10px 0px",
  },
  cards: {
    minWidth: "185px",
    maxWidth: "185px",
    height: "70px",
    borderRadius: "13px",
    backgroundColor: theme.palette.background.BG,
    border: `1px solid ${theme.palette.background.stroke}`,
    padding: "5px",
    marginRight: "10px",
    cursor: "pointer",
    boxSizing: "border-box",
  },
  selectedExistingBroker: {
    display: "flex",
    flexDirection: "row",
    justify: "flex-start",
    minWidth: "550px",
    maxWidth: "550px",
    overflowX: "scroll",
    overflowY: "hidden",
    minHeight: "100px",
    paddingTop: "5px",
  },
  exposureCard: {
    minWidth: "100%",
    maxWidth: "100%",
    borderRadius: "13px",
    backgroundColor: theme.palette.background.BG,
    border: `1px solid ${theme.palette.background.stroke}`,
    padding: "25px 40px",
    marginBottom: "10px",
    // border: "1px solid red",
  },
  orderSummaryCard: {
    minWidth: "100%",
    maxWidth: "100%",
    borderRadius: "13px",
    backgroundColor: theme.palette.background.BG,
    border: `1px solid ${theme.palette.background.stroke}`,
    padding: "5px",
    marginBottom: "10px",
    // border: "1px solid red",
  },

  input: {
    width: "50px",
    height: "20px",
    "&::-webkit-inner-spin-button": {
      opacity: "1",
    },
  },
}));

export default function SubscribeInitialPage({
  subscriptionData,
  setSubscriptionData,
  baseSubscriptionFees,
  setPageType,
  handleClose,
  setTaxes,
  setadditionalSubscriptionFees,
  additionalSubscriptionFees,
  setAdditionalSubscribedValuebyUser,
  additionalSubscribedValuebyUser,
}) {
  const classes = useStyles();
  const strategyDetails = useSelector((state) => state?.currentStrategyCard);
  const userBrokers = useSelector((state) => state?.appData?.userBrokers);
  const [slecletedExistingBrokerCard, setslecletedExistingBrokerCard] =
    useState(false);

  let baseSubscriptionValue = getStringToNumber(
    strategyDetails?.["Min. Investment"]
  );
  let additionalSubscriptionValue = getStringToNumber(
    strategyDetails?.["Additonal Investment"]
  );

  const [totalLots, setTotalLOts] = useState(
    subscriptionData?.additionallots ? subscriptionData?.additionallots : 0
  );

  const [TotalSubsValue, setTotalSubsValue] = useState(baseSubscriptionValue);
  const [brokerSelected, setbrokerSeleted] = useState(
    subscriptionData?.brokername
      ? subscriptionData?.brokername
      : "Select broker later"
  );
  const [additionalInvestmentAmount, setadditionalInvestmentAmount] =
    useState(0);

  const handleChange = (value) => {
    // let multiple = e.target.value;
    let totalValue = value;
    setAdditionalSubscribedValuebyUser(value);
    setadditionalInvestmentAmount(value - baseSubscriptionValue);
    setTotalSubsValue(value);
    setTotalLOts(value / additionalSubscriptionValue);
  };

  function handleNextClick() {
    setSubscriptionData({
      ...subscriptionData,
      additionalsubscription: additionalInvestmentAmount,
      additionallots: totalLots - 1,
    });
    setPageType("agreement");
  }
  const calculateAdditionalSubscriptionFees = () => {
    let fees = 0.01 * additionalInvestmentAmount;
    setadditionalSubscriptionFees(fees);
    return fees;
  };
  const calculateTaxes = () => {
    // let total = 0.18 * (baseSubscriptionFees + additionalSubscriptionFees);
    let total = 0;
    setTaxes(total);
    return numberWithCommas(total);
  };
  //markers for Slider
  const marks = [
    {
      value: baseSubscriptionValue,
      label: ` ${numberWithCommas(baseSubscriptionValue)} `,
    },
    {
      value: getStringToNumber(strategyDetails?.["Max. Investment"]),
      label: `${strategyDetails?.["Max. Investment"]}`,
    },
  ];

  function valuetext(value) {
    handleChange(value);
  }
  // console.log(subscriptionData);

  return (
    <div className={classes.SubscribeStrategyContainer}>
      <div className={classes.masterDiv}>
        <Grid
          container
          direction="row"
          justify="space-between"
          className={classes.header}
        >
          <Grid item>
            <Typography varaint="body1" style={{ fontWeight: "700" }}>
              {strategyDetails?.["Strategy Name"]}
            </Typography>
          </Grid>
          <Grid item>
            <HighlightOffIcon
              style={{ cursor: "pointer" }}
              onClick={handleClose}
            />
          </Grid>
        </Grid>

        {/*-------------------------------------------------- Select  Broker ------------------------------*/}
        <Typography
          variant="body1"
          color="primary"
          style={{ marginBottom: "10px", fontWeight: "700" }}
        >
          Select Broker
        </Typography>

        <Grid container direction="row" justify="flex-start">
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.cards}
            onClick={() => setPageType("addBroker")} // onClick change page type to addBroker
          >
            <AddCircleOutlineIcon style={{ fontSize: "16px" }} />
            <Typography variant="body1" color="primary">
              Add A New Broker
            </Typography>
          </Grid>

          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.cards}
            onClick={() => {
              setbrokerSeleted("Select broker later");
              setslecletedExistingBrokerCard(false);
              setSubscriptionData({
                ...subscriptionData,
                brokername: "",
                brokerid: "",
              });
            }}
            style={{
              border:
                brokerSelected === "Select broker later"
                  ? "2px solid #4684F0"
                  : "none",
            }}
          >
            {brokerSelected === "Select broker later" ? (
              <RadioButtonCheckedIcon style={{ fontSize: "16px" }} />
            ) : (
              <RadioButtonUncheckedIcon style={{ fontSize: "16px" }} />
            )}

            <Typography variant="body1" color="primary">
              Select Broker Later
            </Typography>
          </Grid>
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.cards}
            onClick={() => {
              setbrokerSeleted("");
              setslecletedExistingBrokerCard(!slecletedExistingBrokerCard);
            }}
            style={{
              border: slecletedExistingBrokerCard
                ? "2px solid #4684F0"
                : "none",
            }}
          >
            {slecletedExistingBrokerCard ? (
              <RadioButtonCheckedIcon style={{ fontSize: "16px" }} />
            ) : (
              <RadioButtonUncheckedIcon style={{ fontSize: "16px" }} />
            )}

            <Typography variant="body1" color="primary">
              Use An Existing Broker
            </Typography>
          </Grid>
        </Grid>
        {/* ------------------------------------------------ Select Existing Broker ------------------------------------------*/}
        {slecletedExistingBrokerCard && (
          <>
            <Typography
              variant="body1"
              color="primary"
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                fontWeight: "700",
              }}
            >
              My Mapped Brokers
            </Typography>

            <div container className={classes.selectedExistingBroker}>
              {userBrokers?.map((item) => (
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                  spacing={1}
                  className={classes.cards}
                  onClick={() => {
                    setbrokerSeleted(item?.["brokername"]);
                    setSubscriptionData({
                      ...subscriptionData,
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
                    <Typography variant="body2">
                      {item?.["timestamp"]}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </div>
          </>
        )}
        {/* --------------------------------------------- Exposure -------------------------------------------- */}
        <Typography
          variant="body1"
          color="primary"
          style={{ marginBottom: "10px", marginTop: "10px", fontWeight: "700" }}
        >
          Select Subscription Amount
        </Typography>

        <Grid
          container
          direction="column"
          spacing={1}
          className={classes.exposureCard}
        >
          <PrettoSlider
            className={classes.sliderRoot}
            getAriaValueText={valuetext}
            step={additionalSubscriptionValue}
            marks={marks}
            valueLabelDisplay="on"
            defaultValue={additionalSubscribedValuebyUser}
            min={baseSubscriptionValue}
            max={getStringToNumber(strategyDetails?.["Max. Investment"])}
          />
        </Grid>
        {/* ---------------------------------------------------Order summary and Billing Details --------------------------------  */}
        <Typography
          variant="body1"
          color="primary"
          style={{ marginBottom: "10px", fontWeight: "700" }}
        >
          Order Summary
        </Typography>
        <Grid
          container
          direction="column"
          className={classes.orderSummaryCard}
          spacing={1}
        >
          <Grid item container direction="row" justify="space-between">
            <Typography variant="body2">Strategy Name</Typography>
            <Typography variant="body2">
              {strategyDetails?.["Strategy Name"]}
            </Typography>
          </Grid>
          <Grid item container direction="row" justify="space-between">
            <Typography variant="body2">Strategy ID</Typography>
            <Typography variant="body2">
              {strategyDetails?.["Strategy ID"]}
            </Typography>
          </Grid>
          <Grid item container direction="row" justify="space-between">
            <Typography variant="body2">Broker Name</Typography>
            <Typography variant="body2">
              {brokerSelected === "Select broker later"
                ? "--"
                : subscriptionData?.brokername}
            </Typography>
          </Grid>
          <Grid item container direction="row" justify="space-between">
            <Typography variant="body2">Broker ID</Typography>
            <Typography variant="body2">
              {brokerSelected === "Select broker later"
                ? "--"
                : subscriptionData?.brokerid}
            </Typography>
          </Grid>
          <Grid item container direction="row" justify="space-between">
            <Typography variant="body2">Total Subscription Value</Typography>
            <Typography variant="body2">
              {numberWithCommas(TotalSubsValue)}
            </Typography>
          </Grid>
          {/* -----------------------------Total Subscription fees--------------------- */}
          <Grid item container direction="row" justify="space-between">
            <Typography variant="body2">Total Subscription Fees</Typography>
            <Typography variant="body2">
              {/* additional subscription fee = 1% of Base Subscription value  */}
              {numberWithCommas(
                calculateAdditionalSubscriptionFees() + baseSubscriptionFees
              )}
            </Typography>
          </Grid>
          {/* ------------------------------Taxes----------------------------------- */}
          <Grid item container direction="row" justify="space-between">
            <Typography variant="body2">Taxes (GST)</Typography>
            <Typography variant="body2">{calculateTaxes()}</Typography>
          </Grid>
        </Grid>

        {/* ------------------------------------------------- Button ------------------------------------------------ */}
        <Grid
          container
          style={{ marginTop: "10px" }}
          direction="row"
          justify="center"
        >
          <Button
            variant="contained"
            color="secondary"
            style={{ width: "50%" }}
            onClick={handleNextClick}
          >
            Next
          </Button>
        </Grid>
      </div>
    </div>
  );
}
