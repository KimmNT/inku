import { useQuery } from "@tanstack/react-query";
import type { MangaResponse } from "../mangaModel";

export function useMangaByName(mangName: string) {
  return useQuery({
    queryKey: ["manga_search", mangName],
    queryFn: async () => {
      const res = await fetch(
        `https://otruyenapi.com/v1/api/tim-kiem?keyword=${mangName}`
      );
      if (!res.ok) throw new Error("Failed to fetch videos");
      return res.json() as Promise<MangaResponse>;
    },
    enabled: !!mangName, // only fetch if songName is not empty
    staleTime: 1000 * 60 * 5, // cache 5 min
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
}
