const { Thought } = require('../models');

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    // get single thought by id
    async getSingleThought(req, res) {
        try{
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');

            if(!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    // post create new thought
    async createThought(req, res) {
        try{
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch(err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // put update thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if(!thought) {
                res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    // delete remove thought by id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if(!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
            }

            await Thought.deleteMany({ _id: { $in: thought.users }});
            res.json({ message: 'Thoughts and users deleted '});
        } catch(err) {
            res.status(500).json(err);
        }
    },

    // post create reaction stored in single thought's reaction array
    // delete pull/remove reaction by reactionId value
};