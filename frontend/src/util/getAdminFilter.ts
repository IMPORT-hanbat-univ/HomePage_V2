interface Filter {
  currentRank: string;
  requestRank?: string;
  searchValue: string;
}

export default function getAdminFilter(data: any[], filter: Filter): any[] {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.filter((item) => {
    return Object.keys(filter).every((key) => {
      if (key === "currentRank") {
        return filter[key] === "all" || item["rank"] === parseInt(filter[key]);
      } else if (key === "searchValue") {
        const searchValue = filter[key].toLowerCase().trim();

        return (
          item["nick_name"].toLowerCase().trim().includes(searchValue) ||
          item["email"].toLowerCase().trim().includes(searchValue)
        );
      } else {
        // 지정된 키 이외의 필터 키는 무시하도록 처리
        return true;
      }
    });
  });
}
