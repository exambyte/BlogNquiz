//Controller for home Routing
const User = require('../models/userSchema');
const authenticate = require('../middlewares/authenticate');

/**
 * @name get/home
 * @exports
 * @param {String} path
 * @param {Callback} middleware
 * @param {*} req 
 * @param {home.ejs} res 
 */
exports.getHome = (req, res) => {
    // const {name,email,contactNo,password} = req.verifiedUser;
    res.render('home');
}

exports.getData = (req, res) => {
    res.send(req.verifiedUser);
}