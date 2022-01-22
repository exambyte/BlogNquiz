//Controller for home Routing

/**
 * @name get/home
 * @exports
 * @param {String} path
 * @param {Callback} middleware
 * @param {*} req 
 * @param {home.ejs} res 
 */
exports.getHome=(req,res)=>{
    res.render('home');
}