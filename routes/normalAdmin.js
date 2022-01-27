const express = require('express');
const router = express.Router();
const normalAdminControllers = require('../controllers/NormalAdmin_controller'); //Controller for and Registration authentication
// const Adminauthenticate = require('../middlewares/authenticateAdmin')

//......................Routes for Login.....................................

/**
 * Routing to login.ejs
 * @method {GET}
 */
router.get('/loginNormalAdmin', normalAdminControllers.login_get);
/**
 * Routing to login
 * @method {POST}
 */
router.post('/loginNormalAdmin', normalAdminControllers.login_post);

router.get('/NormalAdminDashboard', normalAdminControllers.dashboard_get);


module.exports = router;