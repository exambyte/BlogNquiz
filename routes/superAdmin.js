const express = require('express');
const router = express.Router();
const superAdminControllers = require('../controllers/SuperAdmin_controller'); //Controller for and Registration authentication
const authenticate = require('../middlewares/authenticateSuperAdmin');

//......................Routes for Super Admin.............................

/**
 * Routing to register.ejs
 * @method GET
 */
router.get('/registerSuperAdmin', superAdminControllers.register_get);

/**
 * Routing to register
 * @method POST
 */
router.post('/registerSuperAdmin', superAdminControllers.register_post);

//......................Routes for Login.....................................

/**
 * Routing to login.ejs
 * @method GET
 */
router.get('/loginSuperAdmin', superAdminControllers.login_get);
/**
 * Routing to login
 * @method POST
 */
router.post('/loginSuperAdmin', superAdminControllers.login_post);

//......................Route for Super Admin Panel.....................................

/**
 * Route for getting Super admin Panel
 * @method GET
 */
router.get('/adminPanel',authenticate,superAdminControllers.get_admin_panel);

/**
 * route to get Super Admin Details
 * @method GET
 */
router.get('/getAdminData',authenticate,superAdminControllers.get_admin_data);




//......................Routes for CRUD operations for admins.....................................



/**
 * route to post details of normal admin for creating a normal admin user
 * @method POST
 */
router.post('/createAdmin',superAdminControllers.create_admin);

/**
 * Route to get all Normal Admins present 
 * @method GET
 */
router.get('/getAllData',superAdminControllers.getAllDocuments);

/**
 * Route to get edit admin data by ID
 * @method GET
 */
router.get('/editAdmin/:id',superAdminControllers.edit_admin_data_get);

/**
 * Route to put admin information or updating the data byusing ID
 * @method PUT
 */
router.put('/updateAdmin/:id',superAdminControllers.update_admin_data_put);

/**
 * Route to delete a particular admin by his/her ID
 * @method DELETE
 */
router.delete('/deleteAdmin/:id',superAdminControllers.delete_admin_data);




//......................Routes for Logout.....................................

/**
 * Routing to logout
 * @method {GET}
 */
 router.get('/logoutSuperAdmin',superAdminControllers.adminLogout_get);

module.exports = router;