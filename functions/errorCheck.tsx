export default function errorListCheck(list: Array<boolean>) {
  for (const item of list) {
    // console.log(item);
    if (item === false) {
      return false;
    }
  }
  return true;
}

export function DateYMDhms(originData: Date) {
  const month =
    originData.getMonth() < 9
      ? "0" + (originData.getMonth() + 1).toString()
      : (originData.getMonth() + 1).toString();
  return (
    originData.getFullYear().toString() +
    month +
    originData.getDate().toString() +
    originData.getHours().toString() +
    originData.getMinutes().toString() +
    "00"
  );
}
