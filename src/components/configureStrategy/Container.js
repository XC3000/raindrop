import { Grid } from "@material-ui/core";
import { List, ListItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import BrokerManagement from "./BrokerManagement";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import UpdateDeploymentExposure from "./UpdateDeploymentExposure";
import DeploymentStatus from "./DeploymentStatus";
import ConfigurationLog from "./ConfigurationLog";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "0 3px",
    overflowX: "hidden",
    minWidth: "700px",
    maxWidth: "700px",
    minHeight: "650px",
    maxHeight: "650px",
    borderRadius: "13px",
    backgroundColor: theme.palette.background.paper,
  },
  masterContainer: {
    padding: "10px",
    margin: "5px auto",
    minWidth: "630px",
    maxWidth: "630px",
  },
  tabStyle: {
    margin: "5px 0 10px 0",
    backgroundColor: theme.palette.background.BG,
    display: "flex",
    flexDirection: "row",
    borderRadius: "12px 12px 12px 12px",
    padding: "5px",
  },
}));

const tabTitle = [
  "Broker Mapping",
  "Deployment Exposure",
  "Deployment Status",
  "Configuration Log",
];

export default function Container({ setaddBrokerActive, handleClose }) {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState("Broker Mapping");
  const darkTheme = useSelector((state) => state.changeThemeReducer.darkTheme);
  const handleActiveTabChange = (item) => {
    setActiveTab(item);
  };
  const userStrategyDetails = useSelector(
    (state) => state?.selectedPortfolioCard
  );
  function getTabComponent() {
    if (activeTab === "Broker Mapping")
      return <BrokerManagement setaddBrokerActive={setaddBrokerActive} />;
    if (activeTab === "Deployment Exposure")
      return <UpdateDeploymentExposure />;
    if (activeTab === "Deployment Status")
      return <DeploymentStatus handleClose={handleClose} />;
    if (activeTab === "Configuration Log") return <ConfigurationLog />;
  }
  return (
    <div className={classes.container}>
      {/* tabs */}
      <div className={classes.masterContainer}>
        <Grid container direction="row" justify="space-between">
          <Grid item>
            <Typography varaint="body1" style={{ fontWeight: "700" }}>
              Configure {userStrategyDetails?.["Strategy Name"]}
            </Typography>
          </Grid>
          <Grid item>
            <HighlightOffIcon
              style={{ cursor: "pointer" }}
              onClick={handleClose}
            />
          </Grid>
        </Grid>
        <List className={classes.tabStyle}>
          {tabTitle.map((item) => (
            <ListItem
              key={item}
              style={{
                whiteSpace: "nowrap",
                cursor: "pointer",
                // border: "1px solid red",
                background: activeTab === item ? "#4684F0" : "inherit",
                backgroundImage:
                  activeTab === item
                    ? "linear-gradient(to bottom right,rgba(70, 132, 240, 1), rgba(0, 228, 255, 1))"
                    : null,
                borderRadius: "13px",
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
    </div>
  );
}
