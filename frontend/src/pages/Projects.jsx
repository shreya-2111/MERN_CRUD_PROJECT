import { useEffect, useMemo, useState } from "react";
import { Plus, Search, SlidersHorizontal, LoaderCircle } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import { getProjects, createProject, updateProject, deleteProject } from "../api/projectApi";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProjects = async () => {
    try {
      setLoading(true);
      const { data } = await getProjects();
      setProjects(data);
      setError("");
    } catch {
      setError("Cannot connect to the server. Check that MongoDB and the backend are running.");
    } finally { setLoading(false); }
  };

  useEffect(() => { loadProjects(); }, []);

  const filtered = useMemo(() => projects.filter(p => {
    const matchesSearch = `${p.name} ${p.location}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (category === "All" || p.category === category);
  }), [projects, search, category]);

  const save = async (data) => {
    if (editing) await updateProject(editing._id, data);
    else await createProject(data);
    await loadProjects();
  };

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try { await deleteProject(id); await loadProjects(); }
    catch { setError("Unable to delete project. Please try again."); }
  };

  const openAdd = () => { setEditing(null); setModal(true); };
  const openEdit = (project) => { setEditing(project); setModal(true); };

  return (
    <main className="projects-page">
      <section className="page-heading">
        <div><span className="eyebrow">THE CREATIVE COLLECTION</span><h1>Our <em>projects.</em></h1><p>A collection of spaces, ideas and thoughtful details.</p></div>
        <button className="button primary" onClick={openAdd}><Plus size={18} /> Add project</button>
      </section>
      <section className="stats-row">
        <div><strong>{projects.length.toString().padStart(2, "0")}</strong><span>TOTAL PROJECTS</span></div>
        <div><strong>{new Set(projects.map(p => p.category)).size.toString().padStart(2, "0")}</strong><span>DESIGN CATEGORIES</span></div>
        <div><strong>{projects.filter(p => p.location).length.toString().padStart(2, "0")}</strong><span>LOCATIONS</span></div>
      </section>
      <section className="toolbar">
        <div className="search-box"><Search size={18} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects or locations..." /></div>
        <div className="filter-box"><SlidersHorizontal size={16} /><select value={category} onChange={e => setCategory(e.target.value)}><option>All</option>{["Living Room", "Bedroom", "Kitchen", "Office", "Bathroom", "Other"].map(c => <option key={c}>{c}</option>)}</select></div>
      </section>
      {error && <div className="error-banner">{error}</div>}
      {loading ? <div className="loading"><LoaderCircle className="spin" /> Loading projects...</div> :
        filtered.length ? <section className="project-grid">{filtered.map(project => <ProjectCard key={project._id} project={project} onEdit={openEdit} onDelete={remove} />)}</section> :
        <div className="empty-state"><span>✳</span><h3>{projects.length ? "No matching projects" : "Your collection starts here."}</h3><p>{projects.length ? "Try another search or category." : "Add your first interior design project to get started."}</p>{!projects.length && <button className="button primary" onClick={openAdd}><Plus size={17} /> Add first project</button>}</div>
      }
      <div className="results-note">SHOWING {filtered.length} OF {projects.length} PROJECTS</div>
      {modal && <ProjectForm project={editing} onClose={() => setModal(false)} onSave={save} />}
    </main>
  );
}
