'use strict';

const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const express = require('express');
const app = express();
const viberMessage = require('./functions/viberMessage');

const bot = new ViberBot({
    authToken: "4e1523bd2527d7fe-aca763d2f53b468e-babfba2d4e53f5f9",
    name: "Aaron Chatbot",
    avatar: "https://viber-bot-aaron.herokuapp.com/logo"
});

app.listen(process.env.PORT || 3000, () => {
    console.log('running');
})

app.use('/viber', bot.middleware());

app.get('/logo', (req,res)=>{
    res.status(200).sendFile('./img/chatbot.jpg');
});

app.get('/', (req,res)=>{
    res.status(200).send('Server is running');
});

bot.on(BotEvents.CONVERSATION_STARTED, (userProfile, isSubscribed, context, onFinish) => {
    console.log(userProfile);
    console.log(context);
    //let message = viberMessage.convoStart(context, userProfile.userProfile.name);
});