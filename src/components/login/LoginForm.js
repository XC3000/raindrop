/** @format */

import React, { useState } from "react";
import "./loginform.css";

import WarningTwoToneIcon from "@material-ui/icons/WarningTwoTone";

import { Button, Switch } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Loginform({ handleLogin }) {
  const state = useSelector((state) => state.authReducer);
  const [checked, setChecked] = useState(false); // if false => individuals, true=> institution
  const [data, setData] = useState({
    userName: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="formBody">
      <div className="toogle__button">
        <span className="individuals">Individuals</span>
        <Switch size="medium" onChange={() => setChecked(!checked)} />
        <span className="institution">Institutions</span>
      </div>
      <div className="input__container">
        <div className="login--text">Log In</div>

        {state?.error !== null ? (
          <div className="login_error">
            {" "}
            <span className="login_error_waringIcon">
              <WarningTwoToneIcon />
            </span>
            <span className="login_error_text">{state?.error}</span>
          </div>
        ) : null}

        <div className="form--inputs">
          <label>Username</label>
          <br />
          <input
            type="text"
            name="userName"
            value={data.userName}
            onChange={handleChange}
          />
        </div>
        <div className="form--inputs">
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <div className="forget-password">Forget Password?</div>
        <div className="login__button">
          <Button onClick={(e) => handleLogin(data)}>LOG IN</Button>
        </div>
      </div>
      <div className="formBody__footer">
        Don't have an account?{" "}
        <span className="register-now">
          <Link to="/register">Register Now</Link>
        </span>
      </div>
    </div>
  );
}

export default Loginform;
