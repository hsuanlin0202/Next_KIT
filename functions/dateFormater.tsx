export function DateYMDhms(originData: Date) {
  //yyyyMMddhhmmss
  let tempDate = originData.toLocaleDateString();
  if (tempDate.substring(4, 6) != "/1") {
    tempDate = tempDate.replace("/", "0").replace("/", "");
  }
  tempDate.replace("/", "");
  tempDate =
    tempDate +
    originData.toTimeString().substring(0, 8).replace(":", "").replace(":", "");
  // console.log(tempDate);
  return tempDate;
}

export function DateY_M_D_hms(originData: Date) {
  //yyyy-MM-dd hh:mm:ss
  let tempDate = originData.toLocaleDateString();
  if (tempDate.substring(4, 6) != "/1") {
    tempDate = tempDate.replace("/", "-0").replace("/", "-");
  }
  tempDate.replace("/", "-");
  tempDate = tempDate + " " + originData.toTimeString().substring(0, 8);
  console.log(tempDate);
  return tempDate;
}
