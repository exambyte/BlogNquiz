const express = require('express');
const router = express.Router();
const controller = require('../controllers/home');
const authenticate = require('../middlewares/authenticate')

router.get('/',controller.getHome);

router.get('/getData',authenticate,controller.getData);
module.exports = router;