'use strict';

const mongoose = require('mongoose');

const EpisodeSchema = new mongoose.Schema({
    number: String,
    title: String,
    url: String,
    description: String,
    summary: String,
    soundcloudlink: String,
    rawsoundcloud: String,
    date: String,
    length: String,
    image: String,
    user: String,
    resources: [{
        name: String,
        link: String,
        description: String
    }]
});

mongoose.model('Episode', EpisodeSchema);