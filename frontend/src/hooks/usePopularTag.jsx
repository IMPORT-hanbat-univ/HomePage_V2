
import { useState, useEffect } from 'react';

export default function usePopularTag(data) {
  const [tagArray, setTagArray] = useState([]);

  useEffect(() => {
    let tagObject = {};
    if (!data || !Array.isArray(data)) {
      setTagArray([]);
      return;
    }
    for(let i = 0; data.length > i; i++){
      const item = data[i];
      if(item["tagF"]){
        if(tagObject[item["tagF"]]){
          tagObject[item["tagF"]]++;
        }else{
          tagObject[item["tagF"]] = 1;
        }
      }
      if(item["tagS"]){
        if(tagObject[item["tagS"]]){
          tagObject[item["tagS"]]++;
        }else{
          tagObject[item["tagS"]] = 1;
        }
      }
      if(item["tagT"]){
        if(tagObject[item["tagT"]]){
          tagObject[item["tagT"]]++;
        }else{
          tagObject[item["tagT"]] = 1;
        }
      }
    }

    tagObject = Object.keys(tagObject)
      .sort()
      .reverse()
      .reduce((acc, key) => {
        acc[key] = tagObject[key];
        return acc;
      }, {});

    const newTagArray = Object.entries(tagObject);
    setTagArray(newTagArray);
  }, [data]);

  return tagArray;
}