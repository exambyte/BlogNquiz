const express = require('express');
const router = express.Router();
const authcontrollers = require('../controllers/login_signup_controller'); //Controller for and Registration authentication

//......................Routes for Registration.............................

/**
 * Routing to register.ejs
 * @method {GET}
 */
router.get('/register', authcontrollers.register_get);

/**
 * Routing to register
 * @method {POST}
 */
router.post('/register', authcontrollers.register_post);

//......................Routes for Login.....................................

/**
 * Routing to login.ejs
 * @method {GET}
 */
router.get('/login',authcontrollers.login_get);
/**
 * Routing to login
 * @method {POST}
 */
router.post('/login',authcontrollers.login_post);



//......................Routes for Login.....................................

/**
 * Routing to logout
 * @method {GET}
 */
router.get('/logout',authcontrollers.logout_get);

/**
 * @exporst express.Router()
 */
module.exports = router;