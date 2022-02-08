const express = require('express');
const router = express.Router();
const normalAdminControllers = require('../controllers/NormalAdmin_controller'); //Controller for and Registration authentication
const authenticate = require('../middlewares/authenticateAdmin');




//.............................Routes for creating test..................................

/**
 * Function to GET test  panel for an admin
 * @method GET
 */
 router.get('/test/admin', normalAdminControllers.testAdmin_get);

 router.get('/mcq/:slug', normalAdminControllers.testSlug_get);
 
 
 router.get('/getTestData/:slug', normalAdminControllers.testData_get); 



/**
 * Function to save a test
 * @method POST
 */
 router.post('/saveTest/:id', normalAdminControllers.saveTest_post);


 module.exports = router;