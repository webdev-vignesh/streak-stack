const Habit = require("../models/habitModel");
const asyncHandler = require('express-async-handler')

// get all habits
const getAllHabits = asyncHandler (async(req, res) => {
    console.log(email);
    const email = decodeURIComponent(req.query.email);
    console.log(email);
    try {
        const habits = await Habit.find({"email": email});
        console.log(habits)
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
        console.log(req.body)
        res.status(200).json(habits);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// update a habit record
const updateHabit = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const habit = await Habit.findById(id);
        
        if (!habit) {
            res.status(404);
            throw new Error(`Cannot find any records with ID ${id}`);
        }
        
        const currentDate = new Date().toISOString().split('T')[0];
        const latestHistoryEntry = habit?.habitHistory[habit?.habitHistory?.length - 1];
        const latestHistoryDate = latestHistoryEntry?.date
      ? new Date(latestHistoryEntry.date).toISOString().split('T')[0]
      : null;

        // Calculate the difference in days between currentDate and latestHistoryDate
        const daysDifference = latestHistoryDate 
        ? Math.floor((new Date(currentDate) - new Date(latestHistoryDate)) / (1000 * 60 * 60 * 24))
        : null;

        // calculate the month difference between current month and latestHistoryDate
        const currentMonth = new Date().getMonth() + 1 ;
      
        // for Daily frequency value
        if(habit.frequency === "Daily") {
          if (latestHistoryEntry?.date?.toISOString()?.split('T')[0] === currentDate) {
            if (latestHistoryEntry.status === updatedData.status) {
              return res.status(200).json({ message: 'Count remains the same.' });
            } else {
                // Update the status of the latestHistoryEntry
                latestHistoryEntry.status = updatedData.status;
    
                // Update the count based on the new status
                if (updatedData.status === true) {
                    habit.count += 1;
                } else if (updatedData.status === false && habit.count > 0) {
                    habit.count -= 1;
                }
            }
          } else {
            // It's a new day, so add a new entry to habitHistory
            habit.habitHistory.push({ date: currentDate, status: updatedData.status });
            // Update the count based on the new status
            if (updatedData.status === true) {
                habit.count += 1;
            } else if (updatedData.status === false && habit.count > 0) {
                habit.count -= 1;
            }
          }    
        }
        else if(habit.frequency === "Weekly"){
            // new entry
            if( daysDifference === null){
                // if it's the first ever record, add a new entry to habitHistory
                habit.habitHistory.push({ date: currentDate, status: updatedData.status });
                // Update the count based on the new status
                if (updatedData.status === true) {
                    habit.count += 1;
                } else if (updatedData.status === false && habit.count > 0) {
                    habit.count -= 1;
                }
            } else if(daysDifference >= 6) {
                // if it's more than a week
                if (updatedData.status === true) {
                    habit.count += 1;
                } else if (updatedData.status === false && habit.count > 0) {
                    habit.count -= 1;
                }
            } 
            // if it's less than a week and user wants to change status
            else if((daysDifference < 6) && (habit.habitHistory[habit.habitHistory.length - 1].status !== updatedData.status)) {
                if (updatedData.status === true) {
                    habit.habitHistory[habit.habitHistory.length - 1].status = true;
                    habit.count += 1;
                } else if (updatedData.status === false && habit.count > 0) {
                    habit.habitHistory[habit.habitHistory.length - 1].status = false;
                    habit.count -= 1;
                }
            }
        }
        else if(habit.frequency === "Monthly"){
            // no record of current month, so add new entry
            if (latestHistoryDate == null){
                habit.habitHistory.push({ date: currentDate, status: updatedData.status });
                // Update the count based on the new status
                if (updatedData.status === true) {
                    habit.count += 1;
                } else if (updatedData.status === false && habit.count > 0) {
                    habit.count -= 1;
                }
            } 
            // if its a new month
            else if(parseInt(latestHistoryDate?.split("-")[1]) < currentMonth ) {
                if (updatedData.status === true) {
                    habit.count += 1;
                } else if (updatedData.status === false && habit.count > 0) {
                    habit.count -= 1;
                }
            }
            // if it is the same month and user wants to change the status
            else if (parseInt(latestHistoryDate?.split("-")[1]) === currentMonth && (habit.habitHistory[habit.habitHistory.length - 1].status !== updatedData.status)) {
                if (updatedData.status === true) {
                    habit.habitHistory[habit.habitHistory.length - 1].status = true;
                    habit.count += 1;
                } else if (updatedData.status === false && habit.count > 0) {
                    habit.habitHistory[habit.habitHistory.length - 1].status = false;
                    habit.count -= 1;
                }
            }
        };

        // Save the updated habit record
        await habit.save();
        res.status(200).json(habit);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});
  

// delete a habit record
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
