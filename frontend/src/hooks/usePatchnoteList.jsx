import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function usePatchnoteList(data) {
  const [month, setMonth] = useState("");
  const [monthList, setMonthList] = useState([]);
  const [monthDataList, setMonthDataList] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      let targetYear = dayjs(month.replace(".", "-"), "YYYY-MM").year();
      let targetMonth = dayjs(month.replace(".", "-"), "YYYY-MM").month();
      if (month.trim() === "") {
        const latestDate = data.reduce((prev, current) => {
          return new Date(prev.createdAt) > new Date(current.createdAt) ? prev : current;
        }).createdAt;
        const latestMonth = dayjs(latestDate).format("YYYY.MM");
        setMonth(latestMonth);
        targetYear = dayjs(latestDate.replace(".", "-"), "YYYY-MM").year();
        targetMonth = dayjs(latestDate.replace(".", "-"), "YYYY-MM").month();
      }

      const { monthArray, monthDataArray } = data.reduce(
        (acc, item) => {
          const dateString = dayjs(item.createdAt).format("YYYY.MM");
          if (!acc.monthArray.includes(dateString)) {
            acc.monthArray.push(dateString);
          }
          const date = dayjs(item.createdAt);
          const year = date.year();
          const month = date.month();
          if (year === targetYear && month === targetMonth) {
            acc.monthDataArray.push(item);
          }
          return acc;
        },
        { monthArray: [], monthDataArray: [] }
      );
      setMonthList(monthArray);
      setMonthDataList(monthDataArray);
    } else {
      setMonthList([]);
      setMonthDataList([]);
    }
  }, [data, month]);

  return {
    month,
    setMonth,
    monthList,
    monthDataList,
  };
}
