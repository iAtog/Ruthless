const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const Missions = require('./database/MissionObject');

module.exports = class RuthlessClient extends require('discord.js').Client {
    constructor(options = {}) {
        super(options);
        if(fs.existsSync(path.join(__dirname, "../personaldata.json"))) {
            this.data = require("../personaldata.json");
        }else{
            this.data = require("../data.json");
        }
        this.commands = new Discord.Collection();
        this.aliases = new Discord.Collection();
        this.logger = require('./Logger');
        this.settings = require('../settings.json');
        this.databases = {
            missions: new Missions(this)
        }
        this.categories = {
            admin: "Administrador",
            gang: "Banda",
            fun: "Diversión",
            owner: "Dueño",
            misc: "Milescaneo",
            util: "Utilidad"
        }
    }

    getData() {
        if(fs.existsSync(path.join(__dirname, "../personaldata.json"))) {
            return "../personaldata.json";
        }else{
            return "../data.json";
        }
    }
}