import Navbar from "@/components/Navbar/Navbar";
import TabTitle from "@/components/TabTitle/TabTitle";
import { useMangaStorage } from "@/libs/manga/useMangaStorage";
import style from "./Saved.module.scss";
import { Eye } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import { ChapterRoute } from "@/routeRegistry";

const IMG_DOMAIN = "https://img.otruyenapi.com/uploads/comics";

export default function Saved() {
  const { mangaList } = useMangaStorage();

  const router = useRouter();

  const chapterChangeBuilder = (chapterNum: string, manga_name: string) => {
    router.navigate({
      to: ChapterRoute.fullPath,
      params: { manga_name, chapter_num: chapterNum },
    });
  };

  return (
    <>
      <TabTitle title="Saved" />
      <Navbar />
      <main className={style.Container}>
        <h1 className={style.Heading}>Saved Manga</h1>

        <div className={style.MangaList}>
          {mangaList.length === 0 ? (
            <div className={style.NotFound}>No saved found</div>
          ) : (
            <>
              {mangaList.map((item) => (
                <div key={item.id} className={style.Item}>
                  <div className={style.MangaInfo}>
                    <img
                      src={`${IMG_DOMAIN}/${item.cover}`}
                      alt="manga thumbnail"
                    />
                    <div className={style.TextInfo}>
                      <h2 className={style.Title}>{item.title}</h2>
                      <div className={style.Controls}>
                        <p className={style.Chapter}>
                          Last read chapter: {item.chapter}
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            chapterChangeBuilder(item.chapter, item.title)
                          }
                          className={style.ViewButton}
                        >
                          <Eye className={style.ViewButtonIcon} />
                        </button>
                      </div>
                      {/* <p>
                        Latest reading time: {convertToLocalDateTime(item.date)}
                      </p> */}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </main>
    </>
  );
}
