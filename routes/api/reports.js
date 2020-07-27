const router = require('express').Router(); 
const reportsCtrl = require('../../controllers/reports');
const authorizations = require('../../config/middleware/authorizations');


/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.get('/', authorizations.checkUserLoggedIn, reportsCtrl.index)
router.post('/', authorizations.checkUserLoggedIn, reportsCtrl.create)
router.put('/', authorizations.checkUserLoggedIn, authorizations.checkUserIsCreator, reportsCtrl.update)
router.delete('/', authorizations.checkUserLoggedIn, authorizations.checkUserIsCreator, reportsCtrl.deleteOne)


module.exports = router; 
