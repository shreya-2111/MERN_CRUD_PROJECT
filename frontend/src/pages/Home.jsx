import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles, MoveRight } from "lucide-react";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={14} /> THOUGHTFUL SPACES. BEAUTIFUL LIVING.</span>
          <h1>Spaces that tell<br />your <em>story.</em></h1>
          <p>Explore inspiring interior concepts and manage every design project in one thoughtfully crafted space.</p>
          <Link className="button primary hero-button" to="/projects">Explore projects <ArrowUpRight size={17} /></Link>
          <div className="hero-note"><span className="note-line"></span> DESIGN WITH PURPOSE, LIVE WITH JOY</div>
        </div>
        <div className="hero-visual">
          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90" alt="Warm contemporary living room interior" />
          <div className="image-caption"><span>01 / THE ART OF LIVING</span><strong>Warm minimalism</strong></div>
          <div className="floating-card"><span>✳</span><div><b>Design begins here</b><small>Make room for better living.</small></div></div>
        </div>
      </section>
      <section className="intro-strip">
        <span>OUR PHILOSOPHY</span><p>Good design is more than what you see.<br /><i>It's how a space makes you feel.</i></p>
        <Link to="/projects" className="text-link">View all projects <MoveRight size={17} /></Link>
      </section>
      <section className="home-bottom">
        <div><span className="eyebrow">A SPACE FOR EVERY STORY</span><h2>From the first idea<br />to the final detail.</h2></div>
        <p>Browse your design collection, add new concepts, update project information, and keep your creative work organised.</p>
      </section>
    </main>
  );
}
