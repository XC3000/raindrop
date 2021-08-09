/** @format */

import React from "react";
import "./registerSuccessMsg.css";
import { Link } from "react-router-dom";

function RegiterSuccesMsg() {
  // console.log("register msg");
  return (
    <div className="registerMsg__container">
      <p className="para_1">Thank you for Registering with us.</p>
      <p className="para_2">
        Please check your inbox for a mail from contact@rainfund.ai
      </p>
      <p className="para_3">
        <b>Click the link</b> in the email to confirm your registration.
      </p>
      <p className="para_4">
        Don't get any email? Check you span or promotions folder.
      </p>
      <p className="para_5">
        Go to
        <span className="register_msg__link">
          <Link to="/login"> Login</Link>
        </span>
      </p>
    </div>
  );
}

export default RegiterSuccesMsg;
