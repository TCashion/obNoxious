const router = require('express').Router(); 
const reportsCtrl = require('../../controllers/reports');
const authorizations = require('../../config/middleware/authorizations');


/*---------- Public Routes ----------*/
router.get('/', reportsCtrl.index)

/*---------- Protected Routes ----------*/
router.post('/', authorizations.checkUserLoggedIn, reportsCtrl.create)
router.delete('/', authorizations.checkUserLoggedIn, authorizations.checkUserIsCreator, reportsCtrl.deleteOne)


module.exports = router; 
