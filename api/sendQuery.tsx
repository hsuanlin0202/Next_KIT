import { DateYMDhms } from "../functions/dateFormater";

export default function sendQuery(request: object) {
  const now = DateYMDhms(new Date());
  // console.log(now);

  const finRequest = {
    Version: "1.0",
    MessageType: "DriverReserve",
    LastUpdatedDateTime: now,
    DriverReserve: request,
  };
  // const temprequest = {
  //   Version: "1.0",
  //   MessageType: "DriverReserve",
  //   LastUpdatedDateTime: "20210219131027",
  //   DriverReserve: {
  //     AcctId: "364411",
  //     IdNumber: "",
  //     UserName: "數據中心測試",
  //     Telephone: "0987987987",
  //     Cellphone: "",
  //     Email: "test@gmail.com",
  //     CouponCode: "",
  //     CouponName: "",
  //     ServiceCode: "DRIVER_B",
  //     Service: "商務專車",
  //     DriverTimeOfArrival: "20210108131027",
  //     CarType: "國產高級轎車",
  //     FlightNo: "",
  //     DeparturePlace: "出發地點",
  //     ArrivalPlace: "抵達地點",
  //     TripDescription: "行程說明",
  //     Message: "其他留言",
  //     Fax: "",
  //     RepresentativeName: "代表人姓名",
  //     NumberOfPassengers: "1",
  //     PassengerPhoneNumber: "1",
  //     NumberOfLargeLuggage: "1",
  //     NumberOfMiddleLuggage: "1",
  //     InvoiceReceiveName: "",
  //     InvoiceCategory: "1",
  //     InvoiceTitle: "測試",
  //     InvoiceCompanyNumber: "",
  //     InvoiceAddress: "",
  //     RefundType: "",
  //   },
  // };

  // console.log(finRequest);

  return fetch(process.env.API_GATEWAY + "/esb/restv2/app/driverReserve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(finRequest),
  })
    .then((response) => response.json())
    .then((myJson) => {
      // console.log(myJson);
      // log(myJson);

      return myJson;
    });
}
