import { API } from "../axios/instance";
import qs from "qs";

async function updateKYC(body) {
  let error = null;
  let successMsg = null;
  const response = await API.post(
    "Raindrop/raintech.php?apicall=updateUserDetails",
    qs.stringify(body)
  ).catch((err) => console.log(err));
  if (response?.data?.E) {
    error = response?.data?.M;
  } else {
    successMsg = response?.data?.M;
  }

  return { error, successMsg };
}

export default updateKYC;
