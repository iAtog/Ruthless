const EventHandler = require('../lib/EventHandler');

module.exports = class MessageEvent extends EventHandler {

    constructor(client) {
        super(client, "message");
    }

    onEvent(message) {
        if(message.author.username === "iAtog") {
            message.channel.send("Handler funcionando");
        }
    }
}