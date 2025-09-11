import { MangaSearchResultRoute } from "@/routeRegistry";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export default function MangaSearch() {
  const [mangaTitle, setMangaTitle] = useState("");

  return (
    <div>
      <h1>Search your manga</h1>
      <input
        type="text"
        value={mangaTitle}
        onChange={(e) => setMangaTitle(e.target.value)}
      />
      <Link
        to={MangaSearchResultRoute.fullPath}
        params={{
          manga_name: mangaTitle,
        }}
      >
        search
      </Link>
    </div>
  );
}
