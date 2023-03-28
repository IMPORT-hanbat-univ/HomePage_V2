export default function getFilteData(data, queryString) {
    const queryKeys = Object.keys(queryString);
    const filteredData = [];
    if (!data || !Array.isArray(data)) {
        return [];
      }
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      let match = true;
      for (let j = 0; j < queryKeys.length; j++) {
        const key = queryKeys[j];
        if (item[key] !== queryString[key]) {
          match = false;
          break;
        }
      }
      if (match) {
        filteredData.push(item);
      }
    }
    return filteredData;
  }