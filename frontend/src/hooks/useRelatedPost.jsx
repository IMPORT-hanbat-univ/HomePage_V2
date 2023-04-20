import { useEffect, useState } from "react";

export default function useRelatedPost(list, post) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (list && list.length > 0 && post && Object.keys(post).length > 0) {
      const postKeywordArray = post?.content.content.match(/[가-힣a-zA-Z]+(?=([^가-힣a-zA-Z]|$))/g);
      const postKeywordSet = new Set(postKeywordArray);
      const filteredList = list?.reduce((acc, cur) => {
        const keyword = cur?.content.match(/[가-힣a-zA-Z]+(?=([^가-힣a-zA-Z]|$))/g);
        const keywordSet = new Set(keyword);
        // console.log("keywordSet", keywordSet);
        // console.log("keywordPost", postKeywordSet);
        const intersection = new Set([...postKeywordSet].filter((x) => keywordSet.has(x)));
        const shortestArrLength = Math.min(postKeywordSet.size, keywordSet.size);
        // 자카드 유사도 계산
        const similarity = intersection.size / shortestArrLength;
        console.log("sim", similarity);
        console.log(keywordSet, postKeywordSet);
        // console.log("sim", similarity);
        if (similarity >= 0.2) {
          acc.push(cur);
        }
        return acc;
      }, []);
      setFilteredData(filteredList);
    } else {
      setFilteredData([]);
    }
  }, [list, post]);

  return filteredData;
}
