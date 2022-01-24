/**
 * @requires jsonwebtoken
 */
const jwt = require('jsonwebtoken');

const Admin = require('../models/SuperAdminSchema');

const Adminauthenticate = async(req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const verifiedAdmin = await Admin.findOne({ _id: verifyToken._id, 'tokens?.token': token });

        if (!verifiedAdmin) { throw new Error(`Could not find Admin`) }

        req.token = token;
        req.verifiedAdmin = verifiedAdmin;
        req.AdminId = verifiedAdmin._id;
        res.locals.admin = verifiedAdmin;

        next();

    } catch (err) {
        res.status(401).send('Unauthorised');
        console.log(err);
    }
}

/**
 * @exports Adminauthenticate
 */

module.exports = Adminauthenticate;