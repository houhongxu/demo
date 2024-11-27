import moment from "moment";
import { Calendar } from "antd";
import { CalendarMode } from "antd/lib/calendar/generateCalendar";
import { RangePickerProps } from "antd/lib/date-picker";
import { useState } from "react";

// eslint-disable-next-line arrow-body-style
const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
};

export function Calender() {
  const [vaule, setValue] = useState(moment());

  return (
    <Calendar
      style={{ width: 300, border: "1px solid #f0f0f0", borderRadius: 2 }}
      fullscreen={false}
      value={vaule}
      onChange={(value) => {
        if (value && value >= moment().endOf("day")) {
          setValue(value);
        }
      }}
      disabledDate={disabledDate}
    />
  );
}
