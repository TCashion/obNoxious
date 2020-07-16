const jwt = require('jsonwebtoken');

module.exports = {
    checkAuth, 
    protectRoutes
};

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(501).json({msg: 'Not Authorized'});
};

function protectRoutes(req, res, next) {
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