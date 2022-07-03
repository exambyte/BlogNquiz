/**
 * @file This file inside Routes will be used to route to login/logout and Signup for a normal user
 * @see <a href="routes_login_signup.js.html">see the source code Here</a>
 */

const express = require('express');
const router = express.Router();
const authcontrollers = require('../controllers/login_signup_controller'); //Controller for and Registration authentication
const authenticate = require('../middlewares/authenticate')

//......................Routes for Registration.............................

/**
 * Routing to register.ejs
 * @module normal_user_login_signup
 * @method GET
 */
router.get('/register', authcontrollers.register_get);

/**
 * Routing to register
 * @module normal_user_login_signup
 * @method POST
 */
router.post('/register', authcontrollers.register_post);


//......................Routes for Login.....................................

/**
 * Routing to login.ejs
 * @module normal_user_login_signup
 * @method GET
 */
router.get('/login', authcontrollers.login_get);
/**
 * Routing to login
 * @module normal_user_login_signup
 * @method POST
 */

router.post('/login', authcontrollers.login_post);

//......................Routes for authenticated user.....................................

/**
 * Routing to user Dashboard
 * @module userDashboard_get
 * @method GET
 */
router.get('/userDashboard', authenticate, authcontrollers.userDashboard_get);
/**
 * Routing to user Profile
 * @module showUserProfile_get
 * @method GET
 */
router.get('/userProfile/:id', authenticate, authcontrollers.showUserProfile_get);


//......................Routes for Like and bookmark.....................................

/**
 * Route to get user blog based on a slug which is taken from database
 * @module showBlogUser_get
 * @method GET
 */
router.get('/showBlogUser/:slug', authenticate, authcontrollers.showBlogUser_get)
/**
 * Route to make PUT request
 * @module like
 * @method PUT
 */
router.put('/like/:id', authenticate, authcontrollers.like);
/**
 * Route to make PUT request for like
 * @module like
 * @method PUT
 */
router.put('/bookmark/:id', authenticate, authcontrollers.bookmark_put);
/**
 * Route to make PUT request for comment
 * @module comment
 * @method PUT
 */
router.put('/comment/:id' , authenticshowUserProfile_getate , authcontrollers.comment_put);



//......................Routes for User Quiz.....................................

/**
 * Route to make PUT request for saving userQuiz data when the user takes a quiz
 * @module saveUserQuizData
 * @method PUT
 */
router.put('/saveUserQuizData/data', authenticate, authcontrollers.saveUserQuizData);
/**
 * Route to make  GET request to show Quiz data
 * @module showUserQuiz
 * @method GET
 */
router.get('/showUserQuiz/:id', authenticate, authcontrollers.showUserQuiz);
/**
 * Route to make  GET request to get user Quiz data
 * @module userQuizData_get
 * @method GET
 */
router.get('/userQuizData/:id', authenticate, authcontrollers.userQuizData_get);
/**
 * Route to make  GET request to get user Quiz data
 * @module StudentQuizResults_get
 * @method GET
 */
router.get('/userQuizResults/:id', authcontrollers.StudentQuizResults_get);
/**
 * Route to make  GET request to get user Quiz Taking section
 * @module userTakeQuiz_get
 * @method GET
 */
router.get('/userTakeQuiz', authenticate, authcontrollers.userTakeQuiz_get);


//......................Routes for Logout.....................................

/**
 * Routing to logout
 * @module normal_user_login_signup
 * @method GET
 */

router.get('/logout', authenticate, authcontrollers.logout_get);

/**
 * @exports  normal_user_login_signup
 */
module.exports = router;