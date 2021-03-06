'use strict';

const mongoose = require('mongoose');
const secret = process.env.SECRET;
const UserSchema = new mongoose.Schema({
    name: {type:String, lowercase: true, unique: true},
    email: {type:String},
    blogs: [String],
    episodes: [{title: String, number: Number, url: String, date: String}],
    bio: String,
    links: [{title: String, url: String}],
    image: String,
    hash: String,
    salt: String
});

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password){
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');

    return this.hash === hash;
}

UserSchema.methods.generateJWT = function(){
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        _id: this._id,
        username: this.name,
        exp: parseInt(exp.getTime() / 1000)
    }, secret);
};

mongoose.model('User', UserSchema);