/** @format */

import React, { useEffect, useState } from "react";
import "./login.css";
import img1 from "../../static/login/image-right.svg";
import img2 from "../../static/login/Login-Register.png";
import LoginFormContainer from "./LoginFormContainer";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
// import RegisterFormContainer from "./RegisterFormContainer";
// import RegiterSuccesMsg from "../../components/RegisterLoginMessageBox/RegiterSuccesMsg";
import LoginMessageBox from "../../components/RegisterLoginMessageBox/LoginMessageBox";
import WaitlistRegister from "../../components/Waitlist/WaitlistRegister";
import WaitlistSuccessMsg from "../../components/Waitlist/WaitlistSuccessMsg";

function LoginAndRegister() {
  const [pageType, setPageType] = useState("login");
  const [title, setTitle] = useState("Login - RAIN");
  // const [registerSuccessFlag, setRegisterSuccessFlag] = useState(false);
  const [waitlistSuccessFlag, setWaitListSuccessFlag] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const { user } = useSelector((state) => state.authReducer);
  // const stateobj = useSelector((state) => state.authReducer);

  document.title = title;

  const getComponent = () => {
    // if (pageType === "register" && registerSuccessFlag === true)
    // 	return <RegiterSuccesMsg />;
    if (pageType === "register" && waitlistSuccessFlag === true)
      return <WaitlistSuccessMsg />;
    if (user !== null && pageType === "login" && user?.activationstatus === 0)
      return <LoginMessageBox username={user?.username} />;
    if (pageType === "login") return <LoginFormContainer />;
    if (pageType === "register")
      return <WaitlistRegister setFlag={setWaitListSuccessFlag} />; //<RegisterFormContainer setFlag={setRegisterSuccessFlag} />;
  };

  useEffect(() => {
    // if there is a user object in store and activationstatus is 1 then
    // user can be directed to dashboard else he will be shown a message to activate his account
    if (user !== null && user?.activationstatus === 1) {
      // console.log("here", location.pathname);
      history.push("/dashboard/home");
    }
  }, [user, history]);

  useEffect(() => {
    if (location.pathname === "/register") {
      setPageType("register");
      setTitle("Register - RAIN");
    } else {
      setPageType("login");
      setTitle("Login - RAIN");
    }
    // return setRegisterSuccessFlag(false);
    return setWaitListSuccessFlag(false);
  }, [location?.pathname]);

  return (
    <div className="loginAndRegister_container">
      <div className="header">
        <span className="header__text">
          Welcome To Your Home For <br />
          Automated Trading
        </span>
      </div>
      <div className="login_body">
        <div className="left">
          <img src={img2} alt="img-1" className="dark-chart-img" />
        </div>
        <div className="right">{getComponent()}</div>
      </div>
    </div>
  );
}

export default LoginAndRegister;
