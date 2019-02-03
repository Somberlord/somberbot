var mongoose = require('mongoose');
var Guild = require('./model/guild.js');

var mongoUrl = "mongodb://localhost:27017/somberbot";

module.exports.init = function() {
    mongoose.connect(mongoUrl, { useNewUrlParser: true });
    var db = mongoose.connection; 
    db.on('error', console.error.bind(console, 'Erreur lors de la connexion')); 
    db.once('open', function (){
        console.log("Connexion à la base OK"); 
    }); 
}


module.exports.saveGuild = function(inGuild) {
    var guild = new Guild.model();
    guild.id = inGuild.id;
    guild.name = inGuild.name;
    guild.save(function(err){
        if(err){
            console.log(err);
        }
    });
}

module.exports.loadGuilds = function(callback) {
    Guild.model.find(callback);
}