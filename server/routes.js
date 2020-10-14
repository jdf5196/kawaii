'use strict';

const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
require('./passport.js');
const router = express.Router();
const Blog = mongoose.model('Blog');
const Episode = mongoose.model('Episode');
const User = mongoose.model('User');
const nodemailer = require('nodemailer');
const fs = require('fs');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const db = 'mongodb://127.0.0.1:27017/kawaii';
const jwt = require('express-jwt');
const uuid = require('node-uuid');
const secret = process.env.SECRET;
const Auth = jwt({secret: secret, userProperty: 'payload'});
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smpt.gmail.com',
    auth: {
        user: process.env.EMAILADDRESS,
        pass: process.env.EPASS
    }
})


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
router.post('/register', (req, res)=>{
    if(!req.body.name || !req.body.email){
        return res.status(400).json({message: 'Please fill out all fields'})
    }
    let user = new User;
    let pw = uuid.v4();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(pw);
    const message = `Username: ${req.body.name}\nEmail: ${req.body.email}\nPassword: ${pw}`
    user.save((err)=>{
        if(err){
            return res.status(400).json({message: "Username already in use"});
        }else{
            transporter.sendMail({
                from:process.env.EMAILADDRESS,
                to: 'jfrancona87@gmail.com',
                subject: `New Kawaiitrash.com user Registered`,
                text: message,
                html: message
            }, (err)=>{
                if(err){
                    res.status(500).send('Failed to send');
                }
                transporter.close();
                res.json('Success')
            })
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
    })(req, res);
});

router.put('/changepassword', Auth, (req, res)=>{
    if(!req.body.id || !req.body.username || !req.body.password || !req.body.newPw){
        return res.status(400).json({message: "Please fill out all fields."})
    }
    passport.authenticate('local', (err, user, info)=>{
        if(err){return err}
        if(user){
            user.setPassword(req.body.newPw);
            user.save((err, user)=>{
                if(err){return err;}
                res.json({message: 'success'})
            })
        }else{
            return res.status(401).json(info);
        }
    })(req, res);
})

router.post('/postnewepisode', Auth, upload.single("image"), (req, res)=>{
    let file = `/images/uploads/${req.file.filename}`;
    let episode = new Episode;
    let url = req.body.title.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").split(" ").join("-");
    episode.title = req.body.title;
    episode.url = url;
    episode.description = req.body.description;
    episode.summary = req.body.summary;
    episode.soundcloudlink = req.body.soundcloud;
    episode.rawsoundcloud = req.body.rawsoundcloud;
    episode.date = getDate();
    episode.length = req.body.length;
    episode.image = file;
    //episode.guests = JSON.parse(req.body.guests);
    episode.resources = JSON.parse(req.body.resources);
    episode.keywords = JSON.parse(req.body.keywords);
    episode.number = req.body.number;
    episode.user = req.body.userid;
    episode.save((err, epi)=>{
        if(err){return err};
        User.findOne({_id: req.body.userid}, (err, user)=>{
            if(err){return err}
            user.episodes.push(epi._id);
            user.save((err, u)=>{
                if(err){return err}
                res.json(epi)
            })
        })
    })
});
router.post('/updateepisode', Auth, (req, res)=>{
    Episode.findOne({_id: req.body.id}, (err, epi)=>{
        if(err){return err};
        epi.title = req.body.title;
        epi.url = req.body.url;
        epi.description = req.body.description;
        epi.summary = req.body.summary;
        epi.soundcloudlink = req.body.soundcloud;
        epi.rawsoundcloud = req.body.rawsoundcloud;
        epi.date = req.body.date;
        epi.length = req.body.length;
        epi.guests = JSON.parse(req.body.guests);
        epi.resources = JSON.parse(req.body.resources);
        epi.keywords = JSON.parse(req.body.keywords);
        epi.number = req.body.number;
        epi.save((err, ep)=>{
            if(err){return err};
            res.json(ep)
        })
    })
});

router.post('/updateepisodeimage', Auth, upload.single("image"), (req, res)=>{
    let file = `/images/uploads/${req.file.filename}`;
    Episode.findOne({_id: req.body.id}, (err, epi)=>{
        if(err){return err}
        epi.title = req.body.title;
        epi.url = req.body.url;
        epi.description = req.body.description;
        epi.summary = req.body.summary;
        epi.soundcloudlink = req.body.soundcloud;
        epi.rawsoundcloud = req.body.rawsoundcloud;
        epi.date = req.body.date;
        epi.length = req.body.length;
        epi.guests = JSON.parse(req.body.guests);
        epi.resources = JSON.parse(req.body.resources);
        epi.number = req.body.number;
        epi.image = file;
        epi.save((err, ep)=>{
            if(err){return err};
            res.json(ep)
        })
    })
});

router.delete('/deleteepisode', Auth, (req, res)=>{
    Episode.findOne({_id: req.body.id}, (err, epi)=>{
        if(err){return err};
        Episode.remove({_id: req.body.id}, (err)=>{
            if(err){return err}
            User.findOne({_id: epi.user}, (err, user)=>{
                if(err){return err}
                let i = user.episodes.indexOf(req.body.id);
                if(i > -1){
                    user.episodes.splice(i, 1);
                }
                user.save((err, u)=>{
                    if(err){return err}
                })
            })
            res.send('success');
        })
    })
})

router.put('/getallepisodes', (req, res)=>{
    Episode.find((err, episodes)=>{
        if(err){return err};
        res.json(episodes)
    }).sort({$natural:-1});
})

router.put('/getfiveepisodes', (req,res)=>{
    Episode.find((err, episodes)=>{
        if(err){return err};
        let epis = [];
        episodes.map((epi)=>{
            let sode = {
                _id: epi._id,
                number: epi.number,
                title: epi.title,
                url: epi.url,
                summary: epi.summary,
                soundcloudlink: epi.soundcloudlink,
                date: epi.date,
                length: epi.length,
                image: epi.image
            }
            epis.push(sode)
        })
        res.json(epis)
    }).limit(5).sort({$natural:-1});
})

router.put('/getepisode', (req,res)=>{
    Episode.findOne({url:req.body.url}, (err, epi)=>{
        if(err){return err}
        res.json(epi)
    })
})

router.post('/sendemail', (req, res)=>{
    transporter.sendMail({
        from:process.env.EMAILADDRESS,
        to: 'jfrancona87@gmail.com',
        subject: `Website Message from ${req.body.name}`,
        replyTo: req.body.email,
        text: req.body.message,
        html: req.body.message
    }, (err, info)=>{
        if(err){
	    console.log(err);
            res.status(500).send('Failed to send');
        }
	console.log(info);
        transporter.close();
        res.json('Success')
    })
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
