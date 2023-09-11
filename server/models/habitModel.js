const mongoose = require("mongoose");

const habitSchema = mongoose.Schema(
    {
        habitName: {
            type: String,
            required: [true, "Please enter the habit name"],
        },
        habitDescription: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
            required: false,
            default: 0,
        },
        goal: {
            type: Number,
            required: true,
        },
        frequency: {
            type: String,
            required: true,
        },
        habitHistory: [
            {
                date: {
                    type: Date,
                    required: true,
                },
                status: {
                    type: Boolean,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true
    }
)

const Habit = mongoose.model("habitData", habitSchema);

module.exports = Habit;
