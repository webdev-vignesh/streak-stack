const express = require("express");
const Habit = require("../models/habitModel");

const router = express.Router();

// get all habits
router.get("/habitRecords", async(req, res) => {
    try {
        const habits = await Habit.find({});
        res.status(200).json(habits);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// get a habit with id
router.get("/habitRecords/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const habits = await Habit.findById(id);
        res.status(200).json(habits);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// add a new habit record
router.post('/habitRecords', async(req, res) => {
    try {
        const habits = await Habit.create(req.body)
        res.status(200).json(habits);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a new habit record
router.put('/habitRecords/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const habits = await Habit.findByIdAndUpdate(id, req.body)
        // if data with given id not found
        if(!habits){
            return res.send(404).json({message: `cannot find any record with ${id}`});
        }
        const updatedHabit = await Habit.findById(id);
        res.status(200).json(updatedHabit);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// delete a new habit record
router.delete('/habitRecords/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const habits = await Habit.findByIdAndDelete(id);
        // if data with given id not found
        if(!habits){
            return res.send(404).json({message: `cannot find any record with ${id}`});
        }
        res.status(200).json(habits);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

module.exports = router;
