import { useMangaByName } from "@/libs/manga/hooks/useMangaByName";
import type { ChapterResponse } from "@/libs/manga/mangaModel";
import { ChapterRoute, MangaSearchResultRoute } from "@/routeRegistry";
import { Link, useRouter } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import style from "./Chapter.module.scss";
import clsx from "clsx";
import { ArrowLeft, ArrowUpCircle } from "lucide-react";
import Loading from "@/components/Loading/Loading";
import Navbar from "@/components/Navbar/Navbar";

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

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Navbar />
      {chapterLoading && <Loading />}
      {!chapterLoading && chapterData && (
        <div className={style.Container}>
          <div className={style.BackButton}>
            <Link
              to={MangaSearchResultRoute.fullPath}
              params={{
                manga_name: manga_name,
              }}
              className={style.Button}
            >
              <ArrowLeft className={style.ButtonIcon} />
              <p className={style.ButtonHeading}>Back to search</p>
            </Link>
          </div>
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
            <select
              onChange={handleChapterChange}
              value={chapter_num}
              className={style.Selector}
            >
              <option value="" disabled className={style.Option}>
                Select Chapter
              </option>
              {chapterList.map((num) => (
                <option key={num} value={num} className={style.Option}>
                  Chapter {num}
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

          <ArrowUpCircle
            onClick={() => scrollToTop()}
            className={style.ToTopButton}
          />
        </div>
      )}
    </>
  );
}
