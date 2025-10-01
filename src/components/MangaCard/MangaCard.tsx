import { Eye } from "lucide-react";
import style from "./MangaCard.module.scss";
import { type DataItem } from "@/libs/manga/mangaModel";
import { Link } from "@tanstack/react-router";
import { ChapterRoute } from "@/routeRegistry";

const IMG_DOMAIN = "https://img.otruyenapi.com/uploads/comics";

export default function MangaCard({ manga }: { manga: DataItem }) {
  return (
    <div className={style.MangaCard}>
      <img
        src={`${IMG_DOMAIN}/${manga.thumb_url}`}
        alt="manga thumbnail"
        loading="lazy"
      />
      <div className={style.Info}>
        <div className={style.Heading}>{manga.name}</div>
        <Link
          target="_blank"
          to={ChapterRoute.fullPath}
          params={{
            manga_name: manga.name ?? "",
            chapter_num: "1",
          }}
          className={style.ViewButton}
        >
          <Eye className={style.ViewIcon} />
        </Link>
      </div>
    </div>
  );
}
