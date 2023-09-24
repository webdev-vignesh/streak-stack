const razorpay = require("razorpay");
const dotenv = require("dotenv");
const crypto = require("crypto");
const asyncHandler = require('express-async-handler')

dotenv.config();

const KEY_ID = process.env.KEY_ID;
const KEY_SECRET = process.env.KEY_SECRET;

const order = asyncHandler( async(req, res) => {
    try {
        let instance = new razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET })

        let options = {
            amount: req.body.amt * 100,
            currency: "INR"
        }

        instance.orders.create(options, function (err, order) {
            if (err) {
                return res.status(500).json({ error: "Server error" })
            } else {
                return res.status(201).json({ success: "order created", data: order })
            }
        })
    } catch (error) {
        res.status(500).json(error, "error while calling orders api")
    }

})

const verify = asyncHandler( async (req, res) => {
    try {
        let body = req.body.res.razorpay_order_id + "|" + req.body.res.razorpay_payment_id;

        var expectedSignature = crypto.createHmac('sha256', process.env.KEY_SECRET)
        .update(body.toString())
        .digest('hex');
        
        if (expectedSignature === req.body.res.razorpay_signature) {
            res.send({ code: 200, message: 'Sign Valid', });
        } else {

            res.send({ code: 500, message: 'Sign Invalid' });
        }
    } catch (error) {
        res.status(500).json(error, "error while calling verifyPayment api")
    }
})


module.exports = {
    order,
    verify,
}