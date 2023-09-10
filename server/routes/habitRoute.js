const express = require("express");
const { getAllHabits, getHabitWithId, createHabit, updateHabit, deleteHabit } = require("../controllers/habitController");

const router = express.Router();

// get all habits
router.get("/", getAllHabits);

// get a single habit with id
router.get("/:id", getHabitWithId);

// create a new habit record
router.post('/', createHabit)

// update a habit record
router.put('/:id', updateHabit)

// delete a new habit record
router.delete('/:id', deleteHabit)

module.exports = router;