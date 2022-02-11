const express = require('express');
const router = express.Router();
const controller = require('../controllers/home');
const authenticate = require('../middlewares/authenticate')

router.get('/', authenticate, controller.getHome);

router.get('/getData', authenticate, controller.getData);

// router.put('/like/:id', authenticate, controller.like);

// router.put('/bookmark/:id', authenticate, controller.bookmark_put);

module.exports = router;