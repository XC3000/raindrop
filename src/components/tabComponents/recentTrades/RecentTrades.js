/** @format */

import {
  Grid,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Button,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../actions/action.RequestData";
import UserTradeLog from "./UserTradeLog";
import ErrorPage from "../../errorPage/ErrorPage";

export default function RecentTrades({ type }) {
  const dispatch = useDispatch();
  const error = useSelector((state) => state?.appError?.userTradeLogs);

  const currentCard = useSelector((state) => {
    if (type === "StrategyCard") return state?.currentStrategyCard;
    if (type === "portfolioWatch") return state?.selectedPortfolioCard;
  });

  const [apiParams, setApiParams] = useState(null);

  useEffect(() => {
    const strategyID =
      type === "portfolioOverviewCard" ? "all" : currentCard?.["Strategy ID"];
    const start = moment().subtract(7, "days").format("yyyy-MM-DD");
    const end = moment().format("yyyy-MM-DD");
    setApiParams({
      ...apiParams,
      strategyID,
      start,
      end,
    });
    dispatch(
      fetchData({
        type: "SEND_USER_TRADES_REQUEST",
        payload: { strategyID, start, end },
      })
    );
  }, [currentCard, type]);

  const handleChange = (e) => {
    setApiParams({ ...apiParams, [e.target.name]: e.target.value });
    const data = { ...apiParams, [e.target.name]: e.target.value };
    dispatch(
      fetchData({
        type: "SEND_USER_TRADES_REQUEST",
        payload: data,
      })
    );
  };

  const getComponent = () => {
    if (type === "portfolioWatch" || type === "portfolioOverviewCard")
      return <UserTradeLog />;
  };

  if (error) {
    return <ErrorPage errorText={error} />;
  }

  return (
    <Grid container direction="column" style={{ marginTop: "5px" }}>
      <Grid container direction="row" justify="flex-end" spacing={1}>
        <Grid item>
          <FormControl
            variant="outlined"
            // className={classes.formControl}
            size="small"
          >
            <TextField
              label="Start"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              name="start"
              size="small"
              variant="outlined"
              value={apiParams?.start}
              onChange={handleChange}
              defaultValue={moment().subtract(7, "days").format("yyyy-MM-DD")}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl
            variant="outlined"
            // className={classes.formControl}
            size="small"
          >
            <TextField
              label="End"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              name="end"
              size="small"
              variant="outlined"
              value={apiParams?.end}
              onChange={handleChange}
              defaultValue={moment().format("yyyy-MM-DD")}
            />
          </FormControl>
        </Grid>
      </Grid>

      {error ? error : getComponent()}
    </Grid>
  );
}
