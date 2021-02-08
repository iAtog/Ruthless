const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    guild: String,
    owner: String,
    name: String,
    description: String,
    id: String,
    xp: Number,
    rank: Array
},{collection: "Missions"});

module.exports = mongoose.model("MissionSchema", schema);