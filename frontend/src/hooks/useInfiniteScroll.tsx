import { useEffect, useState } from "react";

export default function useInfiniteScroll(target: React.RefObject<HTMLDivElement>, data: any[]) {
  const [number, setNumber] = useState(1);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    // data가 변경될 때마다 새로운 데이터의 첫 15개를 가져옴
    if (data && data.length > 0) {
      console.log("num", number);
      const newData = data.slice(0, number * 15);
      setFilteredData(newData);
    } else {
      setFilteredData([]);
    }
  }, [JSON.stringify(data), number]);
  useEffect(() => {
    setNumber(1);
  }, [JSON.stringify(data)]);
  // 무한 스크롤 기능 유지
  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const options = {
      threshold: 1.0,
    };
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setNumber((prev) => prev + 1);
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(target.current!);
    return () => {
      observer.disconnect();
    };
  }, [target]);

  return filteredData;
}
