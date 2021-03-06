'use strict';

const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const express = require('express');
const app = express();
const viberMessage = require('./functions/viberMessage');
const path = require('path');

const bot = new ViberBot({
    authToken: process.env.VIBERTOKEN,
    name: "Aaron Chatbot",
    avatar: "https://viber-bot-aaron.herokuapp.com/chatbot.jpg"
});

app.use('/viber', bot.middleware());
app.use(express.static(path.join(__dirname, 'public')));

//Placeholder status
app.get('/', (req,res)=>{
    res.status(200).send('Server is running');
});

//Webhook API
app.post('/setwebhook', express.json({ limit: '50mb' }), express.urlencoded({ extended: false }), async(req,res)=>{
    try {
        let webhook = await bot.setWebhook(req.body.url);
        return res.status(200).send(webhook);
    } catch(err) {
        return res.status(500).send(err);
    }
})

//Get Started
bot.on(BotEvents.CONVERSATION_STARTED, async (userProfile, isSubscribed, context, onFinish) => {
    try{
        let message = await viberMessage.convoStart(context, userProfile.userProfile.name);
        let send = await bot.sendMessage(userProfile.userProfile, message.message, [message.trackingData]);
        return send;
    } catch (err) {
        console.log(err);
        return;
    } 
});

//Conversation
bot.on(BotEvents.MESSAGE_RECEIVED, async (message, response) => {
    try {
        console.log(message);
        let type;
        if(message.text) type = 'text';
        if(message.contactPhoneNumber) type = 'contact';
        if(message.latitude) type = 'location';
        let resp = await viberMessage.messageHandler(message, type);
        await bot.sendMessage(response.userProfile, resp.message, [resp.trackingData]);
        return;
    } catch (err) {
        //optional logging and error tracking
        console.log(err);
        return;
    }
});

app.listen(process.env.PORT || 3000, async () => { console.log('Successfully started') });