const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    const data = db.collection("sample").find().toArray();
    res.json(data);
