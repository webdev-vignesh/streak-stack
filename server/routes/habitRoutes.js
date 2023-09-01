const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    const data = db.collection("habitsData").find().toArray();
    res.json(data);
})
