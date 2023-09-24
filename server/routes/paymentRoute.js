const express = require("express");
const { order, verify } = require("../controllers/paymentController");

const router = express.Router();

// create a new payment
router.post('/order', order);

// verify a payment
router.post('/verify', verify);

module.exports = router;