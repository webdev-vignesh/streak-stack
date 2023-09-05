const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    const data = db.collection("habitsData").find().toArray();
    res.json(data);
<<<<<<< HEAD
})
=======
})
>>>>>>> 1e961376259e266331cc44fed9da050acbf05fdd
