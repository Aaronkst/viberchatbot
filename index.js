'use strict';

const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const express = require('express');
const app = express();
const viberMessage = require('./functions/viberMessage');

const bot = new ViberBot({
    authToken: process.env.VIBERTOKEN,
    name: "Aaron Chatbot",
    avatar: "http://viber.com/avatar.jpg"
});

app.use('/viber', bot.middleware());

//Placeholder status
app.get('/', (req,res)=>{
    res.status(200).send('Server is running');
});

//Get Started
bot.on(BotEvents.CONVERSATION_STARTED, async (userProfile, isSubscribed, context, onFinish) => {
    try{
        console.log(userProfile);
        console.log(context);
        //let message = viberMessage.convoStart(context, userProfile.name);
        //let send = await bot.sendMessage(userProfile, new TextMessage(message), 'TrackingData');
        //return send;
    } catch (err) {
        console.log(err);
        return;
    } 
});

//Conversation
bot.on(BotEvents.MESSAGE_RECEIVED, async (message, response) => {
    try {
        //let message = viberMessage.messageHandler(message);
    } catch (err) {
        //optional logging and error tracking
        console.log(err);
        return;
    }
});

app.listen(process.env.PORT || 3000, async () => {
    let webhook = await bot.setWebhook(`https://viber-bot-aaron.herokuapp.com/viber`)
    console.log(webhook);
});