/** @format */

import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StatisticCardComponent from "./StatisticCardComponent";
import ErrorPage from "../../errorPage/ErrorPage";

const useStyles = makeStyles((theme) => ({
  statisticTabContaner: {
    display: "flex",
    flexDirection: "column",
    padding: "5px 10px",
  },
  filterRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  formControl: {
    minWidth: "200px",
    maxWidth: "200px",
  },
  cardsComponentContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "15px",
    minHeight: "auto",
    maxHeight: "335px",
    overflowY: "auto",
    // border: "1px solid red",
  },
}));

function Statistic({ stratId, type }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const data = useSelector((state) => {
    if (type === "portfolioWatch" || type === "portfolioOverviewCard")
      return state?.appData?.portfolioStatistic;
    if (type === "StrategyCard")
      return state?.appData?.StrategyLibraryStatistic;
  });
  // console.log(data);
  const [filters, setFilters] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filteredData, setfilteredData] = useState(null);

  const error = useSelector((state) => {
    if (type === "StrategyCard")
      return state?.appError?.StrategyLibraryStatistic;
    if (type === "portfolioWatch" || type === "portfolioOverviewCard")
      return state?.appError?.portfolioStatistic;
  });

  const getFilters = () => {
    const filterExtraction = data?.map((item) => item["Filter"]);
    const filtersSet = new Set(filterExtraction);
    const filters = Array.from(filtersSet);
    filters.unshift("All");
    setSelectedFilter(filters[0]);
    setFilters(filters);
    return;
  };
  // console.log(data);
  useEffect(() => {
    if (type === "StrategyCard") {
      dispatch({
        type: "SEND_STRATEGY_LIBRARY_STATISTIC_REQUEST",
        payload: stratId, //has to be chnaged to stratID
        // payload: stratId,
      });
    }
    if (type === "portfolioWatch") {
      dispatch({
        type: "SEND_PORTFOLIO_STATISTICS_REQUEST",
        payload: stratId, //has to be chnaged to stratID
        // payload: stratId,
      });
    }
    if (type === "portfolioOverviewCard") {
      dispatch({
        type: "SEND_PORTFOLIO_STATISTICS_REQUEST",
        payload: "masterPortfolio", //has to be chnaged to stratID
        // payload: stratId,
      });
    }
  }, [stratId, type, dispatch]);
  useEffect(() => {
    getFilters();
  }, [data]);

  useEffect(() => {
    if (selectedFilter === "All") {
      setfilteredData(data);
    } else {
      const dataArr = data?.filter((item) => {
        if (item["Filter"] === selectedFilter) return item;
      });
      setfilteredData(dataArr);
    }
  }, [selectedFilter, data]);

  const handleChange = (e) => {
    setSelectedFilter(e.target.value);
  };
  // console.log("statistics...", data);
  // console.log("filters..", filters);
  // console.log("selectedFilter...", selectedFilter);
  // console.log(error);
  if (error) return <ErrorPage errorText={error} />;

  return (
    <div className={classes.statisticTabContaner}>
      <div className={classes.filterRow}>
        <FormControl
          variant="outlined"
          className={classes.formControl}
          size="small"
        >
          <InputLabel id="statistic">Statistic</InputLabel>
          <Select
            id="filter"
            label="Filter"
            name="filter"
            value={selectedFilter || ""}
            onChange={handleChange}
          >
            {filters?.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={classes.cardsComponentContainer}>
        {filteredData?.map((item) => (
          <StatisticCardComponent cardData={item} cardType={type} />
        ))}
      </div>
    </div>
  );
}

export default Statistic;
