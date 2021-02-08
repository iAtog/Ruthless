const Handler = require('../../lib/CommandHandler.js');
const {post} = require('node-superfetch');
const Discord = require('discord.js')

module.exports = class Eval extends Handler {
  constructor(client) {
    super(client, {
      name: "eval",
      category: "admin",
      description: "Evaluar un código.",
      ownerOnly: true,
      aliases: ["evaluate", "evaluar"],
      permissions: [],
      args: {
        min: 1,
        max: 0
      }
    });
  }

  async run(message, args) {
    const embed = new this.Discord.MessageEmbed()
  .addField("Input", "```js\n" + args.join(" ") + "```");
  
  try {
    let client = this.client;
    let msg = message;

    const code = args.join(" ");
   
    if (!code) return message.channel.send("Please include the code.");
    let evaled;
    if (code.includes(`SECRET`) || code.includes(`TOKEN`) || code.includes("process.env") || code.includes(`token`) || code.includes(`client.destroy`)) {
      evaled = "You Tried :D";
    } else {
      evaled = eval(code);
      
    }
    
    if (typeof evaled !== "string") evaled = require("util").inspect(evaled, {depth: 0});
    
    let output = clean(evaled);
    if (output.length > 1024) {
      const {body} = await post("https://hastebin.com/documents").send(output);
      embed.addField("Output", `https://hastebin.com/${body.key}.js`).setColor(0x7289DA);
    } else {
      embed.addField("Output", "```js\n" + output + "```").setColor(0x7289DA)
    }
    
    message.channel.send(embed);
    
  } catch (error) {
    let err = clean(error);
    if (err.length > 1024) {
      const {body} = await post("https://hastebin.com/documents").send(err);
      embed.addField("Output", `https://hastebin.com/${body.key}.js`).setColor("RED");
    } else {
      embed.addField("Output", "```js\n" + err + "```").setColor("RED");
    }
    
    message.channel.send(embed);
  }
  }
}

function clean(string) {
  if (typeof text === "string") {
    return string.replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203))
  } else {
    return string;
  }
}