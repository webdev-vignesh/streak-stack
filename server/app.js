const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');
const Habit = require("./models/habitModel");
const cors = require("cors");
// const habitRouter = require("./routes/habitRoutes");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());


// get all habits
app.get("/api/habitRecords", async(req, res) => {
    try {
        const habits = await Habit.find({});
        res.status(200).json(habits);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// get a habit with id
app.get("/api/habitRecords/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const habits = await Habit.findById(id);
        res.status(200).json(habits);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// add a new habit record
app.post('/api/habitRecords', async(req, res) => {
    try {
        const habits = await Habit.create(req.body)
        res.status(200).json(habits);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a new habit record
app.put('/api/habitRecords/:id', async(req, res) => {
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
app.delete('/api/habitRecords/:id', async(req, res) => {
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


// connecting to mongodb from local server
connectDb()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
})
.catch((error) => {
    console.log(error);
})

