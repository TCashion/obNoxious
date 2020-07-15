const { modelName } = require("../../models/plant");

module.exports = {
    checkAuth, 
    protectRoutes
};

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(501).json({msg: 'Not Authorized'});
};

function protectRoutes(req, res, next) {
    console.log('PROTECTING ROUTES')
};