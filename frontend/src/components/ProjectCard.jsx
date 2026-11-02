import { MapPin, Pencil, Trash2, ArrowUpRight } from "lucide-react";

const fallback = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85";

export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <article className="project-card">
      <div className="project-image">
        <img src={project.imageUrl || fallback} alt={project.name}
          onError={(e) => { e.currentTarget.src = fallback; }} />
        <span className="category-tag">{project.category}</span>
      </div>
      <div className="project-info">
        <div className="project-heading">
          <h3>{project.name}</h3>
          <span className="arrow-icon"><ArrowUpRight size={18} /></span>
        </div>
        <p className="location"><MapPin size={14} /> {project.location}</p>
        <p className="description">{project.description}</p>
        <div className="card-bottom">
          <div><small>ESTIMATED BUDGET</small><strong>₹{Number(project.budget).toLocaleString("en-IN")}</strong></div>
          <div className="card-actions">
            <button className="icon-button edit" onClick={() => onEdit(project)} aria-label="Edit project"><Pencil size={16} /></button>
            <button className="icon-button delete" onClick={() => onDelete(project._id)} aria-label="Delete project"><Trash2 size={16} /></button>
          </div>
        </div>
      </div>
    </article>
  );
}
