const Discord = require('discord.js');
const Ruthless = require('./lib/Client.js');
const Client = new Ruthless({disableMentions: "everyone"});
const fs = require('fs');
const User = Client.user;
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const path = require('path');

function registerCommands() {
    return new Promise(async(s, r) => {
        fs.readdir(__dirname + "/commands", (err, files) => {
            if (err) r(err);
            files.forEach(category => {
                fs.readdir(__dirname + "/commands/"+ category, (err, commands) => {
                    if(err)return r(err);
                    commands.forEach(command => {
                        if(!(command.split(".").pop() == "js")) return;
                        let Class = require(`${__dirname}/commands/${category}/${command}`);
                        let CMD = new Class(Client);
                        if(!CMD.options.name || !CMD.options.description || !CMD.options.category) return Client.logger.error("El comando '"+command.split(".")[0]+"' necesita más especificaciones.")
                        let commandName = CMD.options.name.toLowerCase();
                        Client.commands.set(commandName, Class);
                        if(CMD.options.aliases)CMD.options.aliases.forEach(alias => {
                          Client.aliases.set(alias.toLowerCase(), Class);
                        });
                    });
                });
            });
            s();
        });
    });
}
function registerEvents() {
    return new Promise(async(s, r) => {
        fs.readdir(__dirname + "/events", (err, files) => {
            if(err)return r(err);
            files.forEach(event => {
                if(!(event.split(".").pop() == "js")) return;
                const Handler = require('./lib/EventHandler.js');
                let Event = require(`${__dirname}/events/${event}`);
                if(!(new Event().eventHandler))return Client.logger.severe("El evento: '"+event+"' no forma parte del handler");
                let e = new Event(Client);
                e.__processEvent();
                Client.logger.info("Se registró el evento: \""+e.eventName+"\"")
            });
            s();
        });
    })
}

registerEvents().then(() => Client.logger.info("Eventos cargados correctamente."));

Client.on("ready", () => {
    Client.user.setActivity('Ruthless gang | '+Client.settings.prefix+"help 🤖", {
        type: Client.settings.presence,
        url: Client.settings.url
    });
    let x = require(Client.getData());
    x.discord.id = Client.user.id;
    fs.writeFileSync(path.join(__dirname, "data.json"), JSON.stringify(x), 'utf8');
    Client.logger.info("Sesión iniciada en: "+Client.user.tag);
    registerCommands().then(() => Client.logger.info("Se han cargado los comandos correctamente."));
});

Client.on("message", async(msg) => {
    if(msg.author.bot || !msg.guild || !msg.content.startsWith(Client.settings.prefix))return;
    const prefix = new RegExp(`^(<@!?${Client.user.id}>\\s|${escapeRegex(Client.settings.prefix)})\\s*`);
    if(!prefix.test(msg.content))return;
    const [, matchedPrefix] = msg.content.match(prefix);
    let command = msg.content.split(" ")[0].slice(matchedPrefix.length).toLowerCase();
    if(!Client.commands.has(command) && !Client.aliases.has(command))return;
    let Cmd = Client.commands.get(command)||Client.aliases.get(command);
    let cmd = new Cmd(Client);
    await cmd.processCommand(msg);
    if(Client.settings.logExecutions)Client.logger.info(msg.author.tag+" ejecutó el comando: "+msg.content.slice(matchedPrefix.length));
});

Client.login(Client.data.discord.token).catch((e) => {
    //console.log(Client.data);
    Client.logger.error("No se ha podido conectar con la aplicación, ó el acceso dado no es válido.")
    process.exit(1);
});