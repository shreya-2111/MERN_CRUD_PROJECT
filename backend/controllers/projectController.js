const Project = require("../models/Project");

// READ: Get all projects, with optional search and category filters
exports.getProjects = async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } }
      ];
    }
    if (category && category !== "All") filter.category = category;
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch projects", error: error.message });
  }
};

// READ: Get one project
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: "Invalid project ID" });
  }
};

// CREATE: Add a project
exports.createProject = async (req, res) => {
  try {
    const { name, category, description, budget, location, imageUrl } = req.body;
    if (!name || !category || !description || budget === undefined || !location) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }
    const project = await Project.create({ name, category, description, budget, location, imageUrl });
    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    res.status(400).json({ message: "Could not create project", error: error.message });
  }
};

// UPDATE: Edit a project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ message: "Project updated successfully", project });
  } catch (error) {
    res.status(400).json({ message: "Could not update project", error: error.message });
  }
};

// DELETE: Remove a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Could not delete project", error: error.message });
  }
};
