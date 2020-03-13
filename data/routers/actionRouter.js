const express = require('express');

const Actions = require("../helpers/actionModel.js");

const router = express.Router();

//GET all actions
router.get('/', (req, res) => {
    Actions.get()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json({error: "Actions could not be retrieved"})
        })
})

//GET specific action by id
router.get('/:id', async (req, res) => {
    try {
        const action = await Actions.get(req.params.id);
        if (action) {
            res.status(200).json(action)
        }
        else {
            res.status(400).json({message: "Action does not exist"})
        }
    }
    catch (err) {
        res.status(500).json({error: "Action could not be retrieved", err})
    }
})

//PUT update an action
router.put('/:id', async (req, res) => {
    try {
        const updatedAction = await Actions.update(req.params.id, req.body)
        if (updatedAction) {
            res.status(201).json(updatedAction)
        }
        else {
            res.status(404).json({message: `Action with id ${req.params.id} could not be found`})
        }
    }
    catch (err) {
        res.status(500).json({error: "Action could not be updated", err})
    }
})

//DELETE an action
router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
        .then(response => {
            if (response) { //if response > 0 because the .remove returns the count of actions deleted
                res.status(200).json({message: `Action with id ${req.params.id} has been deleted successfully`})
            }
            else {
                res.status(404).json({message: `Action with id ${req.params.id} could not be found`}) 
            }
        })
        .catch(response => {
            res.status(500).json({error: "Action could not be deleted", err})
        })
})


module.exports = router;