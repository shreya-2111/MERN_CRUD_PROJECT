import { useEffect, useState } from "react";
import { X } from "lucide-react";

const empty = { name: "", category: "Living Room", description: "", budget: "", location: "", imageUrl: "" };

export default function ProjectForm({ project, onClose, onSave }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(project ? {
      name: project.name, category: project.category, description: project.description,
      budget: project.budget, location: project.location, imageUrl: project.imageUrl || ""
    } : empty);
  }, [project]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.description.trim() || !form.location.trim() || form.budget === "") {
      setError("Please complete all required fields.");
      return;
    }
    if (Number(form.budget) < 0) {
      setError("Budget cannot be negative.");
      return;
    }
    try {
      await onSave({ ...form, budget: Number(form.budget) });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section className="modal">
        <div className="modal-head">
          <div><span className="eyebrow">PROJECT DETAILS</span><h2>{project ? "Edit project" : "Add new project"}</h2></div>
          <button className="close-button" onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={submit}>
          <label>Project name *<input name="name" value={form.name} onChange={change} placeholder="e.g. Serene Living Room" /></label>
          <div className="form-row">
            <label>Category *<select name="category" value={form.category} onChange={change}>
              {["Living Room", "Bedroom", "Kitchen", "Office", "Bathroom", "Other"].map(x => <option key={x}>{x}</option>)}
            </select></label>
            <label>Budget (₹) *<input name="budget" type="number" min="0" value={form.budget} onChange={change} placeholder="500000" /></label>
          </div>
          <label>Location *<input name="location" value={form.location} onChange={change} placeholder="Ahmedabad, Gujarat" /></label>
          <label>Description *<textarea name="description" rows="3" value={form.description} onChange={change} placeholder="Describe the design concept..." /></label>
          <label>Image URL<input name="imageUrl" value={form.imageUrl} onChange={change} placeholder="https://example.com/interior.jpg" /></label>
          {error && <p className="form-error">{error}</p>}
          <div className="modal-actions"><button type="button" className="button secondary" onClick={onClose}>Cancel</button><button className="button primary" type="submit">{project ? "Save changes" : "Create project"}</button></div>
        </form>
      </section>
    </div>
  );
}
