/** @format */

import {
  Button,
  Checkbox,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import upi_img from "./upi.svg";
import qr_code from "./qr_code.svg";
import axios from "axios";
// import { subscribeToStrategy } from "../../actions/action.subscribeToStrategy";
import { subscribeTostrategy } from "../../apicalls/subscribeTostrategy";
import ErrorMsg from "../screenMessages/ErrorMsg";
import SuccessMsg from "../screenMessages/SuccessMsg";
import { numberWithCommas } from "../../utilityFunctions/numberWithCommas";

const useStyles = makeStyles((theme) => ({
  paymentContainer: {
    minWidth: "600px",
    minHeight: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 20px 20px 30px",
    backgroundColor: theme.palette.background.paper,
  },
  summaryContainer: {
    width: "90%",
    height: "auto",
    borderRadius: "13px",
    backgroundColor: theme.palette.background.BG,
    border: `1px solid ${theme.palette.background.stroke}`,
    padding: "10px 20px",
    marginRight: "10px",
    marginBottom: "10px",
    "& > div": {
      marginBottom: "10px",
    },
  },
  scanCodeContainer: {
    width: "90%",
    padding: "10px",
    height: "auto",
    borderRadius: "13px",
    backgroundColor: theme.palette.background.BG,
    border: `1px solid ${theme.palette.background.stroke}`,
  },
  upiImg: {
    height: "50px",
    width: "50px",
    display: "inline-block",
    marginLeft: "10px",
  },
  upiInputs: {
    width: "110%",
    height: "30px",
    padding: "0px 5px",
    boxSizing: "border-box",
    borderRadius: "5px",
    fontSize: "12px",
    backgroundColor: theme.palette.background.BG,
    border: `2px solid ${theme.palette.background.stroke}`,
    color: theme.palette.text.primary,
    marginBottom: "10px",
    "&:focus": {
      outline: "none",
      border: "1px solid #4684f0",
    },
  },
}));

function getStringToNumber(str) {
  let num = parseInt(str.replaceAll(",", ""));
  return num;
}

function loadScript() {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    // document.body.appendChild(script);
    document.head.appendChild(script);
  });
}

export default function MakePayment({
  setPageType,
  handleClose,
  subscriptionData,
  setSubscriptionData,
  baseSubscriptionFees,
  additionalSubscriptionFees,
  taxes,
}) {
  const classes = useStyles();
  const userDetails = useSelector((state) => state?.appData?.userKYC);
  const strategyDetails = useSelector((state) => state?.currentStrategyCard);
  const [errorMsgFromCall, setErrorMsgFromCall] = useState(null);
  const [successMsgFromCall, setSuccessMsgFromCall] = useState(null);
  const [paymentReference, setPaymentReference] = useState(null);

  let totalPaymentAmount =
    baseSubscriptionFees + additionalSubscriptionFees + taxes;
  let totalSubscriptionFees = numberWithCommas(
    baseSubscriptionFees + additionalSubscriptionFees
  );
  let strategyMaxInvestment = getStringToNumber(
    strategyDetails?.["Max. Investment"]
  );
  let additionalSubscriptionValue = getStringToNumber(
    strategyDetails?.["Additonal Investment"]
  );

  function handleInputChange(e) {
    setSubscriptionData({
      ...subscriptionData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(paymentref) {
    setErrorMsgFromCall(null);
    setSuccessMsgFromCall(null);
    let submitData = {
      ...subscriptionData,
      paymentamount: totalPaymentAmount,
      paymentmode: "Online Gateway",
      paymentreference: paymentref,
    };
    let totalValue =
      submitData.additionallots * additionalSubscriptionValue +
      submitData.basesubscription;
    if (totalValue <= strategyMaxInvestment) {
      // dispatch(subscribeToStrategy(submitData));
      // console.log(submitData);
      const { error, successMsg } = await subscribeTostrategy(submitData);
      if (error) setErrorMsgFromCall(error);
      if (successMsg) setSuccessMsgFromCall(successMsg);
      setTimeout(() => handleClose(), 6000);
    } else {
      alert('"Total Investment value exceeds the limit"');
    }
  }
  function getMsgComponent() {
    if (errorMsgFromCall) return <ErrorMsg message={errorMsgFromCall} />;
    if (successMsgFromCall) return <SuccessMsg message={successMsgFromCall} />;
    if (!errorMsgFromCall && !successMsgFromCall) return null;
  }

  console.log("paymentReference...", paymentReference);
  async function displayRazorpay(e) {
    const res = await loadScript();
    console.log(res);
    if (!res) {
      alert("Razorpay SDK failed to load...");
    }
    const newQuantPay = {
      key: "rzp_live_CFDShpkrgvuvxb", // last key used not sure if still valid
      amount: totalPaymentAmount * 100,
      name: "RAIN TRADER",
      description: "Subscription Payment",
      image: "https://home.rain.trade/static/media/logoBetaLight.0399e496.svg",
      handler: async function (response) {
        console.log("response ", JSON.stringify(response));
        setPaymentReference(response.razorpay_payment_id);
        const postData = {
          razorpay_payment_id: response.razorpay_payment_id,
          description: `${userDetails?.name}'s payment`,
        };
        try {
          const result = await axios.post(
            "https://raintech.ai/Raindrop/test.php",
            postData
          );
          alert(result.data.msg);
        } catch (error) {
          console.log("error...", error);
        }
        handleSubmit(response.razorpay_payment_id);
        quantPay.close();
      },
      prefill: {
        name: `${userDetails?.name} ${userDetails?.surname}`,
        email: userDetails?.email,
        contact: userDetails?.mobile,
      },
      theme: {
        color: "#5a00ff",
      },
    };
    let quantPay = new window.Razorpay(newQuantPay);
    quantPay.open();
  }
  return (
    <>
      <div className={classes.paymentContainer} id="paymentContainer">
        <Grid container direction="row" justify="space-between">
          <Grid item>
            <ArrowBackIcon onClick={() => setPageType("agreement")} />
          </Grid>
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
        </Grid>{" "}
        {/* Summary Box */}
        <Grid
          container
          direction="column"
          className={classes.summaryContainer}
          // spacing={2}
        >
          <Grid item container direction="row" justify="space-between">
            <Typography variant="body1">Total Subscription Fees</Typography>
            <Typography variant="body1">{totalSubscriptionFees}</Typography>
          </Grid>
          <Grid item container direction="row" justify="space-between">
            <Typography variant="body1">Taxes (GST)</Typography>
            <Typography variant="body1">{numberWithCommas(taxes)}</Typography>
          </Grid>
          <hr style={{ marginBottom: "10px" }} />
          <Grid item container direction="row" justify="space-between">
            <Typography variant="body1">Total Amount Payable</Typography>
            <Typography variant="body1">
              {numberWithCommas(totalPaymentAmount)}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          style={{ marginTop: "20px" }}
        >
          <Button
            variant="contained"
            color="secondary"
            style={{ width: "50%" }}
            onClick={() => {
              displayRazorpay();
            }}
          >
            Pay
          </Button>
          {getMsgComponent()}
        </Grid>
      </div>
    </>
  );
}
