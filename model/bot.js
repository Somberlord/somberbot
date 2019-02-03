const guild = require('./guild.js');
const db = require('../db.js');


module.exports.data = {
    guilds: {},
    
    init: function() {
        if(typeof this.guilds ==='undefined' || !this.guilds) {
            this.guilds = {};
        }
    },
    
    loadGuilds: function(guildArray) {
        this.init();
        guildArray.forEach(function(elem) {
            tmpGuild = new guild.Guild(elem.id, elem.name);
            this.guilds[elem.id]['name'] = elem.name;
        });
    },
    
    updateGuilds: function(discordGuildArray) {
        let it = discordGuildArray.keys();
        discordIter = it.next();
        while(!discordIter.done) {
            dgId = discordIter.value;;
            discordGuild = discordGuildArray.get(dgId);
            if(discordGuild.available) {
                if(this.guilds.hasOwnProperty(dgId)) {
                    if(this.guilds[dgId]['name'] !== discordGuild.name) {
                        this.guilds[dgId]['name'] = discordGuild.name;
                        // todo update guild in db
                    }
                } else {
                    db.saveGuild(discordGuild);
                }
                this.guilds[dgId] = discordGuild;
            }
            discordIter = it.next();
        }
    },
    
    toString: function() {
        var str = "";
        for(var i = 0 ; i < this.guilds.length ; i++) {
            elem = this.guilds[i];
            str = str + "id:" + elem.id + ",name:" + elem.name + ", ";
        }
        return str;
    }
}
    