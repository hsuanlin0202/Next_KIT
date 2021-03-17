import TWLocale from "date-fns/locale/zh-CN";
import DateFnsUtils from "@date-io/date-fns";
import React, { useState } from "react";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

type Props = {
  dateTitle: string;
  dateHint: string;
  timeTitle: string;
  timeHint: string;
  onPick: any;
  textColor: string;
};
export default function DateTimeLocalPicker({
  dateTitle,
  dateHint,
  timeTitle,
  timeHint,
  onPick = () => {},
  textColor,
}: Props) {
  const orderDate = new Date();
  orderDate.setDate(new Date().getDate() + 2);
  const [selectedDate, handleDateChange] = useState(orderDate);

  function setDateTime(d: any) {
    //不知道什麼getMonth少1，手動補回。
    const month =
      d.getMonth() < 9
        ? "0" + (d.getMonth() + 1).toString()
        : (d.getMonth() + 1).toString();
    const tempDateTime =
      d.getFullYear().toString() +
      month +
      d.getDate().toString() +
      d.getHours().toString() +
      d.getMinutes().toString() +
      "00";
    onPick(tempDateTime);
    // console.log("getFull :" + d.toDateString());
    // console.log("getYear :" + d.getFullYear());
    // console.log("getMonth :" + d.getMonth());
    // console.log("getDate :" + d.getDate());
    // console.log("getHours :" + d.getHours());
    // console.log("getMinutes :" + d.getMinutes());
    // console.log(tempDateTime);
    handleDateChange(d);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={TWLocale}>
      <div className="w-full flex flex-no-wrap">
        <label className="w-full" style={{ color: textColor }}>
          {dateTitle}
          <span className="text-sm text-red-500"> {dateHint}</span>
        </label>
        <label className="w-full " style={{ color: textColor }}>
          {timeTitle}
          <span className="text-sm text-red-500"> {timeHint}</span>
        </label>
      </div>
      <div className="w-full flex flex-no-wrap">
        <div className="w-full py-5 outline-none text-lg">
          <DatePicker
            format="yyyy/MM/dd"
            value={selectedDate}
            onChange={(d) => setDateTime(d)}
            inputVariant="standard"
            minDate={orderDate}
          />
        </div>
        <div className="w-full py-5 outline-none text-lg">
          <TimePicker
            minutesStep={10}
            value={selectedDate}
            onChange={(d) => setDateTime(d)}
            inputVariant="standard"
          />
        </div>
      </div>
      <style jsx>
        {`
          .MuiOutlinedInput-input {
            padding: 8px 14px;
          }
        `}
      </style>
    </MuiPickersUtilsProvider>
  );
}
