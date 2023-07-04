export default function getFilteredData(data, filter, sort = "latest") {
  if (!data || !Array.isArray(data)) {
    return [];
  }
  const queryKeys = Object.keys(filter).filter((key) => filter[key]);
  const filteredData = data.filter((item) => {
    return queryKeys.every((key) => {
      if (key === "tag") {
        const tagList = filter[key];
        return tagList.every((tag) => item["tagF"] === tag || item["tagS"] === tag || item["tagT"] === tag);
      } else if (key === "search") {
        const searchValue = filter[key].toLowerCase().trim();
        return (
          item["content"].toLowerCase().trim().includes(searchValue) ||
          item["title"].toLowerCase().trim().includes(searchValue)
        );
      } else {
        return item[key] === filter[key];
      }
    });
  });

  const sortedData = [...filteredData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return sort === "oldest" ? sortedData.reverse() : sortedData;
}
