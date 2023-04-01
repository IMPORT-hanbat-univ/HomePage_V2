export default function getFilteData(data, filter, sort = "latest") {
  if (!data || !Array.isArray(data)) {
    return [];
  }
  const queryKeys = Object.keys(filter).filter((key) => filter[key] !== "all");
  const filteredData = data.filter((item) => {
    return queryKeys.every((key) => {
      if (key === "tag") {
        const tagList = filter[key];
        return tagList.some(
          (tag) =>
            item["tagF"] === tag ||
            item["tagS"] === tag ||
            item["tagT"] === tag
        );
      } else {
        return item[key] === filteredObj[key];
      }
    });
  });

  if (sort === "latest") {
    filteredData.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
  } else if (sort === "oldest") {
    filteredData.sort((a, b) => new Date(a.createAt) - new Date(b.createAt));
  }

  return filteredData;
}