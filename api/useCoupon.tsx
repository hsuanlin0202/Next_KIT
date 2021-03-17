export default function useCoupon(request: object) {
  // console.log(request);
  return fetch(process.env.COUPON_SERVICE + "carplus/coupon/usecoupon", {
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
