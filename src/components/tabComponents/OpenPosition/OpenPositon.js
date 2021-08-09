import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getOpenPosition from "../../../apicalls/getOpenPosition";
import ErrorPage from "../../errorPage/ErrorPage";
import {
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    border: `1px solid ${theme.palette.background.stroke}`,
    borderRadius: "13px",
    margin: "10px 5px 5px 5px",
    minHeight: "350px",
    maxHeight: "350px",
    maxidth: "98%",
    overflow: "auto",
    marginTop: "15px",
  },
  tablehead: {
    backgroundColor: theme.palette.background.BG,
  },
  table: {
    "& .MuiTableCell-root": {
      padding: "10px",
      // borderBottom: "none ",
    },
  },
}));

export default function OpenPositon({ type }) {
  const classes = useStyles();
  async function callOpenPosition() {
    let arg =
      type === "portfolioOverviewCard" ? "all" : selectedCard?.["Strategy ID"];
    const { errorMessage, openPositonDetails } = await getOpenPosition(arg);
    if (errorMessage) setErrorMsg(errorMessage);
    if (openPositonDetails) setOpenPositionData(openPositonDetails);
  }
  const selectedCard = useSelector((state) => state?.selectedPortfolioCard);
  const [errorMsg, setErrorMsg] = useState(null);
  const [openPositionData, setOpenPositionData] = useState(null);

  useEffect(() => {
    setErrorMsg(null);
    setOpenPositionData(null);
    callOpenPosition();
  }, [type, selectedCard]);

  if (errorMsg) return <ErrorPage errorText={errorMsg} />;

  return (
    <div className={classes.tableContainer}>
      <Table className={classes.table}>
        <TableHead className={classes.tablehead}>
          <TableRow>
            <TableCell>Broker Id</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Strategy</TableCell>
            <TableCell align="center">Sub Strategy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {openPositionData?.map((item) => (
            <TableRow>
              <TableCell component="th" scope="row" align="left">
                {item?.["Broker ID"]}
              </TableCell>
              <TableCell align="center">{item?.["Quantity"]}</TableCell>
              <TableCell align="center">{item?.["Strategy"]}</TableCell>
              <TableCell align="center">{item?.["Sub Strategy"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
