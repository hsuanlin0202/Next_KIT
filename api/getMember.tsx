export default function getMember(acctID: number) {
  const request = {
    AcctId: acctID,
  };

  return fetch(process.env.MEMBER_OLD + "carplus/member/getMember", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  })
    .then((response) => response.json())
    .then((myJson) => {
      // log(myJson);

      return myJson;
    });
}
