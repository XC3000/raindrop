/** @format */

import { Dialog, makeStyles, Modal } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddBroker from "../addBroker/AddBroker";

import Container from "./Container";
const useStyles = makeStyles((theme) => ({
  SubscribeStrategyDialog: {
    minWidth: "700px",
    maxWidth: "700px",
    minHeight: "650px",
    maxHeight: "650px",
    margin: "65px auto",
  },
}));
export default function ConfigureStrategy({ open, handleClose }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [addBrokerActive, setaddBrokerActive] = useState(false);

  useEffect(() => {
    setaddBrokerActive(false);
  }, [open]);

  useEffect(() => {
    dispatch({ type: "SEND_USER_BROKERS_REQUEST" });
  }, [addBrokerActive]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={classes.SubscribeStrategyDialog}
    >
      {addBrokerActive === true ? (
        <AddBroker
          setaddBrokerActive={setaddBrokerActive}
          calledfrom="configureStrategy"
        />
      ) : (
        <Container
          setaddBrokerActive={setaddBrokerActive}
          handleClose={handleClose}
        />
      )}
    </Modal>
  );
}
