import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import navbarData from "@/db/navbar.json";
import Logo from "../Logo/Logo";
import style from "./Navbar.module.scss";
import { Menu, Search, X } from "lucide-react";
import { useRef, useState } from "react";
import { MangaSearchResultRoute } from "@/routeRegistry";

export default function Navbar() {
  const { location } = useRouterState();
  const manga_name = location.search.manga_name ?? "";
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(manga_name);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const searchMangaBuilder = (manga_name: string) => {
    router.navigate({
      to: MangaSearchResultRoute.fullPath,
      params: { manga_name },
    });
  };

  return (
    <nav className={style.Navbar}>
      <Logo />

      <div className={style.SearchBox}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchMangaBuilder(inputValue);
            }
          }}
          placeholder="Search manga..."
        />
        <button
          type="button"
          onClick={() => {
            setInputValue("");
            inputRef.current?.focus();
          }}
          className={style.SearchButton}
        >
          <X className={style.SearchButtonIcon} />
        </button>
        <button
          type="button"
          onClick={() => searchMangaBuilder(inputValue)}
          className={style.SearchButton}
        >
          <Search className={style.SearchButtonIcon} />
        </button>
      </div>
      <Menu className={style.MobileIcon} onClick={() => setIsOpen(true)} />
      <div className={style.NavItems}>
        {navbarData.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={style.NavItem}
            activeProps={{
              className: style.Active,
            }}
          >
            {item.title}
          </Link>
        ))}
      </div>

      {isOpen && (
        <div className={style.MobileMenu} onClick={() => setIsOpen(false)}>
          {navbarData.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={style.MobileNavItem}
              activeProps={{
                className: style.Active,
              }}
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
