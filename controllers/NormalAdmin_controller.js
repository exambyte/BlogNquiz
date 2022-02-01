const normalAdmin = require('../models/normalAdmin'); //acquiring Schema for admin model
const bcrypt = require('bcryptjs');
const Article = require('../models/Blog')


//.....................Implementing Login Part...............................................


/**
 * Function to GET request for rendering HTML for login page
 * @name get/login
 * @param {string} path
 * @param {callback} middleware
 * @param {*} req 
 * @param {login.ejs} res 
 */
exports.login_get = (req, res) => {
    res.render('loginNormaladmin');
}

/**
 * Function to POST request for validating login and if user is verified a response 'ok' will be send to
 * client otherwise a status code '400' will be send to client.
 * @param {Object} req 
 * @param {Number} res 
 * @param {callback} middleware
 * @returns {number}a status code o '400' when input fields are not filled
 * @async function
 */

exports.login_post = async(req, res) => {
    try {
        /**
         * object destructuring to get email and password from client
         */

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the data" });
        }
        /**
         * Storing user data if user exists in database 
         */

        const Adminsearch = await normalAdmin.findOne({ email: email });

        if (!Adminsearch) {
            res.status(400).json({ error: "admin not found" });
        } else {
            const isValidlogin = await bcrypt.compare(password, Adminsearch.password);
            const token = await Adminsearch.generateAuthToken();
            // console.log(token); //for testing pupose 
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 60480000), //expiry data of token set for 1 week
                httpOnly: true
            });

            if (!isValidlogin) {
                res.status(400).json({ error: "admin not found" });
            } else {
                console.log('Normal Admin found'); //For testing purpose in backend
                res.status(200).json({ status: 'normalAdmin' });
            }
        }

    } catch (err) {
        console.log(err);
    };
}


exports.dashboard_get = (req, res) => {
    res.render('NormalAdminDashboard');
}

exports.addBlog_get = (req, res) => {
    res.render('addBlog');
}


exports.addBlog_post = async(req, res) => {

    const title = req.body.title
    const description = req.body.description
    const markdown = req.body.markdown

    // trying to save current user email in during post in articles collection
    const createdBy = res.locals.Admin;
    const createdById = res.locals.Admin.id;

    // // image
    const image = req.files;

    // // category
    const category = req.body.category;

    let article = new Article({
        title,
        description,
        markdown,
        createdBy,
        createdById,
        image,
        category
    })

    try {
        article = await article.save()
            // console.log(article.id)
        return res.status(201).redirect(`/${article.slug}`)
    } catch (error) {
        console.log(error)
        res.status(401).send({ error: "Error Occured, Please try again. " })
    }
}

// exports.showBlog_get = async(req, res)

exports.showBlog_get = async(req, res) => {

    console.log(req.params.slug)

    const article = await Article.findOne({ slug: req.params.slug })

    if (article == undefined) {
        res.redirect('/')
    } else {
        res.render('showBlog', { article: article })
    }
}