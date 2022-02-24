/**
 * @file Home.js inside Routes will be used to route to home page
 * @see <a href="routes_home.js.html">see the source code Here</a>
 */


const express = require('express');
const router = express.Router();
const controller = require('../controllers/home');
const authenticate = require('../middlewares/authenticate')

router.get('/', authenticate, controller.getHome);

router.get('/getData', authenticate, controller.getData);

router.get('/userTestsSection',controller.getUserTest);

router.get('/allTests',controller.allTests_get);

// router.put('/like/:id', authenticate, controller.like);

// router.put('/bookmark/:id', authenticate, controller.bookmark_put);

module.exports = router;