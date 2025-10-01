import Navbar from "@/components/Navbar/Navbar";
import style from "./Index.module.scss";
import TabTitle from "@/components/TabTitle/TabTitle";
import { useLatest } from "@/libs/manga/hooks/useLatest";
import MangaCard from "@/components/MangaCard/MangaCard";
import { useState } from "react";
import Loading from "@/components/Loading/Loading";

export default function Index() {
  const [filter, setFilter] = useState("latest");
  const { data: latestMangas, isLoading } = useLatest(filter);

  return (
    <>
      <TabTitle title="Home" />
      <Navbar />
      <main className={style.PageContainer}>
        <div className={style.HeroSection}>
          <div className={style.HeroLeft}></div>
          <div className={style.HeroRight}></div>
          <div className={style.HeroText}>
            <h1 className={style.Heading}>inku</h1>
            <h2 className={style.SubHeading}>
              Your reading companion for a world of mangas and comics
            </h2>
          </div>
        </div>

        <section className={style.Content}>
          <div className={style.Section}>
            <div className={style.SectionHeader}>
              <div className={style.Title}>New list</div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={style.Filter}
              >
                <option value="truyen-moi">Latest Releases</option>
                <option value="sap-ra-mat">Upcoming</option>
                <option value="dang-phat-hanh">Trending Now</option>
                <option value="hoan-thanh">Finished</option>
              </select>
            </div>
            {isLoading ? (
              <Loading />
            ) : (
              <div className={style.List}>
                {latestMangas?.data.items.map((manga) => (
                  <MangaCard key={manga._id} manga={manga} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
