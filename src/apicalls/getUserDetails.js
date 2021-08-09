import { API } from "../axios/instance";

async function getUserDetails() {
  let error = null;
  let responseData = null;
  const response = await API.post(
    "Raindrop/raintech.php?apicall=getUserKyc"
  ).catch((err) => console.log(err));
  if (response?.data?.E) {
    error = response?.data?.Data?.M;
  } else {
    responseData = response?.data?.Data[0];
  }
  return { error, responseData };
}

export default getUserDetails;
