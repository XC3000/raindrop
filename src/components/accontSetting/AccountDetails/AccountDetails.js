/** @format */

import { makeStyles, Typography, CircularProgress } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { resetPassword } from "../../../apicalls/resetPassword";
import SuccessMsg from "../../screenMessages/SuccessMsg";
import ErrorMsg from "../../screenMessages/ErrorMsg";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    height: "30px",
    padding: "0px 5px",
    boxSizing: "border-box",
    borderRadius: "5px",
    fontSize: "12px",
    backgroundColor: theme.palette.background.BG,
    border: `1px solid ${theme.palette.background.stroke}`,
    color: theme.palette.text.primary,

    "&:focus": {
      outline: "none",
      border: "1px solid #4684f0",
    },
  },
  errorText: {
    color: "red",
  },
}));

export default function AccountDetails() {
  const classes = useStyles();
  const userKYC = useSelector((state) => state?.appData?.userKYC);
  const [resetPasswordErrorMsg, setResetPasswordErrorMsg] = useState(null);
  const [resetPasswordSuccessMsg, setResetPasswordSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        password: "",
        password2: "",
      },
      validationSchema: Yup.object({
        password: Yup.string().required("Password is required"),
        password2: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm password is required"),
      }),
      async onSubmit(values) {
        // console.log(values.password);
        setLoading(true);
        setResetPasswordErrorMsg(null);
        setResetPasswordSuccessMsg(null);
        const { error, successMsg } = await resetPassword({
          username: userKYC?.username,
          password: values.password,
        });
        values.password = "";
        values.password2 = "";
        if (error) {
          setLoading(false);
          setResetPasswordErrorMsg(error);
        }
        if (successMsg) {
          setLoading(false);
          setResetPasswordSuccessMsg(successMsg);
        }
      },
    });

  function getMessageComponent() {
    if (resetPasswordErrorMsg)
      return <ErrorMsg message={resetPasswordErrorMsg} />;
    if (resetPasswordSuccessMsg)
      return <SuccessMsg message={resetPasswordSuccessMsg} />;
    if (!resetPasswordErrorMsg && !resetPasswordSuccessMsg) return null;
  }
  // console.log("username...", username);
  // console.log("error...", resetPasswordErrorMsg);
  // console.log("succesMsg...", resetPasswordSuccessMsg);
  // console.log("loading...", loading);

  return (
    <Grid container direction="column" justify="flex-start">
      <Grid item>
        <Typography variant="body1" color="primary">
          Account Details
        </Typography>
      </Grid>

      <Grid
        container
        direction="row"
        spacing={2}
        style={{ marginBottom: "8px", marginTop: "5px" }}
      >
        <Grid item md={4}>
          <label>Username</label>
          <br />
          <input
            className={classes.input}
            name="Username"
            width="250px"
            type="text"
            value={userKYC?.username || ""}
            disabled
          />
        </Grid>
        <Grid item md={4}>
          <label>Email id</label>
          <br />
          <input
            className={classes.input}
            name="emailid"
            width="250px"
            type="text"
            value={userKYC?.email || ""}
            disabled
          />
        </Grid>
      </Grid>
      <Grid item>
        <Typography
          style={{ fontSize: "14px", marginBottom: "8px" }}
          color="primary"
        >
          Reset Password
        </Typography>
      </Grid>

      <Grid
        container
        direction="row"
        style={{ marginBottom: "8px" }}
        spacing={2}
      >
        <Grid item md={4}>
          <label>Enter new password</label>
          <br />
          <input
            className={classes.input}
            name="password"
            width="250px"
            type="password"
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
          />

          <div className={classes.errorText}>
            {touched.password && errors.password ? errors.password : null}
          </div>
        </Grid>
        <Grid item md={4}>
          <label>Re-enter new password</label>
          <br />
          <input
            className={classes.input}
            name="password2"
            width="250px"
            type="password"
            onChange={handleChange}
            value={values.password2}
            onBlur={handleBlur}
          />

          <div className={classes.errorText}>
            {touched.password2 && errors.password2 ? errors.password2 : null}
          </div>
        </Grid>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          type="submit"
          onClick={handleSubmit}
          size="small"
          color="primary"
        >
          Reset Password
          {loading && (
            <CircularProgress
              color={"white"}
              size={15}
              style={{ marginLeft: "8px" }}
            />
          )}
        </Button>
      </Grid>
      {getMessageComponent()}
    </Grid>
  );
}
