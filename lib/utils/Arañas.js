let Client = require('../Client');
let Discord = require('discord.js');
module.exports = class Arañas {
    /**
     * Client
     * @param {Client} client 
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * @returns {Discord.Collection}
     */
    getSpiders() {
        let c = new Discord.Collection();
        this.client.guilds.cache.get('796575549677109248').members.cache.forEach(m => {
            if(m.nickname) {
                if(m.nickname.startsWith("Araña")) {
                    let p = m.nickname.split(":");
                    let number = p[0].split("#")[1];
                    let name = p[1].slice(1).replace(".","");
                    let id = m.user.id;
                    c.set(parseInt(number), new Spider(parseInt(number), name, id));
                }
            }
        });
        return c;
    }
    /**
     * Get the spider by number ID
     * @param {Number} ID 
     * @returns {Spider}
     */
    getSpider(ID) {
        if(ID < 0 || ID > 12)return new Spider((1-3), "incorrect", "666666666666");
        let spider = this.getSpiders();
        let data = spider.get(ID);
        return data;
    }
}

class Spider {
    /**
     * @param {String} ID 
     * @param {String} NAME 
     * @param {String} DID 
     */
    constructor(ID, NAME, DID) {
        this.id = ID;
        this.name = NAME;
        this.dID = DID;
    }
    /**
     * @returns {Number}
     */
    getID() {
        return this.id;
    }

    /**
     * @returns {String}
     */
    getDiscordID() {
        return this.dID;
    }

    /**
     * @returns {String}
     */
    getName() {
        return this.name;
    }
}