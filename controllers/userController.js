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
    try {
        const user = await db.User.findOne({ where: { username: req.body.username }})
        console.log(user);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}

module.exports = getUser, createUser;