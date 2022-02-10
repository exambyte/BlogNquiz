const normalAdmin = require('../models/normalAdmin'); //acquiring Schema for admin model
const bcrypt = require('bcryptjs');
const Article = require('../models/Blog');
const Test = require('../models/Test');



//.....................Implementing Login Part...............................................


/**
 * Function to GET request for rendering HTML for login page
 * @name get/login
 * @param {string} path
 * @param {callback} middleware
 * @param {*} req 
 * @param {login.ejs} res 
 */
exports.loginAdmin_get = (req, res) => {
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

exports.loginAdmin_post = async(req, res) => {
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

//.....................Implementing Normal Admin Dashboard......................

/**
 * Function to render normal admin  dashboard
 * @param {*} req 
 * @param {NormalAdminDashBoard.ejs} res 
 */
exports.dashboard_get = (req, res) => {
    res.render('NormalAdminDashboard');
};

/**
 * Function to get admin details to show in the dashboard
 * @param {Object} req 
 * @param {Object} res 
 */
exports.admin_details_get = (req, res) => {
    res.send(req.verifiedAdmin);
};

//.....................Implementing Normal Admin Profile......................

/**
 * Function to render normal admin  Profile
 * @param {*} req 
 * @param {NormalAdminDashBoard.ejs} res 
 */
exports.adminProfile_get = (req, res) => {
    res.render('NormalAdminProfile');
}










//.......................blog section Area CRUD operation.........................................

/**
 * Function to render add blog page for adding a blog
 * @param {*} req 
 * @param {addblog.ejs} res 
 */
exports.addBlog_get = (req, res) => {
    res.render('addBlog');
};



/**
 * Function to add blog post to the database
 * @param {Object} req 
 * @param {Number,Object} res 
 * @returns 
 */
exports.addBlog_post = async(req, res) => {
    console.log("Coming in backend to add blog");

    const createdById = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const markdown = req.body.markdown;

    // trying to save current user email in during post in articles collection
    // const createdBy = res.locals.Admin;
    // const createdById = res.locals.Admin.id;

    // // image
    const image = req.files;

    // // category
    const category = req.body.category;

    let article = new Article({
        title,
        description,
        markdown,
        // createdBy,
        createdById,
        image,
        category
    })

    try {
        const articleData = await article.save();
        // console.log(article.id)
        return res.status(201).redirect(`/${articleData.slug}`);
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: "Error Occured, Please try again. " });
    }
};





/**
 * Function to show a particular blog using the slug 
 * @param {String} req 
 * @param {Object} res 
 */
exports.showBlog_get = async(req, res) => {

    console.log(req.params.slug)

    const article = await Article.findOne({ slug: req.params.slug })

    if (article == undefined) {
        res.redirect('/')
    } else {
        res.render('showBlog', { article: article })
    }
};



/**
 * Function to show all blogs created by a particular admin
 * @param {_id} req 
 * @param {Array Object} res 
 * @async function
 */
exports.showAllBlogs_get = async(req, res) => {
    const id = req.params.id;
    try {
        const allBlogs = await Article.find({ createdById: id });
        if (allBlogs.length > 0) {
            res.status(200).json(allBlogs);
        } else {
            res.status(404).json({ error: 'No blogs yet' });
        }
    } catch (err) {
        console.log(err);
    }
};


/**
 * Function to Update a blog using the id of the blog
 * @param {_id} req 
 * @param {Object} res 
 * @async function
 */
exports.updateBlog_put = async(req, res) => {
    const id = req.params.id;
    console.log(id);
    if (!req.body) {
        res.status(400).send({ message: "Data might not be filled" });
    }

    Article.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "can not update user" });
            } else {
                res.status(200).send(data);
            }
        }).catch(err => {
            console.log(err);
            res.status(500).send({ message: "can not update data" });
        });
};


/**
 * Function to delete a particular blog using the blog Id
 * @param {_id} req 
 * @param {Object} res 
 * @async function
 */
exports.deleteBlog_delete = async(req, res) => {
    const id = req.params.id;
    Article.findByIdAndDelete(id).then(data => {
        if (!data) {
            res.status(404).send({ message: "can't delete'" });
        } else {
            res.send({ message: "Blog deleted" });
        }
    }).catch(err => {
        res.status(500).send({ message: err });
    })
};




//.................................Implementing Normal admin Test part.........................

exports.saveTest_post = async(req, res) => {
    const createdById = req.params.id;
    const title = req.body.title;
    const noOfQestions = req.body.noOfQestions;
    const questions = req.body.questions;
    console.log(noOfQestions);
    let mcqTest = new Test({
        title,
        noOfQestions,
        createdById,
        questions
    });

    try {
        const testData = await mcqTest.save();
        res.status(200).json(testData.slug);
    } catch (err) {
        console.log(err);
    }
}






/**
 * Function to render  the test Panel
 * @param {*} req 
 * @param {adminTestPanel.ejs} res 
 */
exports.testAdmin_get = (req, res) => {
    res.render('testPanel');
}



exports.testSlug_get = async(req, res) => {
    res.render('mcqTest');
}



exports.testData_get = async(req, res) => {
    let slug = req.params.slug;
    try {
        const result = await Test.find({ slug: slug });
        if (result.length > 0) {
            console.log(result);
            res.status(200).json(result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

}