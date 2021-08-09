/** @format */

import { makeStyles, Table } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { TableRow, TableHead, TableCell, TableBody } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    border: `1px solid ${theme.palette.background.stroke}`,
    borderRadius: "13px",
    margin: "10px 5px 5px 5px",
    minHeight: "300px",
    maxHeight: "300px",
    overflow: "auto",
  },
  tableHead: {
    backgroundColor: theme.palette.background.BG,
  },
  circularProgress: {
    display: "grid",
    placeItems: "center",
    minHeight: "350px",
    maxHeight: "350px",
  },
}));

export default function UserTradeLog() {
  const classes = useStyles();
  const data = useSelector((state) => state?.appData?.userTradeLogs);
  const loading = useSelector((state) => state?.loading?.userTradeLogs);
  if (loading) {
    return (
      <div className={classes.circularProgress}>
        <CircularProgress color="primary" size={50} value={75} />
      </div>
    );
  }
  return (
    <div className={classes.tableContainer}>
      <Table stickyHeader>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell align="left">Broker</TableCell>
            <TableCell align="center">Strategy</TableCell>
            <TableCell align="center">Sub Strategy</TableCell>
            <TableCell align="center">Time</TableCell>
            <TableCell align="center">Action</TableCell>
            <TableCell align="center">Security</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow hover>
              <TableCell align="left">
                <Typography variant="body2">{row?.["Broker"]}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body2">{row?.["Strategy"]}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body2">{row?.["Sub Strategy"]}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body2">{row?.["Time"]}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body2">{row?.["Action"]}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body2">{row?.["Security"]}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body2">{row?.["Quantity"]}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body2">{row?.["Price"]}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
