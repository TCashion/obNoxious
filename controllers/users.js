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

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ err: 'Invalid credentials!' });
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch) {
                const token = createJWT(user);
                res.json({ token });
            } else {
                return res.status(400).json({ err: 'Invalid credentials!' });
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
}

async function updatePassword(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ err: 'Invalid credentials!' });
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && (req.body.newPassword === req.body.passwordConf) ) {
                saveNewPassword(user, req, res)
                // res.status(201).json(user);
            } else {
                return res.status(400).json({ err: 'Invalid credentials!' });
            }
        });
    } catch (err) {
        res.status(400).json(err);
    }
}


/*----- Helper Functions -----*/
function createJWT(user) {
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}

async function saveNewPassword(user, req, res) {
    user.password = req.body.newPassword;
    try {
        user.save();
        const token = createJWT(user);
        res.status(201).json({token});
    } catch (err) {
        return res.status(400).json({ err: 'Invalid credentials!' });
    }
}

module.exports = {
    signup,
    login,
    updatePassword
};