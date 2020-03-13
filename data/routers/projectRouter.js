const express = require('express');

const Projects = require("../helpers/projectModel.js");
const Actions = require("../helpers/actionModel.js");

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

//GET a specific project's actions
router.get('/:id/actions',  async (req, res) => {
    try {
        const project = await Projects.get(req.params.id); //attempt to get the project to ensure it exists

        if (project) {
            const actions = await Projects.getProjectActions(req.params.id);
            res.status(200).json(actions);
        } else {
            res.status(404).json({message: `Project with id ${req.params.id} could not be found`}) 
        }

    }
    catch(err) {
        res.status(500).json({error: "Project's actions could not be retrieved"})
    }
    
})

//POST a new action to a specific project
router.post('/:id/actions', validateProjectId, (req, res) => {
    req.body.project_id = req.params.id; //set project_id to action to associate it with a specific project
    Actions.insert(req.body)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(error => {
            res.status(500).json({error: "Action could not be created"})
        })
})


//custom middleware

//validate project id -- using for POST of an action to a specific project to ensure project requested exists
async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id);
        
        if (project) {
            next();
        }
        else {
            res.status(404).json({message: `Project with id ${req.params.id} could not be found`})
        }
    }
    catch (err) {
        res.status(500).json({error: "Error retrieving project", err})
    }
}



module.exports = router;