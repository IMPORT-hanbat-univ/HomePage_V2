import { ReadonlyURLSearchParams } from "next/navigation";

export default function getSearchParamsToObject(
  urlSearchParams: ReadonlyURLSearchParams | null
): Record<string, string | string[]> {
  if (!urlSearchParams) {
    return {};
  }
  const obj: Record<string, string | string[]> = {};

  for (const [key, value] of urlSearchParams.entries()) {
    if (!obj.hasOwnProperty(key)) {
      obj[key] = value;
    } else {
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key] as string];
      }
      (obj[key] as string[]).push(value);
    }
  }

  return obj;
}
