
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

 

    const newTagArray = Object.entries(tagObject)
    .sort((a, b) => b[1] - a[1])
    .map(([key, _]) => key)
    setTagArray(newTagArray);
  }, [data]);

  return tagArray;
}