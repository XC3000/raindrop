/** @format */

import { API } from "../axios/instance";
import qs from "qs";
export const subscribeTostrategy = async (body) => {
  let error = null;
  let successMsg = null;
  const response = await API.post(
    "Raindrop/raintech.php?apicall=addnewsubscription",
    qs.stringify(body)
  ).catch((err) => console.log("reset password error...", err));
  if (response?.data?.E) {
    error = response?.data?.M;
  } else {
    successMsg = response?.data?.M;
  }
  return { error, successMsg };
};
