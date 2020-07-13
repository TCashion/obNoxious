const User = require('../models/user');
const jwt = require('jsonwebtoken');

async function signup(req, res) {
    const user = new User(req.body);
    try {
        await user.save();
        const token = createJWT(user);
        res.json({ token });
    } catch (err) {
        res.status(400).json(err);
    }
}


/*----- Helper Functions -----*/
function createJWT(user) {
    user = JSON.stringify(user);
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}


module.exports = {
    signup,
};