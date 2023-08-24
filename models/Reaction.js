const mongoose = require('mongoose')

const reactionSchema = new mongoose.Schema({
    // reactionId: mongoose objectid data type
    reactionBody: { type: String, required: true, maxLength: 280 },
    username: { type: String, required: true },
    createdAt: { type: String, default: Date.now }
})

module.exports = Reaction