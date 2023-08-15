interface Filter {
  currentRank?: string;
  requestRank?: string;
  searchValue: string;
  category?: string; // 추가된 부분
}

export default function getAdminFilter(data: any[], filter: Filter): any[] {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.filter((item) => {
    return Object.keys(filter).every((key) => {
      if (key === "currentRank") {
        const currentRank = filter[key] as string;
        return filter[key] === "all" || item["rank"] === parseInt(currentRank);
      } else if (key === "requestRank") {
        // 추가된 부분
        const requestRank = filter[key] as string;
        return filter[key] === "all" || item["requestRank"] === parseInt(requestRank);
      } else if (key === "searchValue") {
        const searchValue = filter[key].toLowerCase().trim();

        return (
          item["nick_name"].toLowerCase().trim().includes(searchValue) ||
          item["email"].toLowerCase().trim().includes(searchValue)
        );
      } else if (key === "category") {
        // 추가된 부분

        const category = filter[key] as string;
        return filter[key] === "all" || item["category"] === parseInt(category);
      } else {
        // 지정된 키 이외의 필터 키는 무시하도록 처리
        return true;
      }
    });
  });
}
