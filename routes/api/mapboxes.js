const router = require('express').Router(); 
const mapBoxesCtrl = require('../../controllers/mapBoxes');
const authorizations = require('../../config/middleware/authorizations');

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.get('/', authorizations.checkUserLoggedIn, mapBoxesCtrl.retreiveMapBoxAccessToken)

module.exports = router; 



