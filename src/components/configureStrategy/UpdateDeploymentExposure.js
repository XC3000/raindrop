// total active subscription - constant
// total utilized subscription - variable set by slider (min =0, max = total active Subscrition,
// steps increment = minimum investment value(base_mininvestment))
// variable (total unutilized subscription = active subscription - utilized subscription)
// base lots = if utilized subscription == 0 then 0, else 1
// additional lots = if utlized subscription > 0, then [ (utilized subs / base_mininvestemnt) - 1 ];else, 0
// total lots  =  base + additional
// baseSusbcription = if utilizedSubscription > 0 then base min_investment else 0
//additional Subscription  = if total utilized subscription > 0 then [((utilized subscription - base min investment)/ base min investment)-1], else 0

import {
  makeStyles,
  Grid,
  Button,
  Typography,
  Divider,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getUserSubscriptionSummary from "../../apicalls/getUserSubscriptionSummary";
import updateDeploymentValue from "../../apicalls/updateDeploymentValue";
import { getStringToNumber } from "../../utilityFunctions/getStringToNumber";
import { PrettoSlider } from "../PrettoSlider";
import ErrorMsg from "../screenMessages/ErrorMsg";
import SuccessMsg from "../screenMessages/SuccessMsg";
import { numberWithCommas } from "../../utilityFunctions/numberWithCommas";

const useStyles = makeStyles((theme) => ({
  SubscribeStrategyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "10px",
  },
  boxStyle: {
    minWidth: "100%",
    maxWidth: "100%",
    borderRadius: "13px",
    backgroundColor: theme.palette.background.BG,
    border: `1px solid ${theme.palette.background.stroke}`,
    padding: "5px",
    marginBottom: "10px",
  },
  sliderRoot: {
    width: "100px",
    // border: "1px solid red",
    marginRight: "10px",
    "& .MuiSlider-thumb": {
      height: 16,
      width: 16,
      marginTop: -6,
    },
  },
  input: {
    width: "50px",
    height: "20px",
    "&::-webkit-inner-spin-button": {
      opacity: "1",
    },
  },
}));

export default function UpdateDeploymentExposure() {
  async function getUserSubscriptionSummaryData() {
    const { error, capacity, utilization } = await getUserSubscriptionSummary(
      strategyId
    );
    if (capacity) setStrategyCapacityData(capacity);
    if (utilization) setStrategyUtilizationData(utilization);
  }

  const classes = useStyles();
  const [errorMsgFromCall, setErrorMsgFromCall] = useState(null);
  const [successMsgFromCall, setSuccessMsgFromCall] = useState(null);
  const subscribedStrategyInfo = useSelector(
    (state) => state?.selectedPortfolioCard
  );
  const strategyId = subscribedStrategyInfo?.["Strategy ID"];
  const userId = useSelector((state) => state?.authReducer?.user?.uid);
  const base_minInvestment = getStringToNumber(
    subscribedStrategyInfo?.["Min. Investment"]
  );
  const additional_investment = getStringToNumber(
    subscribedStrategyInfo?.["Additonal Investment"]
  );
  const [strategyCapacityData, setStrategyCapacityData] = useState(null);
  const [strategyUtilizationData, setStrategyUtilizationData] = useState(null);
  const [totalActiveSubscription, setTotalActiveSubscription] = useState(0);
  const [totalUtilizedSubscription, setTotalUtilizedSubscription] = useState(0);
  const [unutilizedSubscription, setUnutilizedSubscription] = useState(0);

  function valuetext(value) {
    // handleTotalUtilizedLotsChnage(value);
    setTotalUtilizedSubscription(value);
    setUnutilizedSubscription(totalActiveSubscription - value);
  }

  useEffect(() => {
    getUserSubscriptionSummaryData(strategyId);
  }, []);

  //set initial values when subscription summary data is received
  useEffect(() => {
    setTotalUtilizedSubscription(
      strategyUtilizationData?.["Total Utilized Subscription"]
    );
  }, [strategyUtilizationData]);
  useEffect(() => {
    setTotalActiveSubscription(
      strategyCapacityData?.["Total Active Subscription"]
    );
  }, [strategyCapacityData]);

  async function handleSubmit() {
    setErrorMsgFromCall(null);
    setSuccessMsgFromCall(null);
    const formData = {
      userid: userId,
      strategyid: strategyId,
      additionallots:
        totalUtilizedSubscription > 0
          ? totalUtilizedSubscription / base_minInvestment - 1
          : 0,
      additionalsubscription:
        totalUtilizedSubscription > 0
          ? totalUtilizedSubscription / base_minInvestment - 1
          : 0,
      basesubscription: totalUtilizedSubscription > 0 ? base_minInvestment : 0,
      baselots: totalUtilizedSubscription > 0 ? 1 : 0,
    };
    // console.log(formData);
    const { error, successMsg } = await updateDeploymentValue(formData);
    if (error) setErrorMsgFromCall(error);
    if (successMsg) setSuccessMsgFromCall(successMsg);
  }
  function getMsgComponent() {
    if (errorMsgFromCall) return <ErrorMsg message={errorMsgFromCall} />;
    if (successMsgFromCall) return <SuccessMsg message={successMsgFromCall} />;
    if (!errorMsgFromCall && !successMsgFromCall) return null;
  }

  return (
    <div className={classes.exposurecontainer}>
      <Grid container direction="column" className={classes.boxStyle}>
        {/* -----------------Column 1-------------------- */}
        <Grid
          container
          direction="column"
          style={{ marginRight: "8px" }}
          spacing={1}
        >
          <Grid item container direction="row" justify="space-between">
            <Typography variant="body2">Total Active Subscription</Typography>
            <Typography variant="body2">
              {numberWithCommas(totalActiveSubscription)}
            </Typography>
          </Grid>
          <Grid
            item
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            style={{ marginTop: "15px", marginBottom: "5px" }}
          >
            <Typography variant="body2">Total Utilized Subscription</Typography>

            <Grid item style={{ marginRight: "15px" }}>
              <PrettoSlider
                className={classes.sliderRoot}
                getAriaValueText={valuetext}
                step={base_minInvestment}
                // marks={marks}
                valueLabelDisplay="on"
                defaultValue={0}
                min={0}
                max={totalActiveSubscription}
              />
            </Grid>
          </Grid>
          <Grid item container direction="row" justify="space-between">
            <Typography variant="body2">
              Total Un-utilized Subscription
            </Typography>
            <Typography variant="body2">
              {numberWithCommas(unutilizedSubscription) || 0}
            </Typography>
          </Grid>
        </Grid>
        {/* -------------Column 2------------------------ */}
      </Grid>
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
          Update
        </Button>
      </Grid>
      {getMsgComponent()}
    </div>
  );
}
