const router = require('express').Router(); 
const featuresCtrl = require('../../controllers/features');
const authorizations = require('../../config/middleware/authorizations');


/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.post('/', authorizations.checkUserLoggedIn, authorizations.checkUserIsCreator, featuresCtrl.create)

module.exports = router; 



