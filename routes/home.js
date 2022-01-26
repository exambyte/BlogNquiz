const express = require('express');
const router = express.Router();
const controller = require('../controllers/home');
const authenticate = require('../middlewares/authenticate')
<<<<<<< HEAD
const Adminauthenticate = require('../middlewares/authenticateAdmin')
=======
>>>>>>> 4688461b7323721fc028de688b3458f7996faaf7


router.get('/', controller.getHome);

router.get('/getData',authenticate,controller.getData);
module.exports = router;