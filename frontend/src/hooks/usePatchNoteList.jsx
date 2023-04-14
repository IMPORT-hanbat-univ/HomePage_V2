import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function usePatchNoteList(data, monthString) {
  const [monthList, setMonthList] = useState([]);
  const [monthDataList, setMonthDataList] = useState([]);
  useEffect(() => {
    if (data && data.length > 0) {
      const year = dayjs(monthString.replace(".", "-"), "YYYY.MM").year();
      const month = dayjs(monthString.replace(".", "-"), "YYYY-MM").month();
      const filteredData = data.filter((item) => {
        const date = dayjs(item.createAt);
        return date.year() === year && date.month() === month;
      });
      setMonthDataList(filteredData);
      const monthArray = [];
      for (const item of data) {
        const dateString = dayjs(item.createAt).format("YYYY.MM");
        const checkDate = monthArray.find((it) => it === dateString);
        if (!checkDate) {
          monthArray.push(dateString);
        }
      }
      setMonthList(monthArray);
    } else {
      setMonthList([]);
      setMonthDataList([]);
    }
  }, [data, monthString]);

  return {
    monthList,
    monthDataList,
  };
}
