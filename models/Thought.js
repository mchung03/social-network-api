const mongoose = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment')

const thoughtSchema = new mongoose.Schema({
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: { type: String, default: Date.now, get: (date) => {
        return moment(date).format('MMMM Do YYYY, h:mm');
    }},
    username: { type: String, required: true },
    reactions: [ reactionSchema ]
},
{
    toJSON: {
        getters: true,
        virtuals: true
    }
})

thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        return this.reactions.length
    });

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;