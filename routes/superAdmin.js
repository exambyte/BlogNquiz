const express = require('express');
const router = express.Router();
const superAdminControllers = require('../controllers/SuperAdmin_controller'); //Controller for and Registration authentication
const Adminauthenticate = require('../middlewares/authenticateAdmin')

//......................Routes for Super Admin.............................

/**
 * Routing to register.ejs
 * @method {GET}
 */
router.get('/registerSuperAdmin', superAdminControllers.register_get);

/**
 * Routing to register
 * @method {POST}
 */
router.post('/registerSuperAdmin', superAdminControllers.register_post);

//......................Routes for Login.....................................

/**
 * Routing to login.ejs
 * @method {GET}
 */
router.get('/loginSuperAdmin', superAdminControllers.login_get);
/**
 * Routing to login
 * @method {POST}
 */
router.post('/loginSuperAdmin', superAdminControllers.login_post);

router.get('/SuperAdminDashboard', Adminauthenticate, superAdminControllers.dashboard_get);

router.get('/addNormalAdmin', Adminauthenticate, superAdminControllers.normalAdmin_get);

router.post('/registerNormalAdmin', Adminauthenticate, superAdminControllers.normalAdmin_post);

module.exports = router;