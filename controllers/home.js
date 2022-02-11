//Controller for home Routing
const User = require('../models/userSchema');
const authenticate = require('../middlewares/authenticate');
const req = require('express/lib/request');
const Article = require('../models/Blog')
const Details = require('../models/userSchema')

/**
 * @name get/home
 * @exports
 * @param {String} path
 * @param {Callback} middleware
 * @param {*} req 
 * @param {home.ejs} res 
 */
exports.getHome = async(req, res) => {
    // const {name,email,contactNo,password} = req.verifiedUser;
    const articles = await Article.find();
    res.render('home', { articles: articles });
}


exports.getData = (req, res) => {
    res.send(req.verifiedUser);
}