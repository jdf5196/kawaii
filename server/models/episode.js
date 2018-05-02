'use strict';

const mongoose = require('mongoose');

const EpisodeSchema = new mongoose.Schema({
    number: String,
    title: String,
    description: String,
    summary: String,
    soundcloudlink: String,
    date: String,
    length: String,
    image: String,
    resources: [{
        name: String,
        link: String,
        description: String
    }]
});

mongoose.model('Episode', EpisodeSchema);