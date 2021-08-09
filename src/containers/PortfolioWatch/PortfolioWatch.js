/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { types } from "../../actions/action.RequestData";
import CardSlider from "../../components/CardSlider/CardSlider";
import InfoElement from "../../components/InfoElement/InfoElement";
import Jumbotron from "../../components/jumbotron";
import JumbotronLeft from "../../components/jumbotronLeft/JumbotronLeft";
import JumbotronRight from "../../components/jumbotronRight/JumbotronRight";
import { newtrade } from "../../socket";
import Dashboard from "../dashboard/Dashboard";

export default function PortfolioWatch() {
  const [cardType, setCardType] = useState("portfolioOverviewCard");
  const selectedPortfolioCard = useSelector(
    (state) => state?.selectedPortfolioCard
  );
  const dispatch = useDispatch();
  // dispatch to get all the subcribed strategies by user
  useEffect(() => {
    dispatch({
      type: types.SEND_USER_SUBSCRIBED_STRATEGIES_REQUEST,
      payload: "strategy", // value for options params in api call
    });
    //for portfolio overview card
    dispatch({
      type: types.SEND_PORTFOLIO_OVERVIEW_REQUEST,
      payload: "master",
    });
  }, [dispatch]);
  // to call live trade pnl
  useEffect(() => {
    if (cardType === "portfolioOverviewCard") {
      newtrade({ strategyId: "" });
    }
    if (cardType === "portfolioWatch") {
      newtrade({ strategyId: selectedPortfolioCard?.["Strategy ID"] });
    }
  }, [cardType, selectedPortfolioCard]);
  // console.log(cardType);
  const jumbotronLeft = (
    <JumbotronLeft>
      <InfoElement type={cardType} setCardType={setCardType} />
    </JumbotronLeft>
  );
  const jumbotronRight = (
    <JumbotronRight
      type={cardType}
      stratId={selectedPortfolioCard?.["Strategy ID"]}
    />
  );
  const jumbotron = <Jumbotron left={jumbotronLeft} right={jumbotronRight} />;
  const slider = <CardSlider cardType={cardType} setCardType={setCardType} />;

  return <Dashboard top={jumbotron} bottom={slider} />;
}
