/**
 * This command handler was been created by iAtog
 * 
 * All rights reserved.
 */
module.exports = class CommandHandler {
    constructor(client = require('./Client'), options) {
        this.client = client;
        this.options = options;
        this.settings = options;
        this.Discord = require('discord.js');
        this.user = {};
    }

    async _executeCMD_(msg) {
        let permissed = true;
        if(this.options.ownerOnly)if(!this.client.data.auth.authorized_users.includes(msg.author.id))return;
        if(msg.guild)this.user = {hexColor: msg.member.displayHexColor === '#000000' ? 'RANDOM':msg.member.displayHexColor};
        else this.user = {hexColor: 'RANDOM'}
        let args = msg.content.trim().split(' ').slice(1);
        if(this.options.permissions)this.options.permissions.forEach(permission => {if(permission.trim() != ""){permissed = msg.member.hasPermission(permission.toUpperCase());}});
        if(permissed){
            if(this.options.args.min && this.options.args.max)if((this.options.args.max == -1 ? false : args.length > this.options.args.max) || args.length < this.options.args.min) return msg.channel.send(':warning: Correct usage: **'+this.options.usage+'**');
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
                msg.channel.send(embed)
            }
        }else{
          let embed = new this.Discord.MessageEmbed()
          .setDescription(":warning: <@"+msg.author.id+">\n You don't have permission to do this.")
          .setColor(this.user.hexColor)
          msg.channel.send(embed);
        }
    }

    run(msg, args) {
        throw new Error("Define \"run(Message, Array<String>))\"");
    }


    isOwner(ID) {
      if(this.client.data.auth.authorized_users.includes(ID))return true;
      else return false;
    }
}