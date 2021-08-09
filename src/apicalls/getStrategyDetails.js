import { API } from "../axios/instance";
import qs from "qs";

async function getStrategyDetails(strategyid) {
  let error = null;
  let strategyDetails = null;
  const response = await API.post(
    `Raindrop/raintech.php?apicall=getStrategyDetails&strategyid=${strategyid}`
  ).catch((err) => console.log(err));
  // console.log(response);
  if (response?.data?.E) {
    error = response?.data?.M;
  } else {
    strategyDetails = response?.data?.Data[0];
  }

  return { error, strategyDetails };
}

export default getStrategyDetails;
