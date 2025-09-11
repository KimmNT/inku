import { useMangaByName } from "@/libs/manga/hooks/useMangaByName";
import { ChapterRoute, MangaSearchResultRoute } from "@/routeRegistry";
import { Link } from "@tanstack/react-router";

export default function MangaSearchResult() {
  const { manga_name } = MangaSearchResultRoute.useParams();

  const { data: mangaSearchData } = useMangaByName(manga_name ?? "");
  return (
    <div>
      {mangaSearchData?.data.items.map((manga) => (
        <div key={manga.name}>
          <h2>{manga.name}</h2>
          <img
            src={manga.thumb_url}
            alt="manga thumbnail"
            width={120}
            height={200}
          />

          <div>
            {manga.chapters.map((chapter, index) => (
              <div key={index}>
                {chapter.server_data.map((data, index) => (
                  <div key={index}>
                    <Link
                      to={ChapterRoute.fullPath}
                      params={{
                        manga_name: manga.name.toString(),
                        chapter_num: data.chapter_name.toString(),
                      }}
                    >
                      {chapter.server_name} - {data.chapter_name}
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )) ?? "No results found."}
    </div>
  );
}
