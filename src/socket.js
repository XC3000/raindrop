/** @format */
import { API } from "./axios/instance";
import qs from "qs";
import { changeLivepnl, chnageLiveChartData } from "./actions/action.livepnl";
import store from "./store";
import moment from "moment";
import { ifGetLiveData } from "./utilityFunctions/ifGetLiveData";

// import
let interval = null;
let classholder = null; // variable to hold the class object
let calldate = moment().format("yyyy-MM-DD");
let errorcounter = 0; //variable to stop fetcing data if ltp api error
export async function getaccounts_apicall(strategyId) {
  const response = await API.post(
    "Raindrop/raintech.php?apicall=ws_accounts_setup",
    qs.stringify({ date: calldate, strategyid: strategyId })
  );
  // console.log(response);
  return response;
}

export async function getltp_apicallSymbol() {
  const response = await API.post(
    `Raindrop/wsoperations.php?apicall=fetchltpmultiLtp`, //fetchltpmulti
    qs.stringify(classholder.symbolstring())
  );
  //console.log("getltp_apicallSymbol", response);
  return response;
}

// newtrade to be imported to app.js and to be called from there after authentication
export function newtrade({ strategyId }) {
  classholder = null;
  getaccounts_apicall(strategyId)
    .then((response) => {
      getdata(response);
    })
    .catch((err) => console.log(err));
}
// main data clas called accounts
function accounts(openpositions, pnldata) {
  let symbol = [];
  // console.log("pnl...", pnldata);
  this.positionobject = openpositions; // // this is an dict/ object that contains all the data of open positions in a client account
  this.realizedpnl = pnldata["realizedpnlsum"]; // variable of the total realized pnl know by the bakend when the data was insantitiated
  this.unrealizedpnl = pnldata["unrealizedpnlsum"]; // variable of the total unrealized pnl know by the bakend when the data was insantitiated
  this.costs = pnldata["costsum"]; // variable of the total costs know by the bakend when the data was insantitiated
  let symbolstring = "i=";
  for (let x = 0; x < openpositions.length; x++) {
    if (openpositions[x]["openquantity"] !== 0) {
      symbol.push(openpositions[x]["tradesymbol"]);
      symbolstring =
        symbolstring +
        encodeURIComponent(openpositions[x]["tradesymbol"]) +
        "&i=";
      this.symboldata = {
        symbolarr: symbolstring.substring(0, symbolstring.length - 3),
      };
    }
  }
  this.symbols = symbol; // arrary of the users openpositions symbols
  this.t0_realizedpnl = pnldata["t0_realizedpnlsum"];
  this.t0_unrealizedpnl = pnldata["t0_unrealizedpnlsum"];
  this.t0_costs = pnldata["t0_costsum"];
  this.symbolLength = this.symbols.length;
}
accounts.prototype.symbolstring = function () {
  return this.symboldata;
};
// main method on accounts classes to calculate change in pnl
accounts.prototype.pricechange = function (priceobject) {
  // console.log("pricechnage.....");
  let tempunrealizedpnl = 0;
  let securities = Object.keys(priceobject);
  let positions = this.positionobject;
  // console.log(positions);

  for (var x = 0; x < positions.length; x++) {
    if (
      positions[x]["openquantity"] !== 0 &&
      securities.includes(positions[x]["tradesymbol"])
    ) {
      var symbol = positions[x]["tradesymbol"];

      let settlementprice = isNaN(positions[x]["settlementprice"])
        ? 0
        : positions[x]["settlementprice"];

      tempunrealizedpnl =
        tempunrealizedpnl +
        (parseFloat(priceobject[symbol]) - parseFloat(settlementprice)) *
          parseFloat(positions[x]["openquantity"]);
    }
  }
  let dailypnl = tempunrealizedpnl + this.realizedpnl;
  let totalpnl =
    dailypnl + this.t0_realizedpnl + this.t0_unrealizedpnl - this.t0_costs;

  store.dispatch(
    changeLivepnl({
      type: "CHANGE_LIVE_PNL",
      payload: {
        newunrealizedpnl: this.unrealizedpnl,
        dailypnl: dailypnl,
        totalpnl: totalpnl,
      },
    })
  );
  store.dispatch(
    chnageLiveChartData({
      type: "CHANGE_LIVE_CHART_DATA",
      payload: {
        ydata: dailypnl,
        time: moment().format("h:mm:ss a"),
      },
    })
  );
};

// function to resolve the ltp data recieved by ajax call.
function getltp(response) {
  response = response?.data;
  if (response["E"] === false) {
    let dataArr = response["Data"]?.["data"];
    let priceobject = {};
    for (let x in dataArr) {
      let symbol = dataArr[x]["symbol"];
      priceobject[symbol] =
        Object.keys(dataArr[x]["ltpQuote"]).length > 1
          ? dataArr[x]["ltpQuote"]["last_price"]
          : dataArr[x]["ltpQuote"];
    }
    // console.log("priceobject..", priceobject);
    if (priceobject) classholder.pricechange(priceobject);
  }
  if (response["E"] === true) {
    errorcounter = errorcounter + 1;
    // console.log("errorcounter....", errorcounter);
  }
}
// function to resolve the [realized/ unrealized/ positions] data recieved by ajax call and initaite a the accounts class and store in classholder variable.
function getdata(response) {
  // console.log(response);
  response = response?.data;
  if (response["E"] === false) {
    let openpositions = response["Data"][0];
    let pnldata = response["Data"][1][0];
    classholder = new accounts(openpositions, pnldata);
    //call ltp only when there is some data in openpositions
    if (response["M"] !== "No Open Positions") {
      ltpchange();
      // should only run between 9:15AM IST and 3:30PM IST
      if (interval) clearInterval(interval);
      interval = setInterval(() => {
        let ifGoLive = ifGetLiveData();
        if (ifGoLive) {
          ltpchange();
        }
      }, 5000);
    }
  }
}
function ltpchange(symbol) {
  // console.log("errorcounter...", errorcounter);
  if (errorcounter < 3) {
    // console.log("calling price");
    getltp_apicallSymbol()
      .then(function (response) {
        getltp(response);
      })
      .catch((err) => console.log(err));
  } else if (errorcounter > 10) {
    console.log("Resetting api call: LTP.");
    errorcounter = 0;
  } else {
    errorcounter = errorcounter + 1;
    console.log("Error retrieving LTP. This process will restart shortly");
  }
}
// function to iterate across each symbol every second.// 5 sec delay. Every 5 seconds this function will cll the unction iteratee )ltpchange)
// function intervalForEach(array, iteratee, delay) {
//   let current = 0;
//   let interval = setInterval(() => {
//     if (current === array.length) {
//       clearInterval(interval);
//     } else {
//       iteratee(array[current]); // calling ltpchange with the symbol
//       current++;
//     }
//   }, delay);
// }
