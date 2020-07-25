const router = require('express').Router(); 
const notesCtrl = require('../../controllers/notes');
const authorizations = require('../../config/middleware/authorizations');


/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.post('/', authorizations.checkUserLoggedIn, authorizations.checkUserIsCreator, notesCtrl.create)
router.delete('/', authorizations.checkUserLoggedIn, authorizations.checkUserIsCreator, notesCtrl.deleteOne)

module.exports = router; 



