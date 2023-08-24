const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const User = model('User', userSchema);

User
    .create({
        username: 'mchung03',
        email: 'm@gmail.com',
    },
    {
        username: 'jimmy',
        email: 'j@gmail.com'
    })
    .then(result => console.log('Created new user', result))
    .catch(err => handleError(err));

module.exports = User;
