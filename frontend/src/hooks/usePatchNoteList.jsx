import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function usePatchnoteList(data) {
  const [month, setMonth] = useState("");
  const [monthList, setMonthList] = useState([]);
  const [monthDataList, setMonthDataList] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const latestDate = data.reduce((prev, current) => {
        return new Date(prev.createAt) > new Date(current.createAt) ? prev : current;
      }).createAt;

      const latestMonth = dayjs(latestDate).format("YYYY.MM");
      setMonth(latestMonth);
      const targetYear = dayjs(latestDate.replace(".", "-"), "YYYY.MM").year();
      const targetMonth = dayjs(latestDate.replace(".", "-"), "YYYY-MM").month();

      const { monthArray, monthDataArray } = data.reduce(
        (acc, item) => {
          const dateString = dayjs(item.createAt).format("YYYY.MM");
          if (!acc.monthArray.includes(dateString)) {
            acc.monthArray.push(dateString);
          }
          const date = dayjs(item.createAt);
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
      console.log(123);
      setMonthList([]);
      setMonthDataList([]);
    }
  }, [data]);

  return {
    month,
    setMonth,
    monthList,
    monthDataList,
  };
}
