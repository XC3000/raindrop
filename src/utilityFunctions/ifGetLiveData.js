export function ifGetLiveData() {
  // setting ist offset to msec
  const ISToffset = 5.5 * 60 * 60 * 1000;
  let d = new Date();
  let localTime = d.getTime();
  let localOffSet = d.getTimezoneOffset() * 60000; // obtaining local time UTC offset and changing it to milisec
  let localUTCToIndUTC = localTime + ISToffset + localOffSet; //changing local UTC time to Indian UTC
  // let localUTCHour = new Date(localUTCToIndUTC).getHours();
  // let localUTCMin = new Date(localUTCToIndUTC).getMinutes();
  let today930 = new Date().setHours(9, 30, 0);
  let today1530 = new Date().setHours(15, 30, 0);
  // console.log(new Date(today1530));
  // console.log(new Date(today930));
  // console.log(new Date(localUTCToIndUTC));

  if (localUTCToIndUTC >= today930 && localUTCToIndUTC <= today1530) {
    return true;
  } else {
    return false;
  }
}
