import { Link } from "@tanstack/react-router";
import navbarData from "@/db/navbar.json";
import Logo from "../Logo/Logo";
import style from "./Navbar.module.scss";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={style.Navbar}>
      <Logo />

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
