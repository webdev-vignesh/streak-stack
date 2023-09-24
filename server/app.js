const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv').config();

const connectDb = require('./config/dbConnection');
const habitRoute = require("./routes/habitRoute");
const paymentRoute = require("./routes/paymentRoute");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// routes
app.use('/api/habitRecords', habitRoute);
app.use('/api/payment', paymentRoute);

app.get("/", (req, res) => {
    throw new Error ("Error occured");
})

// error handling middleware
app.use(errorMiddleware);

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
