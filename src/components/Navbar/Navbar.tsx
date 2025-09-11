import { Link } from "@tanstack/react-router";

export default function Navbar() {
  return (
    <div>
      <Link to="/">Index</Link>
      <Link to="/manga_search">Search</Link>
    </div>
  );
}
