/** @format */
import { Button, ListItem, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import InfoIcon from "@material-ui/icons/Info";
import { useDispatch, useSelector } from "react-redux";
import SubscribeStrategy from "../subscribeStrategy/SubscribeStrategy";
import ConfigureStrategy from "../configureStrategy/ConfigureStrategy";
import PortfolioOverviewBroker from "./PortfolioOverviewBroker";
import PopOver from "../PopOver/PopOver";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { PopOverdata } from "../../utilityFunctions/popOverData";
import PopOverContent from "../PopOverContent/PopOverContent";
import upArrow from "./upArrow.png";
import redArrow from "./redArrow.png";
import { Grid } from "@material-ui/core";
import { getStringToNumber } from "../../utilityFunctions/getStringToNumber";
import live from "./live.png";
import { numberWithCommas } from "../../utilityFunctions/numberWithCommas";
import getUserSubscriptionSummary from "../../apicalls/getUserSubscriptionSummary";
import { number } from "yup";

const useStyles = makeStyles((theme) => ({
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    position: "relative",
    marginLeft: "-10px",
  },
  infoTitle: {
    marginBottom: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoSubTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "15px",
  },
  infoDescription: {
    marginBottom: "15px",
    display: "-webkit-box",
    webkitLineClamp: "2",
  },

  infoSummary: {
    display: "flex",
    flexDirection: "row",
    alignItem: "flex-end",
  },
  infoIcon: {
    marginLeft: "5px",
  },
  infoSummaryBody: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "-5px",
    padding: "5px 0",
  },

  infoSubscrieButton: {
    position: "absolute",
    bottom: "0px",
    width: "98%",
  },
}));
function InfoElement({ type, setCardType }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(
    (state) => state?.changeThemeReducer?.darkTheme
  );
  const [open, setOpen] = useState(false); // for dialog box
  const [activeSubscriptionData, setactiveSubscriptionData] = useState("");
  const [totalUtilizedSubscription, setTotalUtilizedSubscription] =
    useState("");
  const [anchorEl, setAnchorEl] = React.useState(null); // for popOver

  const [netProfitLoss, setNetProfitLoss] = React.useState(null);
  // console.log(netProfitLoss);
  const data = useSelector((state) => {
    if (type === "portfolioOverviewCard")
      return state?.appData?.portfolioOverview;
    if (type === "portfolioWatch") return state?.selectedPortfolioCard;
    if (type === "strategyLibrary") return state?.currentStrategyCard;
  });
  const livepnlData = useSelector((state) => state?.livepnlChange);
  // console.log(livepnlData?.dailypnl);
  const handleDialogboxAction = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };
  /* to get button element based on type of  */
  function getButtonElement() {
    if (type === "portfolioOverviewCard") {
      return null;
    } else {
      return (
        <div className={classes.infoSubscrieButton}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleDialogboxAction}
          >
            {type === "strategyLibrary" ? "Subscribe" : "Configure"}
          </Button>
          {type === "strategyLibrary" && open ? (
            <SubscribeStrategy open={open} handleClose={handleClose} />
          ) : (
            <ConfigureStrategy open={open} handleClose={handleClose} />
          )}
        </div>
      );
    }
  }
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    // console.log("close....");
    setAnchorEl(null);
  };
  useEffect(() => {
    if (type === "portfolioOverviewCard" && livepnlData) {
      // console.log(data?.["Realized Profit/Loss"]);
      setNetProfitLoss(
        (
          parseFloat(
            data?.["Realized Profit/Loss"] &&
              getStringToNumber(data?.["Realized Profit/Loss"])
          ) + livepnlData?.newunrealizedpnl
        ).toFixed(2)
      );
    }
  }, [livepnlData]);
  //get Active Subscription and Total Utilized value
  //do not remove this useEffect, if done values will not change.
  useEffect(() => {
    async function getData() {
      if (type === "portfolioOverviewCard") {
        const { error, capacity, utilization } =
          await getUserSubscriptionSummary("all");
        setactiveSubscriptionData(capacity?.["Total Active Subscription"]);
        setTotalUtilizedSubscription(
          utilization?.["Total Utilized Subscription"]
        );
      }
      if (type === "portfolioWatch") {
        const { error, capacity, utilization } =
          await getUserSubscriptionSummary(data?.["Strategy ID"]);
        setactiveSubscriptionData(capacity?.["Total Active Subscription"]);
        setTotalUtilizedSubscription(
          utilization?.["Total Utilized Subscription"]
        );
      }
    }
    getData();
  }, [type, data]);
  // console.log(type);
  return (
    <div className={classes.infoContainer}>
      <div className={classes.infoTitle}>
        <div>
          {" "}
          <Typography variant="body1" style={{ fontWeight: "700" }}>
            {type === "portfolioOverviewCard"
              ? "Portfolio Overview Card"
              : data?.["Strategy Name"]}
          </Typography>
        </div>
        {type !== "portfolioOverviewCard" && type !== "strategyLibrary" && (
          <div>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              style={{ textTransform: "none" }}
            >
              <ArrowBackIcon style={{ fontSize: "14px", marginRight: "2px" }} />{" "}
              <Typography
                variant="body2"
                color="primary"
                onClick={() => setCardType("portfolioOverviewCard")}
              >
                Portfolio Overview
              </Typography>
            </Button>
          </div>
        )}
      </div>
      <div className={classes.infoSubTitle}>
        <span className={classes.infoCol1}>
          {" "}
          {type === "portfolioOverviewCard" || type === "portfolioWatch" ? (
            <>
              <Grid container direction="column">
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  {livepnlData?.dailypnl && (
                    <img
                      src={
                        numberWithCommas(
                          livepnlData?.dailypnl.toFixed(2)
                        ).includes("-")
                          ? redArrow
                          : upArrow
                      }
                      alt="sign"
                      height="20px"
                      width="20px"
                    />
                  )}
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      marginRight: "5px",
                      color: numberWithCommas(
                        livepnlData?.dailypnl?.toFixed(2)
                      )?.includes("-")
                        ? "rgb(224 3 3)"
                        : "rgb(3 224 24)",
                    }}
                  >
                    {`INR ${
                      livepnlData?.dailypnl !== null
                        ? numberWithCommas(livepnlData?.dailypnl.toFixed(2))
                        : "--"
                    }`}{" "}
                  </Typography>{" "}
                </Grid>
                <Grid item>
                  <Typography
                    style={{
                      marginLeft: "20px",
                      fontSize: "10px",
                      fontWeight: "700",
                      marginTop: "2px",
                    }}
                  >
                    Daily Profit/Loss
                  </Typography>
                </Grid>
              </Grid>{" "}
            </>
          ) : (
            "NA"
          )}
        </span>
        <span className={classes.infoCol2}>
          {" "}
          <img src={live} alt="live" />{" "}
        </span>
      </div>
      <div className={classes.infoDescription}>
        <Typography variant="body2">{data?.["Description"]}</Typography>
      </div>
      {/* -----------------------------------------------Summary---------------------------------------- */}
      <div className={classes.summary}>
        <div className={classes.infoSummary}>
          <Typography variant="body1" color="primary">
            Summary
          </Typography>

          <span className={classes.infoIcon}>
            <InfoIcon
              color="primary"
              fontSize="small"
              onClick={handlePopoverOpen}
              id="summary"
            />
          </span>
          <PopOver
            children={
              <PopOverContent
                handlePopoverClose={handlePopoverClose}
                obj={
                  type === "strategyLibrary"
                    ? PopOverdata["Market Place Summary"]
                    : PopOverdata["Portfolio Watch Summary"]
                }
              />
            }
            anchorEl={anchorEl}
            handlePopoverClose={handlePopoverClose}
            id="summary"
          />
        </div>
        {type === "strategyLibrary" ? (
          <>
            <ListItem className={classes.infoSummaryBody}>
              <Typography variant="body2">Minimum Investment Amt.</Typography>
              <Typography variant="body2">
                {data?.["Min. Investment"]}
              </Typography>
            </ListItem>
            <ListItem className={classes.infoSummaryBody}>
              <Typography variant="body2">
                Additional Investment Amt.
              </Typography>
              <Typography variant="body2">
                {data?.["Additonal Investment"]}
              </Typography>
            </ListItem>
            <ListItem className={classes.infoSummaryBody}>
              <Typography variant="body2">Risk Categorisation</Typography>
              <Typography variant="body2">{data?.["Risk Catagory"]}</Typography>
            </ListItem>
            <ListItem className={classes.infoSummaryBody}>
              <Typography variant="body2">Minimum Margin Required</Typography>
              <Typography variant="body2">{data?.["Min. Margin"]}</Typography>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem className={classes.infoSummaryBody}>
              <Typography variant="body2">Total Active Subscription</Typography>
              <Typography variant="body2">
                {numberWithCommas(activeSubscriptionData)}
              </Typography>
            </ListItem>
            <ListItem className={classes.infoSummaryBody}>
              <Typography variant="body2">
                Total Utilized Subscription
              </Typography>
              <Typography variant="body2">
                {numberWithCommas(totalUtilizedSubscription)}
              </Typography>
            </ListItem>
            <ListItem className={classes.infoSummaryBody}>
              <Typography variant="body2">Net Profit/Loss</Typography>
              <Typography variant="body2">
                {type === "portfolioOverviewCard"
                  ? netProfitLoss !== null && !isNaN(netProfitLoss)
                    ? numberWithCommas(livepnlData?.totalpnl?.toFixed(2))
                    : "--"
                  : numberWithCommas(data?.["Net Profit/Loss"])}
              </Typography>
            </ListItem>
          </>
        )}
      </div>

      {/* broker related data for portfolioOverView Card */}
      {type !== "strategyLibrary" && <PortfolioOverviewBroker />}
      {/* to get button element based on type of  */}
      {getButtonElement()}
    </div>
  );
}

export default InfoElement;
