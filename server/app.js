const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');

const habitRouter = require("./routes/habitRoutes");

connectDb();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/habitRecords", habitRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

//     .then((db) => {
//         // get list of habit records
//         app.get("/api/habitRecords", async (req, res) => {
//             try{
//                 const db = await connectToDB();
//                 const data = await db.collection("habitsData").find().toArray();
//                 res.json(data);
//             } catch(error) {
//                 console.error("Error fetching items:", error);
//                 res.status(500).json({error: "Internal server error"})
//             }
//         })
//         // add new habit record
//         app.post("/api/habitRecords", async(req, res) => {
//             try{
//                 const db = await connectToDB();
//                 const newHabit = req.body;
//                 const result = await db.collection("habitsData").insertOne(newHabit);
//                 res.status(200).json({text: "Record added successfully"}); 
//             } catch(error) {
//                 console.error("Error creating record:", error);
//                 res.status(500).json({error: "Internal server error"});
//             }
//         })

//         // update count of a habit record
//         app.put("/api/setCount/:id", async(req, res) => {
//             try{
//                 const { id } = req.params;
//                 const db = await connectToDB();
//                 const updateRecord = req.body;
//                 const result = await db.collection("habitsData").findByIdAndUpdate(id, updateRecord, {new: true,});
//                 if(!result){
//                     return res.status(404).json({ message: 'Record not found' });
//                 }
//                 return res.status(200).json({text: "Record updated successfully"}); 
//             } catch(error) {
//                 return res.status(500).json({ message: 'Error updating record', error });

//             }
//         })


//         app.listen(port, () => {
//             console.log(`Server is running on port ${port}`);
//     });
//     })
//     .catch((error) => {
//         console.error("App startup failed:", error);
//     });
