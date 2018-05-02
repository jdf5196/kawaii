'use strict';

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Blog = mongoose.model('Blog');
const Episode = mongoose.model('Episode');
const fs = require('fs');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const db = 'mongodb://localhost/kawaii';

var storage = multer.diskStorage({
	destination: './build/images/uploads',
	filename: function(req, file, cb){
		crypto.pseudoRandomBytes(16, function (err, raw) {
			if(err) {return cb(err)}
			cb(null, raw.toString('hex') + path.extname(file.originalname))
		})
	}
});
var upload = multer({storage: storage});

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
    }).sort({$natural:-1});
});

router.post('/postnewepisode', upload.single("image"), (req, res)=>{
    let file = `/images/uploads/${req.file.filename}`;
    let episode = new Episode;
    let resources = [];
    episode.title = req.body.title;
    episode.description = req.body.description;
    episode.summary = req.body.summary;
    episode.soundcloudlink = req.body.soundcloud;
    episode.date = getDate();
    episode.length = req.body.length;
    episode.image = file;
    episode.resources = resources;
    episode.number = req.body.number;
    episode.save((err, episode)=>{
        if(err){return err};
        res.json(episode)
    })
});

router.put('/getallepisodes', (req, res)=>{
    Episode.find((err, episodes)=>{
        if(err){return err};
        res.json(episodes)
    }).sort({$natural:-1});
})

const getDate = ()=>{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = mm + '/' + dd + '/' + yyyy;
    return today
}
const getNumberOfDocs = () =>{
    let epi;
    Episode.find((err, epi)=>{
        epi = epi.length + 1
    });
};

module.exports = router;