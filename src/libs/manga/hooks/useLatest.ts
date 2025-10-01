import { useQuery } from "@tanstack/react-query";
import type { MangaResponse } from "../mangaModel";

export function useLatest(filterValue: string) {
  return useQuery({
    queryKey: ["latest_release", filterValue],
    queryFn: async () => {
      const res = await fetch(
        `https://otruyenapi.com/v1/api/danh-sach/${filterValue}?page=1`
      );
      if (!res.ok) throw new Error("Failed to fetch latest releases");
      return res.json() as Promise<MangaResponse>;
    },
    staleTime: 1000 * 60 * 5, // cache 5 min
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
}
