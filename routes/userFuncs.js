const express = require('express');
const { edit, del, follow, searchBlog, searchUser } = require('../controllers/userFuncs');
const router = express.Router();


// edit it's own data /Account/edit 
router.patch('/edit', async (req, res, next)=>{
    const { body, user: { id } } = req;
    try {
        const user = await edit({ id, body });
        res.json(user);
    } catch (e) {
        next(e);
    }
})

// delete it's own account /Account/delete
router.delete('/delete', async (req, res, next)=>{
    const { user: { id } } = req;
    try {
        const user = await del(id);
        res.json({deleted: "done"});
    } catch (e) {
        next(e);
    }
})


// user follow and unfollow anthor users : /Account/follow. return flag (follow or not)
router.post('/follow', async (req, res, next)=>{
    const { body: { f_id }, user: { id } } = req;
    try {
        const ret = await follow({ id, f_id });
        res.json(ret.flag);
    } catch (e) {
        next(e);
    }
})

//searching/Account/(querystring)
router.get('/', async (req, res, next)=>{
    const { query: { searched } } = req;
    try {
        const results = await searchBlog(searched);
        res.json(results);
    } catch (e) {
        next(e);
    }
})

//user self page /Account/mypage
router.get('/mypage',async (req, res, next)=>{
    const { user } = req;
    try {
        res.json(user);
    } catch (e) {
        next(e);
    }
})

//user search about anthor users /Account/user/(Query string)  returns user & its blogs (body should contain username)
router.get('/user', async (req, res, next)=>{
    const { query: { username } } = req;
    try {
        const results = await searchUser(username);
        res.json(results);
    } catch (e) {
        next(e);
    }
})


module.exports = router;

