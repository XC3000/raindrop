import { Typography, Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getStrategyDeploymentStatusDetails from "../../apicalls/getStrategyDeploymentStatusDetails";
import pauseStrategy from "../../apicalls/pauseStrategy";
import playStrategy from "../../apicalls/playStrategy";
import getStarategyDeploymentPreview from "../../apicalls/strategyDeploymentPreview";
import ErrorMsg from "../screenMessages/ErrorMsg";
import SuccessMsg from "../screenMessages/SuccessMsg";
import { numberWithCommas } from "../../utilityFunctions/numberWithCommas";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  currentDeploymentStatus: {
    minWidth: "100%",
    maxWidth: "100%",
    borderRadius: "13px",
    backgroundColor: theme.palette.background.BG,
    border: `1px solid ${theme.palette.background.stroke}`,
    padding: "5px",
    marginBottom: "10px",
    marginTop: "10px",
  },
  prompt: {
    minWidth: "100%",
    maxWidth: "100%",
    borderRadius: "13px",
    backgroundColor: theme.palette.background.BG,
    border: `1px solid ${theme.palette.background.stroke}`,
    padding: "5px",
    marginBottom: "10px",
    marginTop: "10px",
  },
}));

export default function DeploymentStatus({ handleClose }) {
  async function getDeploymentStatus(body) {
    const { error, data } = await getStrategyDeploymentStatusDetails(body);
    if (data) setDeploymentStatusDetails(data);
  }
  async function getDeploymentPreview(id) {
    const { previewError, previewMessage } =
      await getStarategyDeploymentPreview(id);
    if (previewError) setPreviewError(previewError);
    if (previewMessage) setPreviewMessage(previewMessage);
  }
  const [errorMsgFromCall, setErrorMsgFromCall] = useState(null);
  const [successMsgFromCall, setSuccessMsgFromCall] = useState(null);
  const classes = useStyles();
  const userID = useSelector((state) => state?.authReducer?.user?.uid);
  const strategyDetails = useSelector((state) => state?.selectedPortfolioCard);
  const [deploymentStatusDetails, setDeploymentStatusDetails] = useState(null);
  const [previewMessage, setPreviewMessage] = useState(null);
  const [previewError, setPreviewError] = useState(null);
  const [promptOpen, setPromptOpen] = useState(false);
  useEffect(() => {
    //call current_deployment_status
    if (strategyDetails?.["Strategy ID"])
      getDeploymentStatus({
        userid: userID,
        masterstrategyid: strategyDetails?.["Strategy ID"],
      });
    getDeploymentPreview(strategyDetails?.["Strategy ID"]);
  }, []);
  //   console.log(deploymentStatusDetails);
  async function handlePauseandPlayStrategy() {
    setErrorMsgFromCall(null);
    setSuccessMsgFromCall(null);
    if (deploymentStatusDetails?.["Deployment Status"] === 0) {
      const { error, successMsg } = await playStrategy({
        userid: userID,
        masterstrategyid: strategyDetails?.["Strategy ID"],
      });
      if (error) setErrorMsgFromCall(error);
      if (successMsg) setSuccessMsgFromCall(successMsg);
      setTimeout(() => {
        handleClose();
      }, 2000);
    } else {
      //pause strategy
      const { error, successMsg } = await pauseStrategy({
        userid: userID,
        masterstrategyid: strategyDetails?.["Strategy ID"],
      });
      if (error) setErrorMsgFromCall(error);
      if (successMsg) setSuccessMsgFromCall(successMsg);
      setTimeout(() => {
        handleClose();
      }, 6000);
    }
  }
  function getMsgComponent() {
    if (errorMsgFromCall) return <ErrorMsg message={errorMsgFromCall} />;
    if (successMsgFromCall) return <SuccessMsg message={successMsgFromCall} />;
    if (!errorMsgFromCall && !successMsgFromCall) return null;
  }

  return (
    <div className={classes.container}>
      <Grid
        container
        direction="column"
        className={classes.currentDeploymentStatus}
        spacing={1}
      >
        <Grid item>
          <Typography variant="body1" color="primary">
            Current Deployment Preview
          </Typography>
        </Grid>
        <Grid item>
          {previewMessage !== null ? (
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="body2">
                  Broker name : {previewMessage?.["Broker Name"]}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Broker ID : {previewMessage?.["Broker ID"]}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Deployment Value :{" "}
                  {numberWithCommas(previewMessage?.["Deployment Value"])}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Last known margin : {previewMessage?.["Last known margin"]}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            previewError
          )}
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        className={classes.currentDeploymentStatus}
        spacing={1}
      >
        <Grid item>
          <Typography variant="body1" color="primary">
            Current Deployment Status for{" "}
            {deploymentStatusDetails?.["Deployment Summary for"]}
          </Typography>
        </Grid>
        {/* --------------------- User Status --------------------- */}
        <Grid item container direction="row" justify="flex-start" spacing={1}>
          <Grid item>
            <Typography variant="body2">User Status : </Typography>
          </Grid>
          <Grid item>
            {deploymentStatusDetails?.["User Status"] === 1
              ? "Active"
              : "Inactive"}
          </Grid>
        </Grid>
        {/* --------------------- Admin Status --------------------- */}
        <Grid item container direction="row" justify="flex-start" spacing={1}>
          <Grid item>
            <Typography variant="body2">Admin Status : </Typography>
          </Grid>
          <Grid item>
            {deploymentStatusDetails?.["Admin Status"] === 1
              ? "Active"
              : "Inactive"}
          </Grid>
        </Grid>
        {/* ---------------------------Deployment status------------------------  */}
        <Grid item container direction="row" justify="flex-start" spacing={1}>
          <Grid item>
            <Typography variant="body2">Deployment status : </Typography>
          </Grid>
          <Grid item>
            {deploymentStatusDetails?.["Deployment Status"] === 0
              ? "Paused"
              : "Live"}
          </Grid>
        </Grid>
        <Grid item>{deploymentStatusDetails?.["Message"]}</Grid>
      </Grid>

      {promptOpen === false ? (
        <Grid
          container
          fullWidth
          // style={{ marginTop: "20px" }}
          direction="row"
          justify="flex-start"
        >
          <Button
            variant="contained"
            color="secondary"
            style={{ width: "30%", textTransform: "inherit" }}
            onClick={() => setPromptOpen(true)}
          >
            {deploymentStatusDetails?.["Deployment Status"] === 0
              ? "Deploy Strategy"
              : "Pause Strategy"}
          </Button>
        </Grid>
      ) : (
        //   {/* -------------------- prompt------------------ */}
        <Grid
          container
          direction="column"
          className={classes.prompt}
          spacing={2}
        >
          <Grid item>
            <Typography variant="body2">
              Are you sure you want to continue?
            </Typography>
          </Grid>
          <Grid item container direction="row" justify="flex-start" spacing={1}>
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                style={{ width: "30%", textTransform: "inherit" }}
                size="small"
                onClick={handlePauseandPlayStrategy}
              >
                OK
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="error"
                style={{
                  width: "30%",
                  textTransform: "inherit",
                  backgroundColor: "red",
                  color: "white",
                }}
                size="small"
                onClick={() => setPromptOpen(false)}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
      {getMsgComponent()}
    </div>
  );
}
