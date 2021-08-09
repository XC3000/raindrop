import { API } from "../axios/instance";
import qs from "qs";
async function getUserSubscriptionSummary(strategyid) {
  let error = null;
  let capacity = null;
  let utilization = null;
  const response = await API.post(
    "Raindrop/raintech.php?apicall=usersubscriptionsummary",
    qs.stringify({ strategyid: strategyid })
  ).catch((err) => console.log(err));
  //   console.log(response);
  if (response?.data?.E) {
    error = response?.data?.M;
  } else {
    capacity = response?.data?.D[0]?.capacity;
    utilization = response?.data?.D[0]?.utilization;
  }
  //   console.log(capacity);
  //   console.log(utilization);
  return { error, capacity, utilization };
}

export default getUserSubscriptionSummary;
