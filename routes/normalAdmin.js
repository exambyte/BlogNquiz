const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const normalAdminControllers = require('../controllers/NormalAdmin_controller'); //Controller for and Registration authentication
// const Adminauthenticate = require('../middlewares/authenticateAdmin')

const multer = require('../middlewares/multer')
const normalAdminauthenticate = require('../middlewares/authenticateNormalAdmin')

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

router.get('/NormalAdminDashboard', normalAdminauthenticate, normalAdminControllers.dashboard_get);

router.get('/addBlog', normalAdminauthenticate, normalAdminControllers.addBlog_get);

router.post('/addBlog', normalAdminauthenticate, multer.array('file'), normalAdminControllers.addBlog_post);

router.get(`/:slug`, normalAdminControllers.showBlog_get);

module.exports = router;