const mongoose = require('mongoose'),
      Missions = require('../schemas/MissionSchema.js'),
      {Guild, User} = require('discord.js'),
      RuthlessClient = require('../Client');
require('dotenv').config();
//mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
//var connection = mongoose.connection;
module.exports = class MissionsObject {
    /**
     * @param {RuthlessClient} client The bot client
     */
    constructor(client) {
        this.client = client;
        //this.connection = connection;
    }

    /**
     * 
     * @param {String} guildID 
     * @param {String} missionID 
     */
    getMission(guildID, missionID) {
        if(guildID instanceof Guild)guildID = guildID.id;

    }

    getMissions(guildID="") {
        if(guildID instanceof Guild)guildID = guildID.id;
    }
    /**
     * 
     * @param {op} settings 
     */
    createMission(settings) {
        if(settings.guildID instanceof Guild)settings.guildID = settings.guildID.id;
        if(settings.owner instanceof User)settings.owner = settings.owner.id;
        return new Promise(async(s,r) => {
            if(!settings.description)return r("Descripcion no valida");
            if(!settings.name)return r("Nombre no valido");
            if(!settings.owner)return r("Dueño no valido");
            if(!settings.guild)return r("Servidor no valido");
            if(!settings.xp)return r("Experiencia no valida");
            if(!settings.rank.length)return r("Rangos no valido");
            const {description, name, owner, guild, xp, rank} = settings;
            new Missions({
                description,
                name,
                owner,
                guild, 
                xp,
                rank
            });
        });
    }
    fetchMissions() {

    }

    getMissionsByOwner() {
        
    }

    
}

function createID() {
    let r="",w="abcdefghijkmnopqrstuvwxyzABCDEFGHIJKMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 16; i++) {r += w.charAt(Math.floor(Math.random() * w.length));}
    return r;
}

var op = {
    guild: "",
    owner: "",
    name: "",
    description: "",
    xp: 1,
    rank: []
}