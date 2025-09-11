import Chapter from "@/views/Chapter/Chapter";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/manga_search/$manga_name/chapter/$chapter_num/"
)({
  component: Chapter,
});
