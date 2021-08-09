/** @format */

export function getStringToNumber(str) {
  let num = parseInt(str.replaceAll(",", ""));
  return num;
}
