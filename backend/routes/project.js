const express = require('express');
const router = express.Router();
const { getProjects, addProject } = require('../controllers/projectController');

router.get('/', getProjects);  // Fetch all projects
router.post('/', addProject);  // Add new project

module.exports = router;
