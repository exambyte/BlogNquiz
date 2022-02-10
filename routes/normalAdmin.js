const express = require('express');
const router = express.Router();
const normalAdminControllers = require('../controllers/NormalAdmin_controller'); //Controller for and Registration authentication
const authenticate = require('../middlewares/authenticateAdmin');
const multer = require('../middlewares/multer');

//......................Routes for Login.....................................

/**
 * Routing to login.ejs
 * @method GET
 */
router.get('/loginNormalAdmin', normalAdminControllers.loginAdmin_get);

/**
 * Routing to login
 * @method POST
 */

router.post('/loginNormalAdmin', normalAdminControllers.loginAdmin_post);

//......................Routes for Normal admin Panel.....................................

/**
 * Route to get normal admin Panel
 * @method GET
 */
router.get('/NormalAdminDashboard', authenticate, normalAdminControllers.dashboard_get);

/**
 * Route to get Normal admin Details
 * @method GET
 */
router.get('/getNormalAdminDetails', authenticate, normalAdminControllers.admin_details_get);

//......................Routes for Normal admin Profile.....................................


/**
 * Route to get normal admin Panel
 * @method GET
 */
router.get('/NormalAdminProfile', authenticate, normalAdminControllers.adminProfile_get);




//......................Routes for CRUD operation of Blogs.....................................


/**
 * Route to get add blog panel
 * @method GET
 */
router.get('/addBlog/:id', normalAdminControllers.addBlog_get);

/**
 * Route to post blog data of a normal Admin
 * @method POST
 */
router.post('/addBlog/:id', multer.array('file'), normalAdminControllers.addBlog_post);

/**
 * route to get a particular blog a normal Admin
 * @method GET
 */
router.get(`/:slug`, normalAdminControllers.showBlog_get);

/**
 * Route to get all blogs of admin
 * @method GET
 */
router.get('/showAdminAllBlogs/:id', normalAdminControllers.showAllBlogs_get);

/**
 * Route to put admin blo details for updating
 * @method PUT
 */

router.put('/updateBlog/:id', normalAdminControllers.updateBlog_put);

/**
 * Route to delete a particular blog of an admin using the id of the particular blog
 */
router.delete('/deleteBlog/:id', normalAdminControllers.deleteBlog_delete);

module.exports = router;