import express from "express";
import cors from 'cors';
const { connectToDB } = require('./db');

const app = express();
const port: number = 3001;

app.use(cors());
app.use(express.json());

connectToDB()
    .then((db: any) => {
        // Set up your routes and other app logic here
        app.get("/api/habitRecords", async (req, res) => {
            try{
                const db = await connectToDB();
                const data = await db.collection("habitsData").find().toArray();
                res.json(data);
            } catch(error) {
                console.error("Error fetching items:", error);
                res.status(500).json({error: "Internal server error"})
            }
        })

        app.post("/api/habitRecords", async(req, res) => {
            try{
                const db = await connectToDB();
                const newHabit = req.body;
                const result = await db.collection("habitsData").insertOne(newHabit);
                res.status(200).json({text: "Record added successfully"}); 
            } catch(error) {
                console.error("Error creating record:", error);
                res.status(500).json({error: "Internal server error"});
            }
        })

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
    });
    })
    .catch((error: any) => {
        console.error("App startup failed:", error);
    });

// app.get("/", (req, res) => {
//     res.send("Basic setup done");
// })

// app.listen(port, () => {
//     console.log("Server is runnng on port ", port);
// })