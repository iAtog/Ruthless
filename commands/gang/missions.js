const Handler = require('../../lib/CommandHandler'),
      {Message} = require('discord.js');

module.exports = class Missions extends Handler {
    constructor(client) {
      super(client, {
        name: "missions",
        category: "gang",
        description: "Menú interactivo de misiones.",
        ownerOnly: true,
        aliases: ["misión", "mision", "misiones"],
        permissions: []
      });
    }
    /**
     * @param {Message} msg 
     * @param {String[]} args 
     */
    run(msg, args) {
      
    }
}