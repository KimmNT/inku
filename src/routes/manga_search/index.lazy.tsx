import MangaSearch from "@/views/MangaSearch/MangaSearch";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/manga_search/")({
  component: MangaSearch,
});
