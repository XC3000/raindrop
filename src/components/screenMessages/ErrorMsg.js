/** @format */

import { makeStyles, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect } from "react";

export default function ErrorMsg({ message }) {
  const [open, setOpen] = React.useState(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity="error" variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}
