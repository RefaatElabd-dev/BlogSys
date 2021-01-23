const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../model/User');

const asyncVerify = promisify(jwt.verify);

const auth = async (req, res, next) => {
    // 1- get authorization from request headers
    const { headers: { authorization } } = req;
    // 2- check if there is a authorization
    if (!authorization) {
        next(new Error('YOU SHOULD LOGIN'));
    }
    try {
    // 3- get id
        const { id } = await asyncVerify(authorization, 'SECRITKEY_HAHAHA');
    // 4- find it's data from database
        const user = await User.findById(id).exec();
    // 5- attach this user data to the request
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
        debugger;
        next(e);
    }
}
module.exports = auth;