const Habit = require("../models/habitModel");
const asyncHandler = require('express-async-handler')

// get all habits
const getAllHabits = asyncHandler (async(req, res) => {
    try {
        const habits = await Habit.find({});
        res.status(200).json(habits);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// get a single habit with id
const getHabitWithId = asyncHandler (async(req, res) => {
    try {
        const {id} = req.params;
        const habits = await Habit.findById(id);
        // if data with given id not found
        if(!habits){
            res.status(404);
            throw new Error(`cannot find any records with ID ${id}`);
        }
        res.status(200).json(habits);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// create a new habit record
const createHabit = asyncHandler (async(req, res) => {
    try {
        const habits = await Habit.create(req.body);
        res.status(200).json(habits);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// update a new habit record
const updateHabit = asyncHandler (async(req, res) => {
    try {
        const {id} = req.params;
        const habits = await Habit.findByIdAndUpdate(id, req.body)
        // if data with given id not found
        if(!habits){
            res.status(404);
            throw new Error(`cannot find any records with ID ${id}`);
        }
        const updatedHabit = await Habit.findById(id);
        res.status(200).json(updatedHabit);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// delete a new habit record
const deleteHabit = asyncHandler (async(req, res) => {
    try {
        const {id} = req.params;
        const habits = await Habit.findByIdAndDelete(id);
        // if data with given id not found
        if(!habits){
            res.status(404);
            throw new Error(`cannot find any records with ID ${id}`);
        }
        res.status(200).json(habits);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

module.exports = { 
    getAllHabits,
    getHabitWithId,
    createHabit,
    updateHabit,
    deleteHabit
};