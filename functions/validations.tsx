const emailPattern = new RegExp(
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);
const phonePattern = new RegExp(/^09\d{2}-?\d{3}-?\d{3}$/);

export function passengerValidate(newValue: string) {
  return newValue.length > 0;
}

export function nameValidate(newValue: string) {
  return newValue.length > 1;
}

/**
 * @param {string} newValue
 * @return {boolean}
 */
export function passwordValidate(newValue: string) {
  return newValue.length > 5 || newValue.length < 17;
}

/**
 * @param {string} newValue
 * @return {boolean}
 */
export function phoneValidate(newValue: string) {
  const phonePattern = new RegExp(/^09\d{2}-?\d{3}-?\d{3}$/);
  return phonePattern.test(newValue);
}

/**
 * @param {string} newValue
 * @return {boolean}
 */
export function emailValidate(newValue: string) {
  const emailPattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  return emailPattern.test(newValue) && newValue.length > 3;
}

/**
 * @param {string} newValue
 * @return {boolean}
 */
export function idValidate(newValue: string) {
  const tab = "ABCDEFGHJKLMNPQRSTUVXYWZIO";
  const A1 = [
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    3,
    3,
  ];
  const A2 = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
    1,
    2,
    3,
    4,
    5,
  ];
  const Mx = [9, 8, 7, 6, 5, 4, 3, 2, 1, 1];

  if (newValue.length !== 10) return false;
  let i = tab.indexOf(newValue.charAt(0));
  if (i === -1) return false;
  let sum = A1[i] + A2[i] * 9;

  for (i = 1; i < 10; i++) {
    let v = parseInt(newValue.charAt(i));
    if (isNaN(v)) return false;
    sum = sum + v * Mx[i];
  }
  if (sum % 10 !== 0) return false;
  return true;
}

/**
 * @param {string} newValue
 * @return {boolean}
 */
export function loginAcctValidate(newValue: string) {
  if (!newValue) return;
  if (
    (!isNaN(Number(newValue)) &&
      !phonePattern.test(newValue) &&
      newValue.length > 0) ||
    (isNaN(Number(newValue)) &&
      !emailPattern.test(newValue) &&
      newValue.length > 0)
  ) {
    return true;
  }
}
