import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
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
    display: "block",
  },
  bottomMargin: {
    marginBottom: "8px",
  },
}));
export default function UserDetailsForm({ props }) {
  const classes = useStyles();
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    loading,
  } = props;
  //   console.log(values);
  return (
    <Grid container direction="column" justify="flex-start">
      {/* ----------------------header--------------------- */}
      <Grid item className={classes.bottomMargin}>
        <Typography variant="body1" color="primary">
          User Details
        </Typography>
        <Typography variant="body2">
          Information related to your personal identification and contact
          information.
        </Typography>
      </Grid>
      {/* ------------------------inputs--------------------- */}
      <Grid container direction="row" spacing={3}>
        <Grid item className={classes.bottomMargin} md={4}>
          <label>First Name</label>
          <br />
          <input
            className={classes.input}
            type="text"
            value={values.firstName}
            name="firstName"
            disabled
          />
        </Grid>
        <Grid item className={classes.bottomMargin} md={4}>
          <label>Middle Name</label>
          <br />
          <input
            className={classes.input}
            type="text"
            value={values.midddlename}
            name="middlename"
            disabled
          />
        </Grid>
        <Grid item className={classes.bottomMargin} md={4}>
          <label>Last Name</label>
          <br />
          <input
            className={classes.input}
            type="text"
            value={values.lastName}
            name="lastName"
            disabled
          />
        </Grid>
      </Grid>
      {/* ------------------Dob----------------------- */}
      <Grid container direction="row">
        <Grid item className={classes.bottomMargin} md={4}>
          <label>Date of birth</label>
          <br />
          <input
            className={classes.input}
            type="date"
            value={values.dob}
            name="dob"
            onChange={handleChange}
            placeholder="Data not provided. Please update your details."
          />
        </Grid>
      </Grid>
      {/* --------------Pan Id---------------- */}
      <Grid container direction="row">
        <Grid item className={classes.bottomMargin} md={4}>
          <label>Pan Id</label>
          <br />
          <input
            className={classes.input}
            type="text"
            value={values.taxID}
            name="taxID"
            placeholder="Data not provided. Please update your details."
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid item className={classes.bottomMargin} md={12}>
        <Typography variant="body1" color="primary">
          Contact Details
        </Typography>
      </Grid>

      <Grid container direction="row" spacing={2}>
        {/* ---------------Country---------------- */}
        <Grid item className={classes.bottomMargin} md={4}>
          <label>Country</label>
          <br />
          <input
            className={classes.input}
            type="text"
            value={values.country}
            name="country"
            placeholder="Data not provided. Please update your details."
            onChange={handleChange}
          />
        </Grid>
        {/* ---------------Address---------------- */}
        <Grid item className={classes.bottomMargin} md={4}>
          <label>Address</label>
          <br />
          <input
            className={classes.input}
            type="text"
            value={values.addline1}
            name="addline1"
            placeholder="Data not provided. Please update your details."
            onChange={handleChange}
          />
        </Grid>
        {/* ---------------Address2---------------- */}
        <Grid item className={classes.bottomMargin} md={4}>
          <label>Address</label>
          <br />
          <input
            className={classes.input}
            type="text"
            value={values.addline2}
            name="addline2"
            placeholder="Data not provided. Please update your details."
            onChange={handleChange}
          />
        </Grid>
        {/* ---------------City---------------- */}
        <Grid item className={classes.bottomMargin} md={4}>
          <label>City</label>
          <br />
          <input
            className={classes.input}
            type="text"
            value={values.city}
            name="city"
            placeholder="Data not provided. Please update your details."
            onChange={handleChange}
          />
        </Grid>
        {/* ---------------State---------------- */}
        <Grid item className={classes.bottomMargin} md={4}>
          <label>State</label>
          <br />
          <input
            className={classes.input}
            type="text"
            value={values.state}
            name="state"
            placeholder="Data not provided. Please update your details."
            onChange={handleChange}
          />
        </Grid>
        {/* ---------------Zip---------------- */}
        <Grid item className={classes.bottomMargin} md={4}>
          <label>Zip</label>
          <br />
          <input
            className={classes.input}
            type="text"
            value={values.zip}
            name="zip"
            placeholder="Data not provided. Please update your details."
            onChange={handleChange}
          />
        </Grid>
        {/* ---------------Phone---------------- */}
        <Grid item className={classes.bottomMargin} md={4}>
          <label>Phone</label>
          <br />
          <input
            className={classes.input}
            type="text"
            value={values.phone}
            name="phone"
            placeholder="Data not provided. Please update your details."
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span className={classes.errorText}>
            {touched.phone && errors.phone ? errors.phone : null}
          </span>
        </Grid>
        {/* ---------------Mobile---------------- */}
        <Grid item className={classes.bottomMargin} md={4}>
          <label>Mobile</label>
          <br />
          <input
            className={classes.input}
            type="text"
            value={values.mobile}
            name="mobile"
            placeholder="Data not provided. Please update your details."
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span className={classes.errorText}>
            {touched.mobile && errors.mobile ? errors.mobile : null}
          </span>
        </Grid>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          size="small"
        >
          Update
          {loading && (
            <CircularProgress
              color={"white"}
              size={15}
              style={{ marginLeft: "8px" }}
            />
          )}
        </Button>
      </Grid>
    </Grid>
  );
}
