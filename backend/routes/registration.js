var express = require('express');
var router = express.Router();
const Registration = require('../models/registration');

// GET
router.get('/', async function (req, res, next) {
    try {
        // Retrieve number of tickets
        const savedUser = await Registration.find().sort({ 'createdAt': -1 });
        res.json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/stats', async function (req, res, next) {
    try {
        const savedUser = await Registration.aggregate([
            {
                $group: {
                    _id: null,
                    totalNumberOfTickets: { $sum: "$numberOfTickets" },
                    totalProceeds: { $sum: "$totalAmount" }
                }
            }
        ]);
        const totalTransactions = await Registration.count()
        if (savedUser.length) {
            savedUser[0].totalTransactions = totalTransactions;
            res.json(savedUser[0]);
        } else {
            res.json({})
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// POST
router.post('/new-registration', async (req, res) => {
    const user = new Registration({
        change: req.body.change,
        isPendingChange: req.body.isPendingChange,
        notes: req.body.notes,
        numberOfTickets: req.body.numberOfTickets,
        tenderedAmount: req.body.tenderedAmount,
        ticketPrice: req.body.ticketPrice,
        totalAmount: req.body.totalAmount,
    });

    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE
router.delete('/delete-registration/:id', async function (req, res, next) {
    try {
        const savedUser = await Registration.findByIdAndDelete(req.params.id);
        res.json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE
router.put('/update-registration/:id', async function (req, res, next) {
    try {
        const savedUser = await Registration.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



module.exports = router;
