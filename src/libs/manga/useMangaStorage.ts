import { useState, useEffect } from "react";

export function useMangaStorage() {
  const [mangaList, setMangaList] = useState<
    { id: string; title: string; cover: string; chapter: string }[]
  >([]);

  // ✅ Load saved mangas when component mounts
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("manga") || "[]");
    setMangaList(stored);
  }, []);

  const addManga = (manga: {
    id: string;
    title: string;
    cover: string;
    chapter: string;
  }) => {
    const updated = [...mangaList];
    const existingIndex = updated.findIndex((m) => m.id === manga.id);

    if (existingIndex >= 0) {
      updated[existingIndex] = manga; // update
    } else {
      updated.push(manga); // add
    }

    setMangaList(updated);
    localStorage.setItem("manga", JSON.stringify(updated));
  };

  return { mangaList, addManga };
}
