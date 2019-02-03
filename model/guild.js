const mongoose = require('mongoose');

class Guild {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    
    toString() {
        return "Id : " + this.id + " Nom : " + this.name;
    }
}

module.exports.Guild = Guild;

var guildSchema = mongoose.Schema({
    id: String,
    name: String
});

var guildModel = mongoose.model('Guild', guildSchema);

module.exports.model = guildModel;