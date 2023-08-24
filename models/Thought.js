const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: [ reactionSchema ]
})

const Thought = mongoose.model('Thought', thoughtSchema);

const handleError = (err) => console.error(err);

Thought
    .create({
        thoughtText: 'So true! They are adorable',
        username: 'jimmy',
    })
    .then(result => console.log('Created new thoughts', result))
    .catch(err => handleError(err));

module.exports = Thought;