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
    avatar: path.join(__dirname, 'chatbot.jpg')
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
        console.log(userProfile.userProfile)
        console.log(context)
        let message = await viberMessage.convoStart(context, userProfile.userProfile.name);
        console.log(message)
        let send = await bot.sendMessage(userProfile.userProfile, message.message, message.trackingData || null);
        console.log(send)
        return send;
    } catch (err) {
        console.log(err);
        return;
    } 
});

//Conversation
bot.on(BotEvents.MESSAGE_RECEIVED, async (message, response) => {
    console.log(message);
    try {
        //let message = viberMessage.messageHandler(message);
    } catch (err) {
        //optional logging and error tracking
        console.log(err);
        return;
    }
});

app.listen(process.env.PORT || 3000, async () => { console.log('Successfully started') });