const express = require('express');

const fs = require('fs');

const path = require('path');

const { create, getAll, getById, editOne, deleteOne } = require('../controllers/blog');

const Upload = require('../middlewares/multer');

const router = express.Router();

// create a new blog (post): /blogs/  => required(title) returns the blog
router.post('/', Upload.single('BlogImage'),async (req, res, next) => {
  const { body, user: { id, username } } = req;
  const obj = {
    photo: {
        data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        contentType: 'image/png'
    }   // is undefined?
}
    try {
      const blog = await create({ ...body, userId: id, author: username, photo: obj.photo });
      res.json(blog);
    } catch (e) {
        console.log(e);
      next(e);
    }
  });

// return all blogs of the login user(get): /blogs/ (it can be his own page)
router.get('/', async (req, res, next) => {
  const { user: { id } } = req;
    try {
      const blogs = await getAll(id);
      res.json(blogs);
    } catch (e) {
      next(e);
    }
  });

// return a specific blog of the login user(get): /blogs/:id 
router.get('/:id', async (req, res, next) => {
    const { params: { id }, user: { id: userID } } = req;
    try{
    const blog =await getById({id, userID});
        res.json(blog)
    } catch (e) {
        next(e);
    }
})

// edit a blog of the login user(patch): /blogs/:id returns the new blog
router.patch('/:id', async (req, res, next) => {
  const { params: { id }, user: { id: userID }, body } = req;
  body.updatedAt = Date.now();
    try{
      const blog = await editOne({ id, userID, body });
        res.json(blog)
    } catch (e) {
        console.log(e);
        next(e);
    }
})

// delete a blog of the login user(delete): /blogs/:id 
router.delete('/:id', async (req, res, next) => {
    const { params: { id }, user: { id: userID }} = req;
    try{
      const blog = await deleteOne({ id, userID });
      res.json({ ...blog, deleted: done });
    } catch (e) {
        next(e);
    }
})

module.exports = router;