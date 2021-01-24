const express = require('express');
const { edit, del, follow, search } = require('../controllers/userFuncs');
const router = express.Router();

router.patch('/edit', async (req, res, next)=>{
    const { body, user: { id } } = req;
    try {
        const user = await edit({ id, body });
        res.json(user);
    } catch (e) {
        next(e);
    }
})

router.delete('/delete', async (req, res, next)=>{
    const { user: { id } } = req;
    try {
        const user = await del(id);
        res.json({deleted: "done"});
    } catch (e) {
        next(e);
    }
})

router.post('/follow', async (req, res, next)=>{
    const { body: { f_id }, user: { id } } = req;
    try {
        const ret = await follow({ id, f_id });
        res.json(ret.flag);
    } catch (e) {
        next(e);
    }
})

router.get('/', async (req, res, next)=>{
    const { query: { id: neededID, tag, user } } = req;
    try {
        const results = await search({ neededID, tag, user });
        res.json(results);
    } catch (e) {
        next(e);
    }
})

router.get('/user', async (req, res, next)=>{
    const { query: { id: neededID } } = req;
    try {
        const results = await searchUser(neededID);
        res.json(results);
    } catch (e) {
        next(e);
    }
})


module.exports = router;

