import Navbar from "@/components/Navbar/Navbar";
import { MangaSearchResultRoute } from "@/routeRegistry";
import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import style from "./MangaSearch.module.scss";
import TabTitle from "@/components/TabTitle/TabTitle";

export default function MangaSearch() {
  const [mangaTitle, setMangaTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const searchMangaBuilder = (manga_name: string) => {
    router.navigate({
      to: MangaSearchResultRoute.fullPath,
      params: { manga_name },
    });
  };

  return (
    <>
      <TabTitle title="Manga Search" />
      <Navbar />
      <main className={style.Container}>
        <h1 className={style.Heading}>Search your manga</h1>
        <input
          ref={inputRef}
          type="text"
          value={mangaTitle}
          onChange={(e) => setMangaTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && mangaTitle.trim() !== "") {
              searchMangaBuilder(mangaTitle);
            }
          }}
        />
        <Link
          to={MangaSearchResultRoute.fullPath}
          params={{
            manga_name: mangaTitle,
          }}
          className={style.Button}
        >
          search
        </Link>
      </main>
    </>
  );
}
