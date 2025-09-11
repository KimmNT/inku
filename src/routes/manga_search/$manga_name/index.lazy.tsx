import MangaSearchResult from "@/views/MangaSearch/MangaSearchResult/MangaSearchResult";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/manga_search/$manga_name/")({
  component: MangaSearchResult,
});
