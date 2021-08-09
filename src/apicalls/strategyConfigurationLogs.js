import { API } from "../axios/instance";
import qs from "qs";

async function strategyConfigurationLogs(id) {
  let error = null;
  let data = null;
  const response = await API.post(
    `Raindrop/raintech.php?apicall=strategy_configuration_logs`,
    qs.stringify({ strategyid: id })
  ).catch((err) => console.log(err));
  // console.log(response);
  if (response?.data?.E) {
    error = response?.data?.M;
  } else {
    data = response?.data?.D[0];
  }

  return { error, data };
}

export default strategyConfigurationLogs;
