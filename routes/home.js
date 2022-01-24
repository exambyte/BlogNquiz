const express = require('express');
const router = express.Router();
const controller = require('../controllers/home');
const authenticate = require('../middlewares/authenticate')
const Adminauthenticate = require('../middlewares/authenticateAdmin')


router.get('/', controller.getHome);


module.exports = router;