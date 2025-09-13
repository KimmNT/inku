import Navbar from "@/components/Navbar/Navbar";
import { MangaSearchResultRoute } from "@/routeRegistry";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import style from "./MangaSearch.module.scss";

export default function MangaSearch() {
  const [mangaTitle, setMangaTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <Navbar />
      <main className={style.Container}>
        <h1 className={style.Heading}>Search your manga</h1>
        <input
          ref={inputRef}
          type="text"
          value={mangaTitle}
          onChange={(e) => setMangaTitle(e.target.value)}
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
