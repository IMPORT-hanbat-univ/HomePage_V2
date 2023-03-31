export default function getFilteData(data, filter, sort="latest") {
  const filteredObj = Object.fromEntries(Object.entries(filter).filter(([key, value]) => value !== "all"));
  const queryKeys = Object.keys(filteredObj);
  let filteredData = [];
  if (!data || !Array.isArray(data)) {
    return [];
  }
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    let match = true;
    for (let j = 0; j < queryKeys.length; j++) {
      const key = queryKeys[j];
      if (item[key] !== filter[key]) {
        match = false;
        break;
      }
    }
    if (match) {
      filteredData.push(item);
    }
  }
  console.log("one",filteredData);

  if(sort === "latest"){
    filteredData = filteredData.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
  }else if(sort === "oldest"){
    filteredData = filteredData.sort((a, b) => new Date(a.createAt) - new Date(b.createAt));
  }

  return filteredData;
}
