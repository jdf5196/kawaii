'use strict';

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Blog = mongoose.model('Blog');

router.post('/postnewblog', (req, res)=>{
    let blog = new Blog;
    blog.title = req.body.title;
    blog.html = req.body.html;
    blog.user = {name: "Admin"},
    blog.url = req.body.title.split(' ').join('-');
    blog.save((err, blog)=>{
        if(err){return next(err);}
    })
    res.json(blog);
});

router.put('/getallblogs', (req, res)=>{
    Blog.find((err, blogs)=>{
        if(err){return err};
        res.json(blogs)
    })
})

module.exports = router;