/** @format */

import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  makeStyles,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { BrokerCredential } from "./AddBrokerCredential";
import { API } from "../../axios/instance";
import { useSelector } from "react-redux";
import { APIDetails } from "./AddApiDetails";
import qs from "qs";
import SelectBroker from "./SelectBroker";
import APICredentials from "./APICredentials";
import ErrorMsg from "../screenMessages/ErrorMsg";
import SuccessMsg from "../screenMessages/SuccessMsg";

const useStyles = makeStyles((theme) => ({
  addBrokerContainer: {
    minWidth: "600px",
    maxWidth: "600px",
    minHeight: "500px",
    maxHeight: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "20px",
    backgroundColor: theme.palette.background.paper,
  },
}));

function getSteps() {
  return [
    "Select Broker",
    "Broker Credentials",
    "API Credentials",
    // "API Details",
  ]; // steps names
}

export default function AddBroker({
  setaddBrokerActive,
  setPageType,
  calledfrom,
}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const strategyID = useSelector(
    (state) => state?.currentStrategyCard?.["Strategy ID"]
  );
  const userId = useSelector((state) => state?.authReducer?.user?.uid);
  const steps = getSteps();
  const [supportedBrokersList, setSupportedBrokersList] = useState([]);

  //broker form data
  const [addBrokerFormData, setAddBrokerFormData] = useState({
    userid: userId,
  });
  const [errorMsgFromCall, setErrorMsgFromCall] = useState(null);
  const [successMsgFromCall, setSuccessMsgFromCall] = useState(null);
  // console.log("addBrokerFormData...", addBrokerFormData);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleformChange = (e) => {
    setAddBrokerFormData({
      ...addBrokerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setErrorMsgFromCall(null); //to delete any previous added message
    setSuccessMsgFromCall(null);
    const { brokername, brokerusername, brokerpassword, brokerpin } =
      addBrokerFormData;
    if (!brokername || !brokerusername || !brokerpassword) {
      //show error screen message
      setErrorMsgFromCall(null);
      setErrorMsgFromCall("Please fill all the required inputs");
    } else {
      // filter out the selected broker by user from brokerslist
      const broker = supportedBrokersList.filter(
        (item) => item["Broker Details"]["Broker Name"] === brokername
      )[0]["Broker Details"];
      //to add broker id before submitting data
      const formData = {
        ...addBrokerFormData,
        brokerid: broker["Broker ID"],
      };

      const res = await API.post(
        "Raindrop/raintech.php?apicall=addBroker",
        qs.stringify(formData)
      );
      //if no error then go back to subscribe strategy dialog
      if (res?.data?.E === false) {
        setSuccessMsgFromCall(res?.data?.M);
        setTimeout(() => {
          if (calledfrom === "configureStrategy") {
            setaddBrokerActive(false);
          } else {
            setPageType("subscribeInitial");
          }
        }, 1500);
      } else {
        setErrorMsgFromCall(res?.data?.M);

        setTimeout(() => {
          if (calledfrom === "configureStrategy") {
            setaddBrokerActive(false);
          } else {
            setPageType("subscribeInitial");
          }
        }, 1500);
        // console.log(res?.data?.M);
      }
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <SelectBroker
            handleChange={handleformChange}
            brokersList={supportedBrokersList}
            addBrokerFormData={addBrokerFormData}
          />
        );
      case 1:
        return (
          <BrokerCredential
            handleChange={handleformChange}
            brokersList={supportedBrokersList}
            brokerName={addBrokerFormData?.brokername}
            addBrokerFormData={addBrokerFormData}
          />
        );
      case 2:
        return (
          <APICredentials
            handleChange={handleformChange}
            brokersList={supportedBrokersList}
            brokerName={addBrokerFormData?.brokername}
            addBrokerFormData={addBrokerFormData}
          />
        );
      // case 3:
      //   return <APIDetails handleChange={handleformChange} />;

      default:
        return "Unknown step";
    }
  }

  useEffect(() => {
    async function getBrokersList() {
      const brokerslist = await API.get(
        `Raindrop/raintech.php?apicall=availableBrokers`
      ).then((res) => res.data.D);
      setSupportedBrokersList(brokerslist);
    }
    getBrokersList();
  }, []);

  // function to make Next Button disabled if user has not selected any broker
  const getDisabled = () => {
    if (activeStep === 0 && !addBrokerFormData?.brokername) {
      return true;
    } else {
      return false;
    }
  };
  function getMsgComponent() {
    if (errorMsgFromCall) return <ErrorMsg message={errorMsgFromCall} />;
    if (successMsgFromCall) return <SuccessMsg message={successMsgFromCall} />;
    if (!errorMsgFromCall && !successMsgFromCall) return null;
  }
  // console.log(supportedBrokersList);
  return (
    <div className={classes.addBrokerContainer}>
      {getMsgComponent()}

      <Grid container direction="row" justify="space-between">
        <Grid item>
          <Typography varaint="body1" style={{ fontWeight: "700" }}>
            Add a new broker
          </Typography>
        </Grid>
        <Grid item>
          <HighlightOffIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (calledfrom === "configureStrategy") {
                setaddBrokerActive(false);
              } else {
                setPageType("subscribeInitial");
              } // for configure strategy do not remove this.
            }}
          />
        </Grid>
      </Grid>

      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {getStepContent(index)}

              <Grid
                container
                direction="row"
                justify="flex-start"
                spacing={2}
                style={{ marginTop: "10px" }}
              >
                <Grid item>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="contained"
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={
                      activeStep === steps.length - 1
                        ? handleSubmit
                        : handleNext
                    }
                    disabled={getDisabled()}
                  >
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </Button>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
