const mongoose = require('mongoose'),
      Missions = require('../schemas/MissionSchema.js'),
      {Guild} = require('discord.js'),
      RuthlessClient = require('../Client');
//mongoose.connect("", {useNewUrlParser: true});

module.exports = class MissionsObject {
    constructor(client=new RuthlessClient()) {
        this.client = client;
    }

    getMission(guildID="", missionID="") {
        if(guildID instanceof Guild)guildID = guildID.id;

    }

    getMissions(guildID="") {
        if(guildID instanceof Guild)guildID = guildID.id;
    }

    createMission(settings=op) {
        if(settings.guildID instanceof Guild)settings.guildID = settings.guildID.id;
        return new Promise(async(s,r) => {
            if(!settings.description)return r("Descripcion no valida");
            if(!settings.name)return r("Nombre no valido");
            if(!settings.owner)return r("Dueño no valido");
            if(!settings.guild)return r("Servidor no valido");
            if(!settings.xp)return r("Experiencia no valida");
            if(!settings.rank.length)return r("Rangos no valido");
            
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