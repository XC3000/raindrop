/** @format */

import { Dialog, makeStyles, Modal } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStringToNumber } from "../../utilityFunctions/getStringToNumber";
import AddBroker from "../addBroker/AddBroker";
import Agreement from "./Agreement";
import MakePayment from "./MakePayment";
import SubscribeInitialPage from "./SubscribeInitialPage";

const useStyles = makeStyles((theme) => ({
  SubscribeStrategyContainer: {
    minWidth: "600px",
    maxWidth: "600px",
    minHeight: "600px",
    maxHeight: "600px",
    margin: "65px auto",
  },
}));

//content of the dialog box to be changed on 'pageType' value
// page type - [subscribeInitial, payment page, add broker page, agreement page]
export default function SubscribeStrategy({ open, handleClose }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const strategyDetails = useSelector((state) => state?.currentStrategyCard);
  let baseSubscriptionValue = getStringToNumber(
    strategyDetails?.["Min. Investment"]
  );
  const [subscriptionData, setSubscriptionData] = useState(null);

  const [baseSubscriptionFees, setSubscriptionfees] = useState(
    0.01 * baseSubscriptionValue
  );

  const [additionalSubscribedValuebyUser, setAdditionalSubscribedValuebyUser] =
    useState(0); //when the slider is moved in exposure Component

  const [additionalSubscriptionFees, setadditionalSubscriptionFees] =
    useState(0);

  const [taxes, setTaxes] = useState(0);

  const [pageType, setPageType] = useState("subscribeInitial");

  // reset data of dialog box on open or close action
  useEffect(() => {
    setPageType("subscribeInitial");
    setSubscriptionData({});
  }, [open]);
  // get list of all the registered broker on
  useEffect(() => {
    if (pageType === "subscribeInitial")
      dispatch({ type: "SEND_USER_BROKERS_REQUEST" });
  }, [pageType, dispatch]);
  // populate subscription data on dialog box rendering
  useEffect(() => {
    if (strategyDetails !== null)
      setSubscriptionData({
        ...subscriptionData,
        strategyid: strategyDetails?.["Strategy ID"],
        basesubscription: getStringToNumber(
          strategyDetails?.["Min. Investment"]
        ),
        priority: 100,
        baselots: 1,
        additionalsubscription: 0,
      });
  }, []);
  // to get dialog box contents based on the pageType
  const getComponent = () => {
    if (pageType === "subscribeInitial")
      return (
        <SubscribeInitialPage
          handleClose={handleClose}
          setPageType={setPageType}
          subscriptionData={subscriptionData}
          setSubscriptionData={setSubscriptionData}
          baseSubscriptionFees={baseSubscriptionFees}
          setadditionalSubscriptionFees={setadditionalSubscriptionFees}
          additionalSubscriptionFees={additionalSubscriptionFees}
          setTaxes={setTaxes}
          setAdditionalSubscribedValuebyUser={
            setAdditionalSubscribedValuebyUser
          }
          additionalSubscribedValuebyUser={additionalSubscribedValuebyUser}
        />
      );
    if (pageType === "agreement")
      return (
        <Agreement
          handleClose={handleClose}
          setPageType={setPageType}
          baseSubscriptionFees={baseSubscriptionFees}
          additionalSubscriptionFees={additionalSubscriptionFees}
          subscriptionData={subscriptionData}
        />
      );
    if (pageType === "paymentPage")
      return (
        <MakePayment
          setPageType={setPageType}
          handleClose={handleClose}
          subscriptionData={subscriptionData}
          setSubscriptionData={setSubscriptionData}
          baseSubscriptionFees={baseSubscriptionFees}
          additionalSubscriptionFees={additionalSubscriptionFees}
          taxes={taxes}
        />
      );
    if (pageType === "addBroker")
      return <AddBroker setPageType={setPageType} />;
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={classes.SubscribeStrategyContainer}
    >
      {getComponent()}
    </Modal>
  );
}
