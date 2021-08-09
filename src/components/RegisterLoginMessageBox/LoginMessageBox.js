/** @format */

import React, { useState } from "react";
import "./registerSuccessMsg.css";
import qs from "qs";

import axios from "axios";

function LoginMessageBox({ username }) {
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    const url = `https://raintech.ai/Raindrop/userAuth.php?apicall=resendConfirmationEmail`;
    const response = await axios
      .post(url, qs.stringify({ userName: username }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .catch((error) => console.log(error));

    if (response?.data?.E) {
      setError(response?.data?.M);
    } else {
      setClicked(true);
    }
  };

  // console.log("login msg...", username);
  // console.log(clicked);

  return (
    <div className="registerMsg__container">
      <p className="para_1">
        Hello,it looks like you have yet to confirm your email id.
      </p>
      <p className="para_2">
        Please check your inbox for a mail from contact@rainfund.ai
      </p>
      <p className="para_3">
        <b>Click on the link</b> contained in the email to confirm your
        registration and then you can Login.
      </p>
      <p className="para_4">
        Didn't get any email? Check you spam or promotions folder.
      </p>
      <p className="para_5">
        {clicked ? (
          <>A link has been re-sent to your email id. </>
        ) : (
          <>
            Want us to resend the link?
            <span className="register_msg__link" onClick={handleClick}>
              Click Here
            </span>{" "}
          </>
        )}
      </p>
    </div>
  );
}

export default LoginMessageBox;
