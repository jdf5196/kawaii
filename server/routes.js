'use strict';

const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
require('./passport.js');
const router = express.Router();
const Blog = mongoose.model('Blog');
const Episode = mongoose.model('Episode');
const User = mongoose.model('User');
const fs = require('fs');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const db = 'mongodb://127.0.0.1:27017/kawaii';
const jwt = require('express-jwt');
const secret = process.env.SECRET;
const Auth = jwt({secret: secret, userProperty: 'payload'});


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

/*router.post('/register', (req, res)=>{
    if(!req.body.name || !req.body.pw || !req.body.email){
        return res.status(400).json({message: 'Please fill out all fields'})
    }
    let user = new User;
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.pw);
    console.log(user);
    user.save((err)=>{
        if(err){
            return res.status(400).json({message: "Username or email already in use"});
        }else{
            return res.json({token: user.generateJWT()})
        }
    });
});*/
router.post('/register', (req, res)=>{
    if(!req.body.name || !req.body.pw || !req.body.email){
        return res.status(400).json({message: 'Please fill out all fields'})
    }
    let user = new User;
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.pw);
    console.log(user);
    user.save((err)=>{
        if(err){
            return res.status(400).json({message: "Username or email already in use"});
        }else{
            return res.json({token: user.generateJWT()})
        }
    });
});
router.post('/login', (req, res)=>{
    if(!req.body.username || !req.body.password){
        return res.status(400).json({message: "Please fill out all fields."});
    }
    passport.authenticate('local', (err, user, info)=>{
        if(err){return err}
        if(user){
            return res.json({token: user.generateJWT()})
        }else{
            return res.status(401).json(info);
        }
    })
})

router.post('/postnewepisode', Auth, upload.single("image"), (req, res)=>{
    console.log('upload...');
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
        console.log('save')
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