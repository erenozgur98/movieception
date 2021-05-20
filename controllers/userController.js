const db = require('../models');

const getUser = async (req, res) => {
    try {
        const users = await db.User.find();

        res.status(200).json(users);
    } catch(err) {
        res.status(404).json({ message: err.message })
    }
}

const createUser = async (req, res) => {
    const user = req.body;

    const newUser = new db.User(user)
    try {
        await newUser.save();

        res.status(201).json(newUser);
    } catch(err) {
        res.status(409).json({ message: err.message })
    }
}

module.exports = getUser, createUser;