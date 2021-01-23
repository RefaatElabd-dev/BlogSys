const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const Blog = require('./model/Blog.js');

const app = express();

mongoose.connect('mongodb://localhost:27017/BlogSys', { useUnifiedTopology: true });

app.use(express.json());

app.get('/',async (req,res,next)=>{
    try {
        // coms last 2 days blogs
        let date = new Date();
        date.setDate(date.getDate() - 2);
        const blogs = await Blog.find({ createdAt : { $gt: date }}).exec();
        res.json(blogs);
      } catch (e) {
        next(e);
      }
})

app.use('/',routes);

app.use('*', (req, res, next) => {
    res.status(404).json({ err: "not found" });
});

//error handler
app.use((err, req, res, next) => {
    //Map the error and send it to user
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(422).json(err.errors);
    }
    if(err.code == 11000)
    {
        return res.status(422).json({statusCode: "validationError",prorerty: err.keyValue});
    }
    if (err.message === 'UN-AUTHENTICATED')
    {
        res.status(401).json({ statusCode: "UN-AUTHENTICATED" });    
    }
    if (err.message === 'YOU SHOULD LOGIN')
    {
        res.status(401).json({ statusCode: "YOU SHOULD LOGIN FIRST" }); 
    }
    if (err.message === "jwt expired")
    {
        res.status(511).json({ statusCode: "jwt expired, Network Authentication Required" });
    }
    if (err.message === 'UN-EXIST')
    {
        res.status(417).json({ statusCode: "No matched for the person you try to follow" });
    }
    if (err.name === "CastError")
    {
        res.status(400).json({ statusCode: "The server could not understand the request due to invalid syntax. (may by you should check body data!" });
    }
    if (err.message === 'Enter query of id or tag ')
    {
        res.status(400).json({ statusCode: "The server could not understand the request due to invalid syntax., (you should Enter query of id or tag)" });
    }
    console.log(err);
    res.status(503).end();
});

const { PORT = 4000 } = process.env;
app.listen(PORT, () => {
    console.log("App is up ready on : " + PORT)
})