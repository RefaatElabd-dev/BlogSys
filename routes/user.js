const express = require('express');
const { create, login, getAll } = require('../controllers/user');
const router = express.Router();

//register /users  (by post) required:(Fname,Lname,username[unique],password,email) nonrequired:(dbo)
router.post('/', async (req, res, next)=>{
    const { body } = req;
    try {
        const user = await create(body);
        res.json(user);
    } catch (e) {
        next(e);
    }
})


router.get('/', async (req, res, next) => {
    try {
        const users = await getAll();
        res.json(users);
    } catch (e) {
        next(e);
    }
})

//login : /users/login ==>required(username, password)
router.post('/login', async (req, res, next)=>{
    const { body } = req;
    try {
        const user = await login(body);
        res.json(user);
    } catch (e) {
        next(e);
    }
})


module.exports = router;