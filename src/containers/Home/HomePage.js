/** @format */

import { Button } from "@material-ui/core";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Mic from "./Mic.svg";
import BlogIcon from "./BlogIcon.svg";
import ShowcaseCard from "./ShowcaseCard";
import PortfolioWatch from "./PortfolioWatch.svg";
import MarketPlace from "./MarketPlace.svg";
import UserGuide from "./UserGuide.svg";
import background from "./background.jpg";
import FeatureUpgrades from "./FeatureUpgradesCard";
import PrAnnouncement from "./PrAnnouncement";

const useStyles = makeStyles((theme) => ({
  homeContainer: {
    // MinHeight: "93.5vh",
    height: "93.5vh",
    maxWidth: "99.9vw",
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    overflow: "hidden",
    boxSizing: "border-box",
  },
  showcase: {
    background:
      "radial-gradient(100% 576.81% at 0% 0%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.025) 100%);",
    height: "280px",
    width: "99%",
    margin: "10px 10px 20px 10px",
    boxShadow: " 5px 10px 25px rgba(0, 0, 0, 0.05)",
    borderRadius: "13px",
    backdropFilter: "blur(25px)",
    border: "1px solid liner-gradient(#000000 10%, #000000 2% )",
    padding: "10px",
  },
  cards: {
    backgroundColor: "#282C31",
    width: "400px",
    height: "250px",
    borderRadius: "10px",
    padding: "10px 20px",
    boxSizing: "border-box",
    margin: "0 10px",
    color: "#CACACA",
  },
  footerCard: {
    backgroundColor: "#282C31",
    width: "200px",
    height: "80px",
    borderRadius: "10px",
    padding: "10px 20px",
    boxSizing: "border-box",
    margin: "0 10px",
    color: "#CACACA",
  },
}));

