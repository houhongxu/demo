import moment from "moment";
import { DatePicker } from "antd";
import { RangePickerProps } from "antd/lib/date-picker";
const { RangePicker: AntdRangePicker } = DatePicker;

const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

// eslint-disable-next-line arrow-body-style
const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
};

const disabledRangeTime: RangePickerProps["disabledTime"] = (_, type) => {
  if (type === "start") {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
};

export function RangePicker() {
  return (
    <AntdRangePicker
      disabledDate={disabledDate}
      disabledTime={disabledRangeTime}
      showTime={{
        hideDisabledOptions: true,
        defaultValue: [
          moment("00:00:00", "HH:mm:ss"),
          moment("11:59:59", "HH:mm:ss"),
        ],
      }}
      format="YYYY-MM-DD HH:mm:ss"
    />
  );
}
