import { API } from "../axios/instance";
import qs from "qs";
async function pauseStrategy(body) {
  let error = null;
  let successMsg = null;
  const response = await API.post(
    "Raindrop/raintech.php?apicall=pausestrategy",
    qs.stringify(body)
  ).catch((err) => console.log(err));
  //   console.log(response);
  if (response?.data?.E) {
    error = response?.data?.M;
  } else {
    successMsg = response?.data?.M;
  }

  return { error, successMsg };
}

export default pauseStrategy;
