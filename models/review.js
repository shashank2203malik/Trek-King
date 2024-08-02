const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    opinion: String,
    rating: Number,
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Review', reviewSchema);