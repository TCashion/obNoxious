const router = require('express').Router(); 
const reportsCtrl = require('../../controllers/reports');
const authorizations = require('../../config/middleware/authorizations');


/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.post('/', authorizations.checkAuth, reportsCtrl.create)


module.exports = router; 
