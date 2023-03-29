import { useState } from "react";
import { useEffect } from "react";

export default function usePagination(data, nowPage) {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [pageRangeArray, setPageRangeArray] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const totalPage = Math.ceil(data.length / 10);
      setPage(totalPage);
      const startIndex = 10 * (nowPage - 1);
      const endIndex = nowPage === totalPage ? data.length : startIndex + 10;
      setPageData(data.slice(startIndex, endIndex));
      const currentStartPage = parseInt((nowPage - 1) / 10) * 10 + 1;
      const currentLastPage = currentStartPage + 9 > totalPage ? totalPage : currentStartPage + 9;
      setPageRangeArray(Array.from({ length: currentLastPage - currentStartPage + 1 }, (_, i) => i + currentStartPage));
    }
  }, [data, nowPage]);

  return {
    page,
    pageData,
    pageRangeArray,
  };
}
