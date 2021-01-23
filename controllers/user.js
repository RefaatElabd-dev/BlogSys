const User = require('../model/User');

const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const asyncSign = promisify(jwt.sign);

const create = (body) => User.create(body);

const getAll = () => User.find({}).exec();

const login = async ({username, password}) => {
    //find user 
    const user = await User.findOne({ username: username }).exec();
    if (!user)
    {
        throw Error('UN-AUTHENTICATED');
    }
    //compare password
    const isValidPass = await user.validatePassword(password);
    if (!isValidPass) {
        throw Error('UN-AUTHENTICATED');
    }
    const Auth = await asyncSign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    username: user.username,
    id: user.id
    }, 'SECRITKEY_HAHAHA');
    
    return { ...user.toJSON(), Auth };
}

module.exports = {
    create,
    login,
    getAll,
};