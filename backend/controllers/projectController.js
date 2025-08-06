const Project = require('../models/projectModel');

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching projects", error: error.message });
  }
};

// Add a new project
exports.addProject = async (req, res) => {
  try {
    const { title, description, techStack, link } = req.body;
    const newProject = new Project({ title, description, techStack, link });
    await newProject.save();
    res.status(201).json({ message: "✅ Project added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error adding project", error: error.message });
  }
};
