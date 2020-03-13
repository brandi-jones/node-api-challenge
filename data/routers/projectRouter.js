const express = require('express');

const Projects = require("../helpers/projectModel.js");

const router = express.Router();

//get all projects
router.get('/', (req, res) => {
    Projects.get()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json({error: "Projects could not be retrieved"})
        })

})

//get project by id
router.get('/:id', async (req, res) => {
    try {
        const project = await Projects.get(req.params.id);
        if (project) {
            res.status(200).json(project)
        }
        else {
            res.status(400).json({message: "Project does not exist"})
        }
    }
    catch (err) {
        res.status(500).json({error: "Project could not be retrieved", err})
    }
})

//POST create project
router.post('/', (req, res) => {
    Projects.insert(req.body)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(error => {
            res.status(500).json({error: "Error creating project"})
        })
})

//PUT update a project
router.put('/:id', async (req, res) => {
    try {
        const updatedProject = await Projects.update(req.params.id, req.body)

        if (updatedProject) {
            res.status(201).json(updatedProject)
        }
        else {
            res.status(404).json({message: `Project with id ${req.params.id} could not be found`})
        }
    }
    catch (err) {
        res.status(500).json({error: "Project could not be updated", err})
    }
})

//DELETE a project
router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
        .then(response => {
            console.log(response)
            if (response) { //if response > 0 because the .remove returns the count of projects deleted
                res.status(200).json({message: `Project with id ${req.params.id} has been deleted successfully`})
            }
            else {
                res.status(404).json({message: `Project with id ${req.params.id} could not be found`}) 
            }
        })
        .catch(response => {
            res.status(500).json({error: "Project could not be deleted", err})
        })
})

module.exports = router;