import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";

function NotFound() {
  return <main className="not-found"><span className="eyebrow">404 — PAGE NOT FOUND</span><h1>Looks like this<br /><em>space is empty.</em></h1><a className="button primary" href="/">Back to home</a></main>;
}

export default function App() {
  return <><Navbar /><Routes><Route path="/" element={<Home />} /><Route path="/projects" element={<Projects />} /><Route path="*" element={<NotFound />} /></Routes><footer><span>interior<span className="footer-accent">studio.</span></span><small>© 2026 INTERIORSTUDIO · DESIGNED WITH INTENTION</small><a href="#top">BACK TO TOP ↑</a></footer></>;
}
