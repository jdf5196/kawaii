'use strict';

const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: String,
    html: String,
    date: String,
    user: Object,
    url: String
});

mongoose.model('Blog', BlogSchema);