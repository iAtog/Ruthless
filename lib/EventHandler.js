const RuthlessClient = require('./Client');
/**
 * This code was been created by iAtog,
 * don't distribute this
 */
module.exports = class EventHandler {
    /**
     * @param {RuthlessClient} client 
     * @param {String} eventName 
     */
    constructor(client, eventName) {
        this.client=client;
        this.eventName=eventName;
        this.eventHandler = true;
    }

    __processEvent() {
        this.client.on(this.eventName, (...args) => {
            if(this.client.settings.diabledEvents.includes(this.eventName))return;
            this.onEvent(...args);
        });
    }
    /**
     * @param  {...any} args The args 
     */
    onEvent(...args) {
        throw new Error("onEvent() method is invalid");
    }
}