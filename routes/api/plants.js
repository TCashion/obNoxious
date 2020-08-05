const router = require('express').Router(); 
const plantsCtrl = require('../../controllers/plants');
const authorizations = require('../../config/middleware/authorizations');

/*---------- Public Routes ----------*/
router.get('/', plantsCtrl.index);
router.get('/:id', plantsCtrl.getOne);

/*---------- Protected Routes ----------*/
router.post('/', authorizations.checkUserLoggedIn, plantsCtrl.create)

module.exports = router; 
