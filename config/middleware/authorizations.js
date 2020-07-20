const jwt = require('jsonwebtoken');

module.exports = {
    checkUserLoggedIn, 
    extractUserFromToken,
    checkUserIsCreator
};

function checkUserLoggedIn(req, res, next) {
    if (req.user) return next();
    return res.status(501).json({msg: 'Not Authorized'});
};

function checkUserIsCreator(req, res, next) {
    if (req.body.user._id === req.user._id) return next();
    return res.status(501).json({msg: 'Not Authorized'});
};

function extractUserFromToken(req, res, next) {
    let token = req.get('Authorization') || req.query.token || req.body.token;
    if (token) {
        token = token.replace('Bearer ', '');
        jwt.verify(token, process.env.SECRET, function(err, decodedToken) {
            if (err) {
                next(err);
            } else {
                req.user = decodedToken.user; 
                next()
            }
        })
    } else {
        next();
    }
};