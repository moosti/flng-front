"use client";

import { useEffect, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Calendar, DateObject } from "react-multi-date-picker";

export function RangeCalendar({ value }: { value: DateObject[][] }) {
  const [values, setValues] = useState<DateObject[][]>(value);

  useEffect(() => {
    setValues(value);
  }, [value]);

  return (
    <Calendar
      className="!mx-auto red"
      // disabled
      format="YYYY-MM-DD"
      readOnly
      // mapDays={({ date, today, selectedDate, currentMonth, isSameDate }) => {
      //   // console.log({ date, today, selectedDate, currentMonth, isSameDate });

      //   let props = {};
      //   // props.className = `${
      //   //   isSameDate(date, today)
      //   //     ? "!text-prime !bg-accent"
      //   //     : "!text-base-card-content !bg-base-card"
      //   // } ${isSameDate(date, selectedDate) ? "!bg-prime" : ""}`;
      //   // props.style = {
      //   //   borderRadius: "100%",

      //   //   backgroundColor:
      //   //     date.month.index === currentMonth.index ? "#F7CE5B" : "",
      //   // };

      //   // if (isSameDate(date, today)) props.style.color = "#ccc";
      //   // console.log("selectedDate", selectedDate);
      //   // console.log("date", date);
      //   // console.log(
      //   //   "isSameDate(date, selectedDate)",
      //   //   isSameDate(date, selectedDate)
      //   // );

      //   // if (isSameDate(date, selectedDate)) {
      //   //   props.style = {
      //   //     ...props.style,
      //   //     color: "#0074d9",
      //   //     backgroundColor: "#000",
      //   //     fontWeight: "bold",
      //   //     border: "1px solid #F7CE5B",
      //   //   };
      //   // }

      //   return props;
      // }}
      value={values}
      onChange={setValues}
      multiple
      range
      calendar={persian}
      locale={persian_fa}
    />
  );
}
