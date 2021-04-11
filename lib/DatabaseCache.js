let Discord = require('discord.js');
module.exports = class Cache {
    /**
     * My custom database cache, this get the mongodb database and store locally
     * @author iAtog
     */
    constructor() {
        this.cache = new Discord.Collection();
        this.guild = false;
    }

    /**
     * Set the guild to get data
     * @param {String} guildID 
     */
    setGuild(guildID) {
        this.guild = guildID;
        return this;
    }

    /**
     * Get data form key if exists
     * @param {String} key the key to search in
     * @returns {Object} {error} or {key,value,ms}
     * @readonly
     */
    get(key) {
        
    }

    /**
     * Set an existing key in the cache
     * @param {String} key 
     * @param {any} value 
     */
    set(key, value) {
        
    }
    
    /**
     * Add data to the cache
     * @param {String} key 
     * @param {any} value 
     */
    add(key, value) {
        
    }
    /**
     * 
     * @param {String[]} keys 
     */
    addAll(object) {

    }

    /**
     * Load the cache
     */
    load() {

    }
}
new Cache();