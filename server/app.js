const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv').config();

const connectDb = require('./config/dbConnection');
const habitRoute = require("./routes/habitRoute");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// middleware for routes
app.use('/api/habitRecords', habitRoute);

// connecting to mongodb from local server
connectDb()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch((error) => {
    console.log(error);
})

