import { useState } from "react";
import { useEffect } from "react";

export default function usePagination(data, nowPage, pageDataCount=10) {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [pageRangeArray, setPageRangeArray] = useState([]);
  useEffect(() => {
    if (data && data.length > 0) {
      const totalPage = Math.ceil(data.length /  pageDataCount);
      setPage(totalPage);
      const startIndex =  pageDataCount * (nowPage - 1);
      const endIndex = nowPage === totalPage ? data.length : startIndex +  pageDataCount;
      setPageData(data.slice(startIndex, endIndex));
      const currentStartPage = parseInt((nowPage - 1) / 10) * 10 + 1;
      const currentLastPage = currentStartPage + 9 > totalPage ? totalPage : currentStartPage + 9;
      setPageRangeArray(Array.from({ length: currentLastPage - currentStartPage + 1 }, (_, i) => i + currentStartPage));
    }else{
      setPageData([]);
      setPageRangeArray([]);
      setPage(1);
    }
  }, [data, nowPage, pageDataCount]);

  return {
    page,
    pageData,
    pageRangeArray,
  };
}
