const router = require('express').Router(); 
const usersCtrl = require('../../controllers/users');
const authorizations = require('../../config/middleware/authorizations');

/*---------- Public Routes ----------*/
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

/*---------- Protected Routes ----------*/
router.put('/password', authorizations.checkUserLoggedIn, usersCtrl.updatePassword)

module.exports = router; 
