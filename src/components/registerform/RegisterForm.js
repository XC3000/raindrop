/** @format */

import React from "react";
import { Button, Switch } from "@material-ui/core";
import "./registerForm.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import WarningTwoToneIcon from "@material-ui/icons/WarningTwoTone";
import { Link } from "react-router-dom";

function RegisterForm({ handleRegister, error, setFlag }) {
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        userName: "",
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
        password: "",
        password1: "",
        mobile: "",
      },
      validationSchema: Yup.object({
        userName: Yup.string()
          .strict()
          .lowercase("Use only lower case letters")
          .required("User name is required."),
        firstname: Yup.string().required("First name is required."),
        middlename: Yup.string().ensure(),
        lastname: Yup.string().required("Last name is required"),
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required"),
        password1: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm password is required"),
        mobile: Yup.string()
          .matches(
            /^\d+$/,
            "Mobile number should only have digits. No special charaters or letters to be included."
          )
          .length(10, "Mobile must be exactly 10 digits")
          .required("Mobile number is required"),
      }),
      onSubmit(values) {
        // console.log(values, errors);
        handleRegister({
          userName: values.userName,
          firstname: values.firstname,
          middlename: values.middlename,
          lastname: values.lastname,
          email: values.email,
          password: values.password,
          mobile: values.mobile,
        });
      },
    });

  return (
    <div className="register__formBody">
      <div className="toogle__button">
        <span className="individuals">Individuals</span>
        <Switch size="medium" />
        <span className="institution">Institutions</span>
      </div>
      <div className="input__container">
        <div className="register--text">Register</div>
        <div className="personal_info__inputs">
          <div className="form--inputs">
            <label>User name</label>
            <br />
            <input
              type="text"
              name="userName"
              values={values.userName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span className="register_input_error">
              {touched.userName && errors.userName ? errors.userName : null}
            </span>
          </div>
          <div
            className="form--inputs half-width"
            style={{ marginRight: "12px" }}
          >
            <label>First name</label>
            <br />
            <input
              type="text"
              name="firstname"
              values={values.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span className="register_input_error">
              {touched.firstname && errors.firstname ? errors.firstname : null}
            </span>
          </div>
          <div className="form--inputs half-width">
            <label>Middle name</label>
            <br />
            <input
              type="text"
              name="middlename"
              values={values.middlename}
              onChange={handleChange}
            />
            <span className="register_input_error">
              {touched.middlename && errors.middlename
                ? errors.middlename
                : null}
            </span>
          </div>
          <div className="form--inputs half-width">
            <label>Last name</label>
            <br />
            <input
              type="text"
              name="lastname"
              values={values.lastname}
              onChange={handleChange}
            />
            <span className="register_input_error">
              {touched.lastname && errors.lastname ? errors.lastname : null}
            </span>
          </div>
        </div>

        <div className="form--inputs">
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            values={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span className="register_input_error">
            {touched.email && errors.email ? errors.email : null}
          </span>
        </div>
        <div className="form--inputs">
          <label>Mobile number</label>
          <br />
          <input
            type="text"
            name="mobile"
            values={values.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span className="register_input_error">
            {touched.mobile && errors.mobile ? errors.mobile : null}
          </span>
        </div>
        <div className="form--inputs">
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            values={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span className="register_input_error">
            {touched.password && errors.password ? errors.password : null}
          </span>
        </div>
        <div className="form--inputs">
          <label>Confirm password</label>
          <br />
          <input
            type="password"
            name="password1"
            values={values.password1}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span className="register_input_error">
            {touched.password1 && errors.password1 ? errors.password1 : null}
          </span>
        </div>

        {/* show error */}

        {error !== null ? (
          <div className="login_error">
            {" "}
            <span className="login_error_waringIcon">
              <WarningTwoToneIcon />
            </span>
            <span className="login_error_text">{error}</span>
          </div>
        ) : null}
        <div className="register__button">
          <Button type="submit" onClick={handleSubmit}>
            REGISTER
          </Button>
        </div>
      </div>
      <div className="formBody__footer">
        Have an account?{" "}
        <span className="register-now">
          <Link to="/login">Login</Link>{" "}
        </span>
      </div>
    </div>
  );
}

export default RegisterForm;
