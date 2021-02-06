const { DiscordAPIError } = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');


module.exports = class RuthlessClient extends require('discord.js').Client {
    constructor(options = {}) {
        super(options);
        this.data = require(getDataPath());
        this.commands = new Discord.Collection();
        this.aliases = new Discord.Collection();
        this.logger = require('./Logger');
        this.settings = require('../settings.json');
    }

    getData() {
        return getDataPath();
    }
}

function getDataPath() {
    if(fs.existsSync(path.join(__dirname, "../personaldata.json"))) {
        return "../personaldata.json";
    }else{
        return "../data.json";
    }
}