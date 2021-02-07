const Discord = require('discord.js');
const Ruthless = require('./lib/Client.js');
const Client = new Ruthless({disableMentions: "everyone"});
const fs = require('fs');
const User = Client.user;
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const path = require('path');

function registerCommands() {
    return new Promise(async(solve, reject) => {
        fs.readdir(__dirname + "/commands", (err, files) => {
            if (err) reject(err);
            files.forEach(category => {
                fs.readdir(__dirname + "/commands/"+ category, (err, commands) => {
                    if(err)return reject(err);
                    commands.forEach(command => {
                        if(!(command.split(".").pop() == "js")) return;
                        let Class = require(`${__dirname}/commands/${category}/${command}`);
                        let CMD = new Class(Client);
                        let commandName = CMD.options.name.toLowerCase();
                        Client.commands.set(commandName, Class);
                        if(CMD.options.aliases)CMD.options.aliases.forEach(alias => {
                          Client.aliases.set(alias.toLowerCase(), Class);
                        });
                    });
                });
                
            });
            solve();
        });
    })
}

Client.on("ready", () => {
    Client.user.setActivity('Ruthless gang | '+Client.settings.prefix+"help 🤖", {
        type: "COMPETING",
        url: "https://twitch.tv/elsexyatog"
    });
    let x = require('./data.json');
    x.discord.id = Client.user.id;
    fs.writeFileSync(path.join(__dirname, "data.json"), JSON.stringify(x), 'utf8');
    Client.logger.info("Sesión iniciada en: "+Client.user.tag);
    registerCommands().then(() => Client.logger.info("Se han cargado los comandos correctamente."));
});

Client.on("message", async(msg) => {
    if(msg.author.bot || !msg.guild || !msg.content.startsWith(Client.settings.prefix))return;
    const prefix = new RegExp(`^(<@!?${Client.user.id}>|${escapeRegex(Client.settings.prefix)})\\s*`);
    if(!prefix.test(msg.content))return;
    const [, matchedPrefix] = msg.content.match(prefix);
    let command = msg.content.split(" ")[0].slice(matchedPrefix.length).toLowerCase();
    if(!Client.commands.has(command) && !Client.aliases.has(command))return;
    let Cmd = Client.commands.get(command)||Client.aliases.get(command);
    let cmd = new Cmd(Client);
    await cmd._executeCMD_(msg);
    if(Client.settings.logExecutions)Client.logger.info(msg.author.tag+" ejecutó el comando: "+msg.content.slice(matchedPrefix.length));
});

Client.login(Client.data.discord.token).catch((e) => {
    //console.log(Client.data);
    Client.logger.error("No se ha podido conectar con la aplicación, ó el acceso dado no es válido.")
    process.exit(1);
});