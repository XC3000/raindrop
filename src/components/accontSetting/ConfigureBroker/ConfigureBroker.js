import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function ConfigureBroker() {
  const dispatch = useDispatch();
  const userSubscribeBroker = useSelector(
    (state) => state?.appData?.userBrokers
  );
  useEffect(() => {
    dispatch({ type: "SEND_USER_BROKERS_REQUEST" });
  }, []);
  // console.log(userSubscribeBroker);
  return (
    <div>
      This feature is coming soon. In the interim please add and configure your
      broker account from the subscription tab on the marketplace.{" "}
    </div>
  );
}
