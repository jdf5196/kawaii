'use strict';

const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
    name: String,
    episodes: [{title: String, number: Number, url: String, date: String}],
    bio: String,
    links: [{title: String, url: String}],
    image: String
});

mongoose.model('Guest', GuestSchema);