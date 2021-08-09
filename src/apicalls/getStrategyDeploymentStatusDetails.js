import { API } from "../axios/instance";
import qs from "qs";

async function getStrategyDeploymentStatusDetails(body) {
  let error = null;
  let data = null;
  const response = await API.post(
    `Raindrop/raintech.php?apicall=current_deployment_status`,
    qs.stringify(body)
  ).catch((err) => console.log(err));
  //   console.log(response);
  if (response?.data?.E) {
    error = response?.data?.M;
  } else {
    data = response?.data?.D[0];
  }

  return { error, data };
}

export default getStrategyDeploymentStatusDetails;
