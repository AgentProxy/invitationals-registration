const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    change: {
        type: Number,
        default: 0
    },
    createdAt: { type: Date, default: Date.now },
    notes: {
        type: String,
        required: false
    },
    numberOfTickets: {
        type: Number,
        default: 1
    },
    isPendingChange: {
        type: Boolean,
        default: false
    },
    tenderedAmount: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    ticketPrice: {
        type: Number,
        default: 150
    },
    updatedAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Registration', registrationSchema);