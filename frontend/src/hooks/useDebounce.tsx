"use client";
import React, { useState, useEffect } from "react";

export default function useDebounce(keyword: string, delay: number) {
  // 리렌더 시에는 useState hook의 초기값이 항상 버려집니다 - 초기값은 오직 컴포넌트가 마운트 될 때만 사용됩니다.
  // 그렇기 때문에 초깃값 keyword는 해당 컴포넌트가 처음 마운트 될때만 initialvalue로 작동하고 그 뒤 렌더링될때는 x
  const [debouncedValue, setDebouncedValue] = useState<string>(keyword);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(keyword);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [keyword, delay]);
  return debouncedValue;
}
