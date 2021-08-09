import { API } from "../axios/instance";
import qs from "qs";

async function getStarategyDeploymentPreview(strategyid) {
  let previewError = null;
  let previewMessage = null;
  const response = await API.post(
    `Raindrop/raintech.php?apicall=playstrategy_preview`,
    qs.stringify({ masterstrategyid: strategyid })
  ).catch((err) => console.log(err));
  //   console.log(response);
  if (response?.data?.E) {
    previewError = response?.data?.M;
  } else {
    previewMessage = response?.data?.D[0]; // to be set
  }

  return { previewError, previewMessage };
}

export default getStarategyDeploymentPreview;
