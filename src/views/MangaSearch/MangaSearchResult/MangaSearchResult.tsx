import { useMangaByName } from "@/libs/manga/hooks/useMangaByName";
import { ChapterRoute, MangaSearchResultRoute } from "@/routeRegistry";
import { Link } from "@tanstack/react-router";
import style from "./MangaSearchResult.module.scss";
import Navbar from "@/components/Navbar/Navbar";
import Loading from "@/components/Loading/Loading";
import { useState } from "react";
import { Eye, List, X } from "lucide-react";

const IMG_DOMAIN = "https://img.otruyenapi.com/uploads/comics";

export default function MangaSearchResult() {
  const { manga_name } = MangaSearchResultRoute.useParams();
  const [isSelected, setIsSelected] = useState(false);
  const [mangaSelected, setMangaSelected] = useState<string | null>(null);

  const { data: mangaSearchData, isLoading } = useMangaByName(manga_name ?? "");

  const filteredMangaByName = () => {
    if (!mangaSelected) return [];
    return (
      mangaSearchData?.data.items
        .filter((item) => item.name.toString() === mangaSelected)
        .map((item) => item.chapters) ?? []
    );
  };

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <main className={style.MangaSearchResult}>
          <h1 className={style.Heading}>Search result for: {manga_name}</h1>
          <div className={style.MangaListItem}>
            {mangaSearchData?.data.items.map((manga) => (
              <div key={manga.name} className={style.Item}>
                <img
                  src={`${IMG_DOMAIN}/${manga.thumb_url}`}
                  alt="manga thumbnail"
                />

                <div className={style.MangaInfo}>
                  <div className={style.TextInfo}>
                    <h2 className={style.Name}>{manga.name}</h2>
                    <p className={style.Author}>{manga.author}</p>
                  </div>

                  <div className={style.Breaker}></div>

                  <div className={style.Controls}>
                    <Link
                      to={ChapterRoute.fullPath}
                      params={{
                        manga_name: manga.name.toString(),
                        chapter_num: "1",
                      }}
                      className={style.Button}
                    >
                      <Eye className={style.Icon} /> Read
                    </Link>
                    <button
                      type="button"
                      className={style.Button}
                      onClick={() => {
                        setIsSelected(!isSelected);
                        setMangaSelected(manga.name.toString());
                      }}
                    >
                      <List className={style.Icon} /> Chapter list
                    </button>
                  </div>
                </div>
              </div>
            )) ?? "No results found."}
          </div>

          {isSelected && (
            <div className={style.ChapterListContainer}>
              <div className={style.ChapterListHeader}>
                <p className={style.Header}>Chapter list</p>
                <X
                  className={style.Close}
                  onClick={() => setIsSelected(false)}
                />
              </div>
              <>
                {filteredMangaByName().map((chapters, index) => (
                  <div key={index}>
                    {chapters.map((chapter, chapterIndex) => (
                      <div className={style.ChapterList} key={chapterIndex}>
                        {chapter.server_data.map((data, dataIndex) => (
                          <Link
                            key={dataIndex}
                            to={ChapterRoute.fullPath}
                            params={{
                              manga_name: mangaSelected ?? "",
                              chapter_num: data.chapter_name.toString(),
                            }}
                            className={style.ChapterItem}
                          >
                            {data.chapter_name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </>
            </div>
          )}
        </main>
      )}
    </>
  );
}
