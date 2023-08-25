const mongoose = require('mongoose');
const moment = require('moment')

const reactionSchema = new mongoose.Schema({
    reactionId: { type: mongoose.Schema.Types.ObjectId, 
        default: () => {
        return new mongoose.Types.ObjectId()
    }},
    reactionBody: { type: String, required: true, maxLength: 280 },
    username: { type: String, required: true },
    createdAt: { type: String, default: Date.now, get: (date) => {
        return moment(date).format('MMMM Do YYYY, h:mm');
    }}
},
{
    toJSON: {
        getters: true
    }
})

module.exports = reactionSchema;