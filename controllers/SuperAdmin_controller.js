<<<<<<< HEAD
const Admin = require('../models/SuperAdminSchema'); //acquiring Schema for admin model
const USer = require('../models/userSchema'); //acquiring Schema for admin model
// const Admin = require('../models/SuperAdminSchema'); //acquiring Schema for admin model
=======
const Admin = require('../models/superAdminSchema'); //acquiring Schema for admin model
const User = require('../models/userSchema'); //acquiring Schema for admin model
>>>>>>> 4688461b7323721fc028de688b3458f7996faaf7
const bcrypt = require('bcryptjs');

//....................Implementing Signup Part..............................................


/**
 * Function to GET request for rendering HTML for Signup page
 * @name get/register
 * @param {String} path
 * @param {callback} middleware
 * @param {*} req 
 * @param {register.ejs} res 
 */
exports.register_get = (req, res) => {
    res.render('addSuperadmin');
}

/**
 * Function to POST request for Register if userregistered successfully server will send of status code 201
 * else a status code of 404 will be send
 * @param {Object} req 
 * @param {Number} res 
 * @returns {Number} status code
 */
exports.register_post = async(req, res) => {
    console.log(req.body);
    const { name, email, contactNo, password, confirm_password } = req.body;
    if (!name || !email || !contactNo || !password || !confirm_password) {
        return res.status(422).json({ error: "Please fill the fields properly" });
    } else if (password.length < 6) {
        return res.status(401).json({ error: "Password must be at least 6 characters" })
    }
    try {
        /**
         * Searching if a user already exist with the email
         */

        // normal usersection
        const dbEmail = await Admin.findOne({ email: email });

        if (dbEmail) {
            return res.status(404).json({ error: 'Email Already Registered' })
        }
        if (password === confirm_password) {

            const detail = new Admin({
                name,
                email,
                contactNo,
                password
            });

            console.log(detail) //For testing purpose
            console.log('here')
            const registered = await detail.save();

            if (registered) {
                res.status(201).json({ registered: registered._id });
            } else {
                res.status(500).json({ error: "User Failed to Register" });
            }

        } else {
            res.status(404).json({ error: 'Enter same confirm password' })
        }
    } catch (error) {
        res.status(404).json({ error: error });
    }
}



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
    res.render('loginSuperadmin');
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

        const Adminsearch = await Admin.findOne({ email: email });
        if (!Adminsearch) {
            res.status(400).json({ error: "admin not found" });
        } else {
            const isValidlogin = await bcrypt.compare(password, Adminsearch.password);
            const token = await Adminsearch.generateAuthToken();
            console.log(token); //for testing pupose 
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 60480000), //expiry data of token set for 1 week
                httpOnly: true
            });

            if (!isValidlogin) {
                res.status(400).json({ error: "admin not found" });
            } else {
                console.log('admin found'); //For testing purpose in backend
                res.status(200).json({ status: 'admin' });
            }
        }

    } catch (err) {
        console.log(err);
    };
}