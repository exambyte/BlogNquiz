/**
 * @file server.js is the main file for this application
 * @author ExamBytes Pvt. Ltd.
 * @see <a href="server.js.html">see all the source code Here</a>
 */

/**
 * express module
 * @const
 */
const express = require('express');

/**
 * path module
 * @const
 */
const path = require('path');

/**
 * dotenv module
 * @const
 */
const dotenv = require('dotenv');

/**
 * cookie-parser module
 * @const
 */
const cookieParser = require("cookie-parser");

/**
 * mongoose module
 * @const
 */
const mongoose = require('mongoose');

/**
 * body-parser module
 * @const
 */
const bodyParser = require('body-parser');

/**
 * Acquiring route for home
 * @require
 */
const routes = require('./routes/home');
/**
 * Acquiring route to login/signup
 * @require
 */
const authRoute = require('./routes/login_signup');
const adminRoute = require('./routes/superAdmin');
const normalAdmin = require('./routes/normalAdmin');
const test = require('./routes/test');


dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 2000; //Getting PORT Dynamically in case not Dynamic a port 3000 is mentioned
const DB = process.env.DATABASE; //Getting Databse URI


/**
 * @connect {*}Setting mongoose Connection
 */

mongoose.connect(DB).then(() => {
    console.log("connection Successful");
}).catch((err) => console.log(err));

// connection to database
// mongoose.connect('mongodb://localhost:27017/Exambytedb')

const app = express();

//Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './templates/views'));

/**
 * @routes
 */
app.use('', routes);
app.use('', authRoute);
app.use('', adminRoute);
app.use('', normalAdmin);
app.use('', test);

/**
 * @listen 
 */
app.listen(PORT, () => {
    console.log(`server is listening at port http://localhost:${PORT}`);
});