export default function HomePage() {
  const classes = useStyles();
  document.title = "RAIN-Home";
  return (
    <Grid container direction="column" className={classes.homeContainer}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ marginTop: "10px" }}
      >
        <Typography
          variant="h6"
          style={{ fontWeight: "600", color: "#0f2b5a" }}
        >
          Welcome to your home for automated trading
        </Typography>
      </Grid>
      {/* --------------showcase----------------- */}
      <Grid
        container
        direction="row"
        justify="space-between"
        className={classes.showcase}
      >
        <ShowcaseCard
          link="/dashboard/portfolio-watch"
          title="PortfolioWatch"
          img={PortfolioWatch}
          buttonText="PORTFOLIO WATCH"
          subImageText="Let’s review your investments."
        />
        <ShowcaseCard
          link="/dashboard/market-place"
          title="MarketPlace"
          img={MarketPlace}
          buttonText="MARKETPLACE"
          subImageText="Ready to explore new strategies?"
        />
        <ShowcaseCard
          link="/dashboard/support"
          title="User Guide"
          img={UserGuide}
          buttonText="USER GUIDE"
          subImageText="Get to know RAIN better."
        />
      </Grid>
      {/* -------------------- PR and Features ---------------------------- */}
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        style={{ margin: "0 20px 0 20px", width: "98%" }}
      >
        <Grid
          container
          className={classes.cards}
          style={{
            maxHeight: "250px",
            minHeight: "250px",
            overflow: "auto",
            padding: "0",
          }}
        >
          <Typography
            variant="body1"
            color="primary"
            style={{
              position: "sticky",
              top: "0",
              backgroundColor: "#282C31",
              width: "100%",
              zIndex: 1,
              height: "30px",
              padding: "5px",
            }}
          >
            Feature Upgrades :
          </Typography>{" "}
          <FeatureUpgrades />
        </Grid>
        <Grid
          container
          className={classes.cards}
          style={{
            maxHeight: "250px",
            minHeight: "250px",
            overflow: "auto",
            padding: "0px",
          }}
        >
          <Grid
            item
            style={{
              position: "sticky",
              top: "0",
              backgroundColor: "#282C31",
              width: "100%",
              zIndex: 1,

              height: "30px",
              padding: "5px",
            }}
          >
            <Typography
              variant="body1"
              color="primary"
              // style={{ position: "sticky", top: "0" }}
            >
              PR Announcments :
            </Typography>{" "}
          </Grid>
          <Grid item>
            <PrAnnouncement />
          </Grid>
        </Grid>
        {/* ------------------podcast------------------------- */}
        <Grid container className={classes.cards}>
          <Typography variant="body1" color="primary">
            {" "}
            Rain Media
          </Typography>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <img src={Mic} alt="Mic" />
            </Grid>
            <Grid item>
              <a href="https://rain.trade/podcasts.html" target={"_blank"}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  style={{ width: "250px", marginLeft: "5px" }}
                >
                  PODCAST
                </Button>
              </a>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <img src={BlogIcon} alt="Mic" />
            </Grid>
            <Grid item>
              <a href="https://rain.trade/blogs.html" target={"_blank"}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  style={{ width: "250px", marginLeft: "10px" }}
                >
                  Blog
                </Button>
              </a>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item style={{ marginRight: "10px" }}>
					<iframe
						width="400"
						height="250"
						src="https://www.youtube.com/embed/JnEnYDzgG4w"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					></iframe>
				</Grid> */}
      </Grid>
      {/* --------------------------------------------Footer--------------------------------------- */}
      {/* <Grid
				container
				direction="row"
				justify="space-between"
				alignItems="center"
				style={{ marginTop: "20px" }}
			>
				<Grid container className={classes.footerCard}>
					<Typography variant="body1" color="primary">
						{" "}
						S&P BSE SENSEX
					</Typography>
					<Grid container direct="row" justify="space-between">
						<Typography variant="body1" style={{ color: "#CACACA" }}>
							49,206.47
						</Typography>
						<Typography variant="body1" style={{ color: "#CACACA" }}>
							0.52% Today
						</Typography>
					</Grid>
				</Grid>
				<Grid container className={classes.footerCard}>
					<Typography variant="body1" color="primary">
						{" "}
						NIFTY 50
					</Typography>
					<Grid container direct="row" justify="space-between">
						<Typography variant="body1" style={{ color: "#CACACA" }}>
							49,206.47
						</Typography>
						<Typography variant="body1" style={{ color: "#CACACA" }}>
							0.52% Today
						</Typography>
					</Grid>
				</Grid>
				<Grid container className={classes.footerCard}>
					<Typography variant="body1" color="primary">
						{" "}
						S&P BSE SMALLCAP
					</Typography>
					<Grid container direct="row" justify="space-between">
						<Typography variant="body1" style={{ color: "#CACACA" }}>
							49,206.47
						</Typography>
						<Typography variant="body1" style={{ color: "#CACACA" }}>
							0.52% Today
						</Typography>
					</Grid>
				</Grid>
				<Grid container className={classes.footerCard}>
					<Typography variant="body1" color="primary">
						{" "}
						S&P BSE MIDCAP
					</Typography>
					<Grid container direct="row" justify="space-between">
						<Typography variant="body1" style={{ color: "#CACACA" }}>
							49,206.47
						</Typography>
						<Typography variant="body1" style={{ color: "#CACACA" }}>
							0.52% Today
						</Typography>
					</Grid>
				</Grid>
				<Grid container className={classes.footerCard}>
					<Typography variant="body1" color="primary">
						{" "}
						NIFTY NEXT 50
					</Typography>
					<Grid container direct="row" justify="space-between">
						<Typography variant="body1" style={{ color: "#CACACA" }}>
							49,206.47
						</Typography>
						<Typography variant="body1" style={{ color: "#CACACA" }}>
							0.52% Today
						</Typography>
					</Grid>
				</Grid>
			</Grid> */}
    </Grid>
  );
}
