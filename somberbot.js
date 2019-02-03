const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.js');
const db = require('./db.js');
const guild = require('./model/guild.js');
const bot = require('./model/bot.js').data;

client.on('ready', () => {
    console.log("Connected as " + client.user.tag);
    // List servers the bot is connected to
    console.log("Servers:");
    client.guilds.forEach((guild) => {
        /*if(guild.available) {
            db.saveGuild(guild.id, guild.name);
        }*/
        console.log(" - " + guild.name)

        // List all channels
        /*guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })*/
    })
    client.user.setActivity("JavaScript")
    db.init();
    
    
    
    
    var testChannel = client.channels.get("541267196383461396") // Replace with known channel ID
    testChannel.send("Bonjoir, je suis le bot !");

    db.loadGuilds(function(err, results) {
        console.log("guild charges");
        if (err){
            testChannel.send(err); 
        } else {
            bot.loadGuilds(results);
            console.log("bot charge");
            console.log(bot.toString())
            bot.updateGuilds(client.guilds);
        }
    });
    
    
})

client.on('message', (receivedMessage) => {
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) {
        return
    }

     // Check if the bot's user was tagged in the message
    if (receivedMessage.content.includes(client.user.toString()) || receivedMessage.channel.type == 'dm') {
        // Send acknowledgement message
        receivedMessage.channel.send("Message received from " +
            receivedMessage.author.toString() + ": " + receivedMessage.content)
    }
})



client.login(config.token);