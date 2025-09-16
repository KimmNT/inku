import { Route as IndexRoute } from "./routes/index";
import { Route as MangaSearchRoute } from "./routes/manga_search/index";
import { Route as MangaSearchResultRoute } from "./routes/manga_search/$manga_name/index";
import { Route as ChapterRoute } from "./routes/manga_search/$manga_name/chapter/$chapter_num/index";
import { Route as SavedRoute } from "./routes/saved/index";

export type RegisteredRoutes =
  | typeof IndexRoute
  | typeof MangaSearchRoute
  | typeof ChapterRoute
  | typeof SavedRoute
  | typeof MangaSearchResultRoute;

export {
  IndexRoute,
  MangaSearchRoute,
  MangaSearchResultRoute,
  ChapterRoute,
  SavedRoute,
};
