/**
 * @requires mongoose.models
 */
const User = require('../models/userSchema');
/**
 * @requires jsonwebtoken
 */
const jwt = require('jsonwebtoken');

/**
 * 
 * @param {Object} req 
 * @param {number} res 
 * @param {*} next
 * @param {callback} 
 * @async function
 */
const authenticate = async(req, res, next) => {
    try {

        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const verifiedUser = await User.findOne({ _id: verifyToken._id, 'tokens?.token': token });

        if (!verifiedUser) { throw new Error(`Could not find user`) }

        req.token = token;
        req.verifiedUser = verifiedUser;
        req.userId = verifiedUser._id;

        next();

    } catch (err) {
        res.status(401).send('Unauthorised');
        console.log(err);
    }
}


/**
 * @exports authenticate
 */
module.exports = authenticate;