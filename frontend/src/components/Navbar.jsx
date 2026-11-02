import { NavLink } from "react-router-dom";
import { Armchair } from "lucide-react";

export default function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="brand"><span className="brand-icon"><Armchair size={21} /></span> interior<span>studio.</span></NavLink>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/projects">Projects</NavLink>
      </nav>
      <a className="nav-cta" href="/projects">Manage projects <span>↗</span></a>
    </header>
  );
}
