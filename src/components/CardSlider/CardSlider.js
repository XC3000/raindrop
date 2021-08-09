/** @format */

import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useRef } from "react";
import Slider from "react-slick";
import StrategyCard from "../StrategyCard/StrategyCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import { changeSelectedStrategyCard } from "../../actions/action.changeCurrentStrategyCard";
import { changeSelectedPortfolioCard } from "../../actions/action.changeSelectedPortfolioCard";
import PortfolioOverviewCard from "../PortfolioOverviewCard/PortfolioOverviewCard";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cardSliderContainer: {
    height: "180px",
    marginLeft: "40px",
    marginRight: "40px",
    paddingLeft: "20px",
    // border: "1px solid red",
  },
  threeSliderContainer: {
    height: "220px",
    marginLeft: "10px",
    marginRight: "10px",
    paddingLeft: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // border: "1px solid red",
  },
  sliderContainer: {
    marginTop: "5px",
    minWidth: "100%",
    maxWidth: "100%",
    height: "220px",
    display: "flex",
    flexDirection: "row",
  },
  scrolldiv: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    overflowX: "auto",
    // minWidth: "90%",
    margin: "5px",
    paddingTop: "10px",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "25px",
  },
  arrowButtons: {
    height: "50px",
    position: "relative",
    borderRadius: "50%",
    zIndex: 1,
    background: theme.palette.background.paper,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.background.paper,
      boxShadow: "none",
    },
  },
}));

function CardSlider({ cardType, setCardType }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const scrollref = useRef();

  const cardData = useSelector((state) => {
    if (cardType === "portfolioWatch" || cardType === "portfolioOverviewCard")
      return state?.appData?.userSubscribedStrategies;
    if (cardType === "StrategyCard") return state?.appData?.strategyLibrary;
  });

  const getComponent = (item) => {
    if (cardType === "StrategyCard") {
      return <StrategyCard data={item} cardType="StrategyCard" />;
    }
    if (cardType === "portfolioWatch" || cardType === "portfolioOverviewCard") {
      let data = null;
      // console.log("card...", item);
      data = {
        "Strategy Name": item["Strategy Name"],
        Style: item["Style"],
        approach: item["approach"],
        "Instrument Focus": item["Instrument Focus"],
        "User Status": item["User Status"],
        "Admin Status": item["Admin Status"],
        "Live Status": item["Deployment Status"],
        "Total Investment": item["Total Subscription"], //Subscribed value
        "Total Utilized Subscription": item["Total Utilized Subscription"],
        "Cm Return": item["1Yr Return"],
        "Daily Return": item["Daily (+/-)%"],
        "Broker Name": item["Broker Name"],
      };
      return <StrategyCard data={data} cardType="portfolioWatch" />;
    }
  };

  const handleClick = (index) => {
    const result = cardData[index];
    if (cardType === "StrategyCard")
      dispatch(changeSelectedStrategyCard(result));
    if (cardType === "portfolioWatch" || cardType === "portfolioOverviewCard") {
      setCardType && setCardType("portfolioWatch"); //changing cardType
      dispatch(changeSelectedPortfolioCard(result));
    }
  };
  const handleLeftClick = (e) => {
    scrollref.current.scrollLeft -= 300;
  };
  const handleRightClick = (e) => {
    scrollref.current.scrollLeft += 300;
  };
  // if number of cards are less than 3, Slider will not be used
  if (cardData?.length <= 3)
    return (
      <div className={classes.threeSliderContainer}>
        {cardData?.map((item, index) => (
          <div key={index} onClick={() => handleClick(index)}>
            {" "}
            {getComponent(item)}
          </div>
        ))}
      </div>
    );

  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={2}
        style={{
          marginTop: "-20px",
          marginBottom: "-10px",
          paddingLeft: "10px",
        }}
      >
        <Grid item>
          <Typography variant="body1" style={{ fontWeight: "700" }}>
            {cardType === "StrategyCard"
              ? "Marketplace: Explore Trading Algorithms"
              : "My Subscribed Strategies"}
          </Typography>
        </Grid>
        <Grid item>
          <TextField label="Filter" variant="outlined" size="small" />
        </Grid>
      </Grid>

      <div className={classes.sliderContainer}>
        {/* Button left */}
        <div className={classes.buttonContainer}>
          {" "}
          <Button
            className={classes.arrowButtons}
            style={{ left: "-4px" }}
            onClick={handleLeftClick}
          >
            <ArrowBackIosIcon fontSize="large" color="primary" />
          </Button>
        </div>
        <div className={classes.scrolldiv} ref={scrollref}>
          {cardData?.map((item, index) => (
            <div key={item["Sl"]} onClick={() => handleClick(index)}>
              {getComponent(item)}
            </div>
          ))}
        </div>
        <div className={classes.buttonContainer}>
          <Button
            className={classes.arrowButtons}
            style={{ right: "30px" }}
            onClick={handleRightClick}
          >
            <ArrowForwardIosIcon color="primary" fontSize="large" />
          </Button>
        </div>
        {/* Button Right */}
      </div>
    </>
  );
}

export default CardSlider;
