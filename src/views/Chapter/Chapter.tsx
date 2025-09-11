import { useMangaByName } from "@/libs/manga/hooks/useMangaByName";
import type { ChapterResponse } from "@/libs/manga/mangaModel";
import { ChapterRoute } from "@/routeRegistry";
import { Link, useRouter } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import style from "./Chapter.module.scss";
import clsx from "clsx";

const IMG_DOMAIN = "https://sv1.otruyencdn.com";

export default function Chapter() {
  const { manga_name, chapter_num } = ChapterRoute.useParams();
  const [chapterLoading, setChapterLoading] = useState(false);
  const [chapterData, setChapterData] = useState<ChapterResponse | null>(null);

  const router = useRouter();

  const { data: mangaSearchData } = useMangaByName(manga_name ?? "");

  const latestChapterName =
    mangaSearchData?.data.items[0]?.chaptersLatest[0]?.chapter_name ?? "";

  const chapterList = Array.from(
    { length: parseInt(latestChapterName) + 1 },
    (_, i) => i
  );

  const filterChapter = mangaSearchData?.data.items.map((item) =>
    item.chapters.map((chapter) =>
      chapter.server_data.filter((data) => data.chapter_name === chapter_num)
    )
  );

  const filterChapterApi = filterChapter
    ?.flat(2)
    .find((data) => data?.chapter_name === chapter_num);

  useEffect(() => {
    if (!filterChapterApi?.chapter_api_data) return;
    setChapterLoading(true);

    const fetchChapter = async () => {
      try {
        const res = await fetch(filterChapterApi.chapter_api_data);
        const data = await res.json();
        setChapterLoading(false);
        setChapterData(data.data);
      } catch (err) {
        console.error("Error fetching chapter:", err);
      }
    };

    fetchChapter();
  }, [filterChapterApi]);

  const handleChapterChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedChapter = e.target.value;
      router.navigate({
        to: ChapterRoute.fullPath,
        params: { manga_name, chapter_num: selectedChapter },
      });
    },
    [manga_name, router]
  );

  return (
    <>
      {chapterLoading && <p>Loading chapter...</p>}
      {!chapterLoading && chapterData && (
        <div className={style.Container}>
          <div className={style.Heading}>
            {chapterData?.item?.chapter_title}
          </div>

          <div className={style.Pagination}>
            <Link
              className={clsx(
                style.Button,
                parseInt(chapter_num) === 1 && style.Disabled
              )}
              to={ChapterRoute.fullPath}
              params={{
                manga_name: manga_name,
                chapter_num: (parseInt(chapter_num) - 1).toString(),
              }}
            >
              Chapter {parseInt(chapter_num) - 1}
            </Link>
            <select onChange={handleChapterChange} value={chapter_num}>
              <option value="" disabled>
                Select Chapter
              </option>
              {chapterList.map((num) => (
                <option key={num} value={num}>
                  Chapter {num + 1}
                </option>
              ))}
            </select>
            <Link
              className={clsx(style.Button)}
              to={ChapterRoute.fullPath}
              params={{
                manga_name: manga_name,
                chapter_num: (parseInt(chapter_num) + 1).toString(),
              }}
            >
              Chapter {parseInt(chapter_num) + 1}
            </Link>
          </div>
          <div className={style.ChapterImages}>
            {chapterData?.item?.chapter_image.map((item, index) => {
              const imgPath = chapterData.item.chapter_path;

              return (
                <div key={index} className={style.ImageWrapper}>
                  <img
                    src={`${IMG_DOMAIN}/${imgPath}/${item.image_file}`}
                    alt=""
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>

          <div className={style.Pagination}>
            <Link
              className={clsx(
                style.Button,
                parseInt(chapter_num) === 1 && style.Disabled
              )}
              to={ChapterRoute.fullPath}
              params={{
                manga_name: manga_name,
                chapter_num: (parseInt(chapter_num) - 1).toString(),
              }}
            >
              Chapter {parseInt(chapter_num) - 1}
            </Link>
            <Link
              className={clsx(style.Button)}
              to={ChapterRoute.fullPath}
              params={{
                manga_name: manga_name,
                chapter_num: (parseInt(chapter_num) + 1).toString(),
              }}
            >
              Chapter {parseInt(chapter_num) + 1}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
