/**
 * @file This file inside controllers has function definitions for home functionality
 */



//Controller for home Routing
const User = require('../models/userSchema');
const authenticate = require('../middlewares/authenticate');
const req = require('express/lib/request');
const Article = require('../models/Blog');
const Details = require('../models/userSchema');
const Test = require('../models/Test');

/**
 * @name get/home
 * @module normal_user_home
 * @param {String} path
 * @param {Callback} middleware
 * @param {*} req 
 * @param {home.ejs} res 
 * @exports normal_user_home
 */
exports.getHome = async(req, res) => {
    // const {name,email,contactNo,password} = req.verifiedUser;
    // console.log(res.locals.user._id);
    const articles = await Article.find();
    const tests = await Test.find();
    res.render('home', { articles: articles ,tests:tests ,unauthorised:res.locals.unauthenticated,userID:res.locals.id});
}

exports.getUserTest=async(req,res)=>{
    res.render('userTest');
}


exports.allTests_get=async(req,res)=>{
    try{
        const tests = await Test.find();
        if(tests.length > 0){
            res.status(200).json(tests);
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}



exports.getData = async(req, res) => {
    const articles = await Article.find();
    res.render('home', { articles: articles });
    // res.send(req.verifiedUser);
}