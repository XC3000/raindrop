/** @format */

import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { numberWithCommas } from "../../utilityFunctions/numberWithCommas";

const useStyles = makeStyles((theme) => ({
  agreementContainer: {
    minWidth: "650px",
    maxWidth: "650px",
    minHeight: "650px",
    maxHeight: "650px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "0px 20px 20px 20px",
    overflow: "auto",
    textAlign: "justify",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "13px",
  },
  masterDiv: {
    marginLeft: "10%",
    marginRight: "10%",
  },
  header: {
    position: "sticky",
    top: "0",
    backgroundColor: theme.palette.background.paper,
    paddingTop: "10px",
  },
}));
export default function Agreement({
  setPageType,
  handleClose,
  subscriptionData,
  baseSubscriptionFees,
  additionalSubscriptionFees,
}) {
  const userInfo = useSelector((state) => state?.authReducer?.user);
  const strategyInfo = useSelector((state) => state?.currentStrategyCard);
  const [inputName, setInputName] = useState("");

  const { name, middlename, surname, addline1, addline2, city, state, taxId } =
    userInfo;
  const { "Strategy Name": strategyName, "Strategy ID": strategyId } =
    strategyInfo;
  const userFullName = `${name ? name : ""} ${middlename ? middlename : ""} ${
    surname ? surname : ""
  }`;
  let totalSubscriptionFees = numberWithCommas(
    baseSubscriptionFees + additionalSubscriptionFees
  );
  const classes = useStyles();
  const handleInput = (e) => {
    setInputName(e.target.value);
  };

  return (
    <div className={classes.agreementContainer}>
      <div className={classes.masterDiv}>
        <Grid
          container
          direction="row"
          justify="space-between"
          className={classes.header}
        >
          <Grid item>
            <ArrowBackIcon onClick={() => setPageType("subscribeInitial")} />
          </Grid>
          <Grid item>
            <Typography variant="body1">Agreement</Typography>
          </Grid>
          <Grid item>
            <HighlightOffIcon
              style={{ cursor: "pointer" }}
              onClick={handleClose}
            />
          </Grid>
        </Grid>{" "}
        <br />
        <Typography variant="body2">
          I, {name} {surname}, hereby subscribe to <b>{strategyName}</b>,
          henceforth referred to as <b>{`'${strategyId}'`}</b>, a fully
          autonomous trading solution that via a pre-parameterized, trading
          logic is capable of deploying and executing trades on my brokerage
          account.
        </Typography>
        <br />
        <Typography variant="body2">
          Functioning of {strategyId} on my brokerage account:
        </Typography>
        <br />
        <Typography variant="body2">
          A. I, hereby further undertake and acknowledge that the control to
          deploy, pause, stop, {strategyId} from executing trades on my
          brokerage account is available to me via the Configuration panel on
          the RAIN Trader platform.
        </Typography>
        <br />
        <Typography variant="body2">
          B. I, hereby further undertake and acknowledge that details provided
          by me from time to time relating to my brokerage account is correct
          and will be updated by me from time to timeM I am aware that I can
          choose and map my brokerage account to run {strategyId} via the
          Configuration panel on the RAIN Trader platform.
        </Typography>
        <br />
        <Typography variant="body2">
          C. I, hereby further undertake and acknowledge that any instruction
          relating to the functioning of {strategyId} will be provided by me via
          the controls on RAIN Trader before 7:30 AM, or as prescribed by RAIN
          Tech from time to time.
        </Typography>
        <br />
        <Typography variant="body2">
          D. I, hereby further undertake and acknowledge that once {strategyId}{" "}
          has commenced trading operations for the day, I will not be able to
          alter the functioning of {strategyId}, until the end of market close
          of that day.
        </Typography>
        <br />
        <Typography variant="body2">
          E. I, hereby further undertake and acknowledge that {strategyId}{" "}
          requires a set of pre-requisites to function as intended on my
          brokerage account(s). These pre-requisite conditions such as, but not
          limited to, adequate margin in my brokerage account, valid API keys
          and or other authentication details. Failure on my part to meet these
          requirements can result in {strategyId} not being able to function
          until such pre-requisite conditions are fulfilled. These pre-requisite
          conditions will further be updated from time to time and made known to
          me by RAIN Tech.
        </Typography>
        <br />
        <Typography variant="body2">
          Furthermore, I hereby consent to the RAIN Tech to undertake via there
          automation and technology solutions the following activities:
        </Typography>
        <br />
        <Typography variant="body2">
          A. Generate API Keys / Tokens and other authentication related
          activities required of me to integrate and run {strategyId} on my
          brokerage account.
        </Typography>
        <br />
        <Typography variant="body2">
          B. Deploy technology enabled, API based, accounting protocols, wherein
          information pertaining to my brokerage accounts and the trading
          activity, accounts, ledger and any other details as required by time
          to time can be accessed, stored and monitored. Such data can be used
          by RainTech towards monitoring the status of the functioning of{" "}
          {strategyId},preparation of reports, tabulations, graphs and for
          research and development purposes.
        </Typography>
        <br />
        <Typography variant="body2">
          C. Deploy Non-API related automation tools that are capable of
          executing trades as intended by {strategyId} for purposes such as, but
          not limited to, redundancy mechanisms, emergency requirements, risk
          mitigation. I Further authorize, ASPM FISCUS PRIVATE LIMITED to
          utilize my login credentials, including API keys/ tokens to facilitate
          the said execution of the fully autonomous trading solution.
        </Typography>
        <br />
        <Typography variant="body2">Commercial Contract:</Typography>
        <br />
        <Typography variant="body2">
          I agree to the technology subscription charges and fees schedule
          proposed by RAIN towards the subscription of {strategyId}.
        </Typography>
        <br />
        <Typography variant="body2">
          1. Total Subscription Fees : {` ${totalSubscriptionFees}`}
        </Typography>
        <Typography variant="body2" style={{ marginTop: "5px" }}>
          2. Variable Fee of 12% of the total net trading profits generated by
          the application of the autonomous trading solution on my brokerage
          account. Where, the total net trading profits would be ascertained
          either at the end of each quarter ending on March, June, September,
          December of each calendar year OR as on the date I either stop or
          reduce the trading units of {strategyId} on my account. Further, for
          the purpose of fee calculation, losses at the end of each period are
          carried forward and returns are calculated on net returns after
          adjusting for losses carried forward.
        </Typography>
        <br />
        <Typography variant="body2">
          I/ We undertake and acknowledge that we are aware that ASPM Fiscus Pvt
          Ltd., is not registered or regulated by the Securities and Exchange
          Board of India or any other regulatory body. The software service
          solution provided by ASPM Fiscus Private Limited namely, RAIN Trader
          and
          {strategyId} are not investment or trading advice, but technological
          tools, solutions and aids, used by me to undertake automated trading
          on my brokerage trading account.
        </Typography>
        <br />
        <Typography variant="body2">
          I/ We accept and acknowledge that {strategyId} is an autonomous
          trading algorithm that has been developed for Non-exclusive, limited
          use by me.
        </Typography>
        <br />
        <Typography variant="body2">
          I/We accept and acknowledge that carrying out transactions with an
          electronic system provided by RainTech has inherent risks due to
          system responses/reaction times and access times that may vary due to
          market conditions, system performance and other factors, and on which
          neither I/We nor RainTech have influence over. I am aware of these
          additional risks in electronic, automated trading before using the
          technology solution provided by RainTech to carry out transactions.
        </Typography>
        <br />
        <Typography variant="body2">
          I/ We accept and acknowledge that automated trading systems such as
          {strategyId} are built by either RainTech an affiliate division /
          company and or Third Party Publishers. I/ We accept and acknowledge
          that these publishers may or may not be registered or regulated.
        </Typography>
        <br />
        <Typography variant="body2">
          I/ We accept and acknowledge that these automated trading systems are
          prone to inherent technology risks, such as processing response time,
          system limitations, performance factors. I/we further accept and
          accept that the production of these automated systems my rely on
          third-party infrastructure the performance of which neither I/we nor
          RainTech have influence over. These limitations are known to me and I
          acknowedge the risks.
        </Typography>
        <br />
        <Typography variant="body2">
          I/ We accept and acknowledge not to hold libale RainTech and or any
          Third Party Publishers for any losses monetary loss or otherwise
          incurred by me from the use of {strategyId} or any ancillary or
          supporting tools, services, solutions provided to me by RainTech or
          Third Party Publishers.
        </Typography>
        <br />
        <Typography variant="body2">
          I/ We accept and acknowledge that the {strategyId} utilizes leverage
          as an integral part of the strategy and I am aware of the risks
          associated with trading on leverage and margin.
        </Typography>
        <br />
        <br />
        <Typography variant="body2">IP Address:</Typography>
        <br />
        <Typography variant="body2">Name: {userFullName}</Typography>
        <br />
        <Typography variant="body2">
          Address:{" "}
          {(addline1 || addline2) && city && state
            ? `${addline1} , ${addline2}, ${city}, ${state}`
            : "Not available"}
        </Typography>
        <br />
        <Typography variant="body2">
          PAN Card: {taxId ? `${taxId}` : "Not available"}
        </Typography>
        <br />
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <input
              type="text"
              values={inputName}
              onChange={handleInput}
            ></input>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              By typing your name here, you agree to the terms stated in this
              subscription agreement.
            </Typography>
          </Grid>
        </Grid>
        <br />
        <Grid container direction="row" justify="center">
          <Button
            variant="contained"
            color="primary"
            disabled={
              inputName !== userFullName.replaceAll("  ", " ") ? true : false
            }
            onClick={() => setPageType("paymentPage")}
          >
            Continue
          </Button>
        </Grid>
      </div>
    </div>
  );
}
