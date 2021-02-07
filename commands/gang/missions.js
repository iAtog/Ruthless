module.exports = class Eval extends Handler {
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

    run(msg, args) {
        
    }
}