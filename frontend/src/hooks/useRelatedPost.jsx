import { useEffect, useState } from "react";

export default function useRelatedPost(list, post) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (list && list.length > 0 && post && Object.keys(post).length > 0) {
      const postKeywordArray = post?.content.content.match(/[가-힣a-zA-Z]+(?=([^가-힣a-zA-Z]|$))/g);
      const postKeywordSet = new Set(postKeywordArray);

      const filteredList = list
        .filter((item) => item.id !== post.content.id) // 제외할 게시글
        .reduce((acc, cur) => {
          const keyword = cur?.content.match(/[가-힣a-zA-Z]+(?=([^가-힣a-zA-Z]|$))/g);
          const keywordSet = new Set(keyword);
          const intersection = new Set([...postKeywordSet].filter((x) => keywordSet.has(x)));
          const shortestArrLength = Math.min(postKeywordSet.size, keywordSet.size);
          // 자카드 유사도 계산
          const similarity = intersection.size / shortestArrLength;

          if (similarity >= 0.2) {
            acc.push({ ...cur, similarity });
          }
          return acc;
        }, [])
        .sort((a, b) => b.similarity - a.similarity);

      if (filteredList.length > 5) {
        setFilteredData(filteredList.slice(0, 5));
      } else {
        setFilteredData(filteredList);
      }
    } else {
      setFilteredData([]);
    }
  }, [list, post]);

  return filteredData;
}
