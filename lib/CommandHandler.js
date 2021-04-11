const {Message} = require('discord.js');
const RuthlessClient = require('./Client');
/**
 * This command handler was been created by iAtog
 * 
 * All rights reserved.
 * 
 * @constructor The bot client and the command settings
 * 
 * */
module.exports = class CommandHandler {
    /**
     * 
     * @param {RuthlessClient} client Client of the bot
     * @param {Object} options Command options, example: name, description, permissions, etc.
     */
    constructor(client, options) {
        this.client = client;
        this.options = options;
        this.settings = options;
        this.Discord = require('discord.js');
        this.user = {};
    }

    /**
     * Process the command to setup all features.
     * @param {String} msg Event message
     */
    async processCommand(msg) {
        let permissed = true;
        if(this.options.ownerOnly)if(!this.client.data.auth.authorized_users.includes(msg.author.id))return;
        if(msg.guild)this.user = {color: msg.member.displayHexColor === '#000000' ? 'RANDOM':msg.member.displayHexColor};
        else this.user = {color: 'RANDOM'}
        let args = msg.content.trim().split(' ').slice(1);
        if(this.options.permissions)this.options.permissions.forEach(permission => {if(permission.trim() != ""){permissed = msg.member.hasPermission(permission.toUpperCase());}});
        if(permissed){
            if(this.options.args)if(this.options.args.min && this.options.args.max)if((this.options.args.max == -1 ? false : args.length > this.options.args.max) || args.length < this.options.args.min) return msg.channel.send(':warning: Correct usage: **'+this.options.usage+'**');
            try {
                this.run(msg, args);
            }catch(err) {
                console.log(err);
                let embed = new this.Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("Error")
                .setDescription("Ha ocurrido un error:")
                .setFooter(msg.author.username, msg.author.avatarURL())
                .addField("__Comando__", "`"+msg.content.split(" ")[0]+"`")
                .addField("__Stack__", err.stack);
                msg.channel.send(embed);
            }
        }else{
          let embed = new this.Discord.MessageEmbed()
          .setDescription(":warning: <@"+msg.author.id+">\n You don't have permission to do this.")
          .setColor(this.user.hexColor)
          msg.channel.send(embed);
        }
    }

    /**
     * The run command script.
     * @param {Message} msg The message object of the event
     * @param {Array<String>} args The arguments of the command splitting the first arg.
     */
    run(msg, args) {
        throw new Error("Define \"run(Message, Array<String>))\"");
    }

    /**
     * Check if that id is of a one of the bot owners.
     * @param {String} ID The id to check
     */
    isOwner(ID) {
      if(this.client.data.auth.authorized_users.includes(ID))return true;
      else return false;
    }
}