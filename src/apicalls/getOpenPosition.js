import { API } from "../axios/instance";
import qs from "qs";

async function getOpenPosition(stratId) {
  let errorMessage = null;
  let openPositonDetails = null;
  const response = await API.post(
    `https://raintech.ai/Raindrop/raintech.php?apicall=openpositions`,
    qs.stringify({ strategyID: stratId })
  ).catch((error) => console.log(error));
  // console.log(response);
  if (response?.data?.E) {
    errorMessage = response?.data?.M;
  } else {
    openPositonDetails = response?.data?.Data;
  }
  return { errorMessage, openPositonDetails };
}

export default getOpenPosition;
