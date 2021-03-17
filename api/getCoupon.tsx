export default function getCoupon({ acctID, phone, source }: any) {
  const request = {
    acctid: acctID,
    isexpired: false,
    phone: phone,
    source: source,
  };
  return fetch(process.env.COUPON_SERVICE + "carplus/coupon/getmembercoupon", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  })
    .then((response) => response.json())
    .then((myJson) => {
      // console.log(myJson);

      return myJson;
    });
}
