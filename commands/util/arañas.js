const Handler = require('../../lib/CommandHandler'),
      {Message} = require('discord.js');

module.exports = class Missions extends Handler {
    constructor(client) {
      super(client, {
        name: "arañas",
        category: "gang",
        description: "Las arañas.",
        ownerOnly: true,
        aliases: ["spiders"],
        permissions: []
      });
    }
    /**
     * @param {Message} msg 
     * @param {String[]} args 
     */
    run(msg, args) {
        /**let tagged = msg.mentions.users.first() || this.client.users.cache.get(args[0]);
        if(!tagged)tagged = msg.member;
        else tagged = msg.guild.members.cache.get(tagged.id);
        if(tagged.nickname) {
            if(!tagged.nickname.startsWith("Araña"))return;
            let p = tagged.nickname.split(":");
            let number = p[0].split("#")[1];
            let name = p[1].slice(1).replace(".","");
            msg.channel.send("> Datos\n\nEres la araña #"+number+" y te llamas: "+name);
        }*/
        //return;
        
    }
}