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
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import strategyConfigurationLogs from "../../apicalls/strategyConfigurationLogs";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  brokerChange: {
    maxWidth: "100%",
    minWidth: "100%",
    minHeight: "70px",
    overflowX: "auto",
    borderRadius: "13px",
    backgroundColor: theme.palette.background.BG,
    border: `1px solid ${theme.palette.background.stroke}`,
    padding: "5px",
  },
  table: {
    "& .MuiTableCell-root": {
      padding: "6px",
      borderBottom: "none ",
    },
  },
}));
export default function ConfigurationLog() {
  const classes = useStyles();
  async function getConfigurationLogs(id) {
    const { error, data } = await strategyConfigurationLogs(id);
    if (data) setLogDetails(data);
  }
  const strategyDetils = useSelector((state) => state?.selectedPortfolioCard);
  const [logDetails, setLogDetails] = useState();
  useEffect(() => {
    getConfigurationLogs(strategyDetils?.["Strategy ID"]);
  }, [strategyDetils?.["Strategy ID"]]);

  return (
    <div className={classes.container}>
      <Typography
        variant="body1"
        color="primary"
        style={{ marginBottom: "8px" }}
      >
        Broker Change Requests
      </Typography>
      <Grid container className={classes.brokerChange}>
        {typeof logDetails?.["Broker Change Requests"][
          "Pending Broker Mapping Requests"
        ] === "string" ? (
          <Typography variant="body2">No Request Pending</Typography>
        ) : (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Broker Id</TableCell>
                <TableCell align="left">Broker Name</TableCell>
                <TableCell align="center">Completion Date</TableCell>
                <TableCell align="center">Request Status</TableCell>
                <TableCell align="center">Request Time</TableCell>
                <TableCell align="center">Startegy ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" align="left">
                  {
                    logDetails?.["Broker Change Requests"]?.[
                      "Pending Broker Mapping Requests"
                    ]?.["Broker ID"]
                  }
                </TableCell>
                <TableCell align="center">
                  {
                    logDetails?.["Broker Change Requests"]?.[
                      "Pending Broker Mapping Requests"
                    ]?.["Broker Name"]
                  }
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {
                    logDetails?.["Broker Change Requests"]?.[
                      "Pending Broker Mapping Requests"
                    ]?.["Completion Date"]
                  }
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {
                    logDetails?.["Broker Change Requests"]?.[
                      "Pending Broker Mapping Requests"
                    ]?.["Request Status"]
                  }
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {
                    logDetails?.["Broker Change Requests"]?.[
                      "Pending Broker Mapping Requests"
                    ]?.["Request Time"]
                  }
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {
                    logDetails?.["Broker Change Requests"]?.[
                      "Pending Broker Mapping Requests"
                    ]?.["Strategy ID"]
                  }
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </Grid>
      {/* ---------------------------Deployment Change Requests---------------------------- */}
      <Typography
        variant="body1"
        style={{ marginBottom: "8px", marginTop: "8px" }}
        color="primary"
      >
        Deployment Change Requests
      </Typography>
      <Grid container className={classes.brokerChange}>
        {typeof logDetails?.["Deployment Change Requests"][
          "Pending Deployment Change Requests"
        ] === "string" ? (
          <Typography variant="body2">No Request Pending</Typography>
        ) : (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Completion Date</TableCell>
                <TableCell align="center">Deployment Request</TableCell>
                <TableCell align="center">Request Status</TableCell>
                <TableCell align="center">Request Time</TableCell>
                <TableCell align="center"> Strategy ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" align="left">
                  {" "}
                  {
                    logDetails?.["Deployment Change Requests"]?.[
                      "Pending Deployment Change Requests"
                    ]?.["Completion Date"]
                  }
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {
                    logDetails?.["Deployment Change Requests"]?.[
                      "Pending Deployment Change Requests"
                    ]?.["Deployment Request"]
                  }
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {
                    logDetails?.["Deployment Change Requests"]?.[
                      "Pending Deployment Change Requests"
                    ]?.["Request Status"]
                  }
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {
                    logDetails?.["Deployment Change Requests"]?.[
                      "Pending Deployment Change Requests"
                    ]?.["Request Time"]
                  }
                </TableCell>
                <TableCell align="right">
                  {" "}
                  {
                    logDetails?.["Deployment Change Requests"]?.[
                      "Pending Deployment Change Requests"
                    ]?.["Strategy ID"]
                  }
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </Grid>
      {/* --------------------------Exposure Change Requests--------------------- */}
      <Typography
        variant="body1"
        style={{ marginBottom: "8px", marginTop: "8px" }}
        color="primary"
      >
        Exposure Change Requests
      </Typography>
      <Grid container className={classes.brokerChange}>
        {typeof logDetails?.["Exposure Change Requests"][
          "Pending Exposure Change Requests"
        ] === "string" ? (
          <Typography variant="body2">No Request Pending</Typography>
        ) : (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Completion Date</TableCell>
                <TableCell align="center">New Exposure</TableCell>
                <TableCell align="center">Request Status</TableCell>
                <TableCell align="center">Request Time</TableCell>
                <TableCell align="center">Strategy ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" align="left">
                  {" "}
                  {
                    logDetails?.["Exposure Change Requests"]?.[
                      "Pending Exposure Change Requests"
                    ]?.["Completion Date"]
                  }
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {" "}
                  {
                    logDetails?.["Exposure Change Requests"]?.[
                      "Pending Exposure Change Requests"
                    ]?.["New Exposure"]
                  }
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {
                    logDetails?.["Exposure Change Requests"]?.[
                      "Pending Exposure Change Requests"
                    ]?.["Request Status"]
                  }
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {
                    logDetails?.["Exposure Change Requests"]?.[
                      "Pending Exposure Change Requests"
                    ]?.["Request Time"]
                  }
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {
                    logDetails?.["Exposure Change Requests"]?.[
                      "Pending Exposure Change Requests"
                    ]?.["Strategy ID"]
                  }
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </Grid>
    </div>
  );
}
