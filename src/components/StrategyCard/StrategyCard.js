/** @format */

import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Pause from "./Pause.svg";
import Play from "./Play.svg";
import RectangleGreen from "./RectangleGreen.svg";
import RectangleRed from "./RectangleRed.svg";
import PopOver from "../PopOver/PopOver";
import InfoIcon from "@material-ui/icons/Info";
import { Grid } from "@material-ui/core";
import PopOverContent from "../PopOverContent/PopOverContent";
import { PopOverdata } from "../../utilityFunctions/popOverData";
import { useSelector } from "react-redux";
import { numberWithCommas } from "../../utilityFunctions/numberWithCommas";
// import Vector from "./Vector.svg";

const useStyles = makeStyles((theme) => ({
  strategyCardContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: theme.palette.background.paper,
    minWidth: "400px",
    // maxWidth: "400px",
    height: "160px", //to be changed when footer is to be shown
    borderRadius: "10px",
    padding: "10px 20px",
    boxSizing: "border-box",
    boxShadow: "-1px 0px 7px 0px #4a4a829c",
    margin: "15px 20px",
    "&:hover": {
      border: "2px solid #4684F0",
      marginTop: "-2px",
      marginLeft: "-5px",
      marginRight: "-5px",
      width: "420px",
      height: "180px",
      zIndex: 1,
    },
  },
  StrategyCardTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  StrategyCardBody1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundImage:
      "linear-gradient(to bottom right,rgba(70, 132, 240, 1), rgba(0, 228, 255, 1))",
    marginBottom: "10px",
    fontSize: "14px",
    width: "100%",
    height: "43px",
    borderRadius: "6px",
  },
  StrategyCardBody2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    // border: "1px solid red",
  },
  StrategyCardBody__sub: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  StrategyCardController: {
    display: "flex",
    flexDiection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  StrategyCardControllerElements: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: theme.palette.boxStyle.boxShadow,
    borderRadius: "4px",
    height: "22px",
    width: "22px",
    marginRight: "8px",
  },
}));

function StrategyCard({ data, cardType }) {
  const classes = useStyles();
  const isDarkTheme = useSelector(
    (state) => state?.changeThemeReducer?.darkTheme
  );
  const [anchorEl, setAnchorEl] = React.useState(null); // for popover

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className={classes.strategyCardContainer}
      style={{
        boxShadow: `${
          isDarkTheme
            ? "-1px 0px 7px 0px #b4b4ca9e"
            : "-1px 0px 7px 0px #4a4a829c"
        }`,
      }}
    >
      <div className={classes.StrategyCardTitle}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            {" "}
            <Typography variant="body1" color="primary">
              {data?.["Strategy Name"]}
            </Typography>
          </Grid>
          <Grid item>
            <InfoIcon
              color="primary"
              fontSize="small"
              // onClick={handlePopoverOpen}
              id="cardSummary"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            />
            <PopOver
              children={
                <PopOverContent
                  handlePopoverClose={handlePopoverClose}
                  obj={
                    cardType === "StrategyCard"
                      ? PopOverdata["Market Place Card Summary"]
                      : PopOverdata["Portfolio Watch Card Summary"]
                  }
                />
              }
              anchorEl={anchorEl}
              handlePopoverClose={handlePopoverClose}
              id="cardSummary"
            />
          </Grid>
        </Grid>

        <div className={classes.StrategyCardController}>
          {cardType === "StrategyCard" ? (
            <BookmarkIcon />
          ) : (
            <>
              <div className={classes.StrategyCardControllerElements}>
                <img
                  // currently showing whether stratey is live or pause,
                  // later changed to be an option provided to the user ie to play the startegy or pause it
                  src={data?.["User Status"] === 1 ? Pause : Play}
                  alt="userStatus"
                  style={{ height: "12px", width: "12px", cursor: "pointer" }}
                  id="userStatus"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                />
                <PopOver
                  text="User Status"
                  anchorEl={anchorEl}
                  handlePopoverClose={handlePopoverClose}
                  id="userStatus"
                />
              </div>
              <div className={classes.StrategyCardControllerElements}>
                <img
                  src={
                    data?.["Live Status"] === 1 ? RectangleGreen : RectangleRed
                  }
                  alt="pause"
                  style={{ height: "12px", width: "12px" }}
                  id="liveStatus"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                />
                <PopOver
                  text="Live Status"
                  anchorEl={anchorEl}
                  handlePopoverClose={handlePopoverClose}
                  id="liveStatus"
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className={classes.StrategyCardBody1}>
        <Typography variant="body1" style={{ color: "#000" }}>
          {data?.["Style"]}
        </Typography>

        <Typography variant="body1" style={{ color: "#000" }}>
          {data?.["approach"]}
        </Typography>
        <Typography variant="body1" style={{ color: "#000" }}>
          {data?.["Instrument Focus"]}
        </Typography>
      </div>
      <div className={classes.StrategyCardBody2}>
        {cardType === "StrategyCard" ? (
          <>
            <div className={classes.StrategyCardBody__sub}>
              <Typography variant="body2" style={{ whiteSpace: "pre" }}>
                {`Min. Investment`}
              </Typography>
              <Typography variant="body2">
                {data?.["Min. Investment"]}
              </Typography>
            </div>
            <div className={classes.StrategyCardBody__sub}>
              <Typography
                variant="body2"
                style={{ whiteSpace: "pre" }}
              >{`Producer Name`}</Typography>
              <Typography variant="body2">{data?.["Producer Name"]}</Typography>
            </div>
            <div className={classes.StrategyCardBody__sub}>
              <Typography
                variant="body2"
                style={{ whiteSpace: "pre" }}
              >{`Risk Profile`}</Typography>
              <Typography variant="body2">{data?.["Risk Catagory"]}</Typography>
            </div>{" "}
          </>
        ) : (
          <>
            <div className={classes.StrategyCardBody__sub}>
              <Typography variant="body2" style={{ whiteSpace: "pre" }}>
                Subscribed Value
              </Typography>
              <Typography variant="body2">
                {data?.["Total Investment"] === 0
                  ? "--"
                  : numberWithCommas(data?.["Total Investment"])}
              </Typography>
            </div>
            <div className={classes.StrategyCardBody__sub}>
              <Typography variant="body2" style={{ whiteSpace: "pre" }}>
                Utilized Value
              </Typography>
              <Typography variant="body2">
                {data?.["Total Utilized Subscription"] === 0
                  ? "--"
                  : numberWithCommas(data?.["Total Utilized Subscription"])}
              </Typography>
            </div>
            <div className={classes.StrategyCardBody__sub}>
              <Typography variant="body2" style={{ whiteSpace: "pre" }}>
                Broker Name
              </Typography>
              <Typography variant="body2">{data?.["Broker Name"]}</Typography>
            </div>{" "}
          </>
        )}
      </div>
      {/* <div className={classes.footer}>
				{cardType === "StrategyCard" ? (
					<>
						<Typography variant="body2" color="primary">
							{data?.["1Yr Return"]}
						</Typography>
						<Typography variant="body2">{data?.["Daily (+/-)%"]}</Typography>
					</>
				) : null}
			</div> */}
    </div>
  );
}

export default StrategyCard;
