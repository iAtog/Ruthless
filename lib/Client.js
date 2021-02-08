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
    /**
     * Get the data file
     * @returns {String} Return the data file path
     */
    getData() {
        if(fs.existsSync(path.join(__dirname, "../personaldata.json"))) {
            return path.join(__dirname, "../personaldata.json");
        }else{
            return path.join(__dirname, "../data.json");
        }
    }
    /**
     * Get all blocked users
     * @returns {Array} The blocked users list
     */
    getBlockedUsers() {
        return this.settings.blockedUsers;
    }

    /**
     * Block a user form using the bot
     * @param {String} userID The user ID
     * @returns {Boolean} Return if the script executed correctly
     */
    blockUser(userID) {
        let set = require('../settings.json');
        if(set.blockedUsers.includes(userID))return false;
        set.blockedUsers.push(userID);
        fs.writeFileSync(path.join(__dirname, "../settings.json"), JSON.stringify(set), 'utf8');
        return true;
    }
}