/** @format */

import { List, ListItem, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ChartTabComponent from "../tabComponents/chart/ChartTabComponent";
import Overview from "../tabComponents/Overview";
import Statistic from "../tabComponents/statictic/Statistic";
import RecentTrades from "../tabComponents/recentTrades/RecentTrades";
import "./jumbotronRight.css";
import OpenPositon from "../tabComponents/OpenPosition/OpenPositon";

const marketPlaceTabs = ["CHARTS", "OVERVIEW", "STATISTICS"];
const portfolioWatchTabs = [
  "CHARTS",
  "OVERVIEW",
  "STATISTICS",
  "RECENT TRADES",
  "OPEN POSITIONS",
];

const useStyles = makeStyles((theme) => ({
  jumbotronRight_tabItems: {
    backgroundColor: theme.palette.background.BG,
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
    borderRadius: " 0 12px 12px 0",
    marginBottom: "3px",
    width: "100%",
    padding: "5px",
  },
}));

function JumbotronRight({ stratId, type }) {
  const tabTitle =
    type === "StrategyCard" ? marketPlaceTabs : portfolioWatchTabs;
  const [activeTab, setActiveTab] = useState("CHARTS");
  const classes = useStyles();
  const darkTheme = useSelector((state) => state.changeThemeReducer.darkTheme);

  const handleActiveTabChange = (item) => {
    setActiveTab(item);
  };

  function getTabComponent() {
    if (activeTab === "OVERVIEW")
      return <Overview stratId={stratId} cardType={type} />;
    if (activeTab === "CHARTS")
      return <ChartTabComponent stratId={stratId} cardType={type} />;
    if (activeTab === "STATISTICS")
      return <Statistic stratId={stratId} type={type} />;
    if (activeTab === "RECENT TRADES") return <RecentTrades type={type} />;
    if (activeTab === "OPEN POSITIONS") return <OpenPositon type={type} />;
  }

  return (
    <div className="jumbotronRight_container">
      {/* tabs */}
      <List className={classes.jumbotronRight_tabItems}>
        {tabTitle.map((item) => (
          <ListItem
            key={item}
            style={{
              whiteSpace: "nowrap",
              cursor: "pointer",
              backgroundImage:
                activeTab === item
                  ? "linear-gradient(to bottom right,rgba(70, 132, 240, 1), rgba(0, 228, 255, 1))"
                  : null,
              borderRadius: "13px",
              width: "200px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
            onClick={() => handleActiveTabChange(item)}
          >
            <Typography
              variant="body2"
              style={{
                fontWeight: "600",
                color: activeTab === item ? "#000" : "inherit",
              }}
            >
              {item}
            </Typography>
          </ListItem>
        ))}
      </List>

      {/* content */}
      {/* a function to change the componnt based on active tab  */}
      {getTabComponent()}
    </div>
  );
}

export default JumbotronRight;
