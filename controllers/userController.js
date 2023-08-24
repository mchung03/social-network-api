const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

module.exports = {
    // get all users
    async getUsers(req, res) {
        try{
            const users = await User.find();
            res.json(users);
        } catch(err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // get a single user by id and populated thought and friend data
    async getSingleUser(req, res) {
        try{
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json({
                user
            });
        } catch(err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // post new user
    async createUser(req, res) {
        try{
            const user = await User.create(req.body);
            res.json(user);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    // put update user by id
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if(!user) {
                return res.status(404).json({ message: 'No user with this ID exists' });
            }

            res.json(user);
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // delete user by id
    async deleteUser(req, res) {
        try{
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if(!user) {
                return res.status(404).json({ message: 'No user exists'});
            }

            const thoughts = await Thoughts.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { users: req.params.userId }},
                { new: true }
            );

            if(!thoughts) {
                return res.status(404).json({
                    message: 'User deleted, but no courses found',
                });
            }

            res.json({ message: 'User successfully deleted' });
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // post add new friend to friend list
    async addFriend(req, res) {
        console.log('You are adding a friend');
        console.log(req.body);

        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body }},
                { runValidators: true, new: true }
            );

            if(!user) {
                return res
                    .status(404)
                    .json({ message: 'No user found with that ID'});
            }

            res.json(user);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    // delete remove friend from friend list
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: { friendId: req.params.friendId }}},
                { runValidators: true, new: true }
            );

            if(!user) {
                return res
                    .status(404)
                    .json({ message: 'No user found with that ID' });
            }

            res.json(user);
        } catch(err) {
            res.status(500).json(err);
        }
    },
};