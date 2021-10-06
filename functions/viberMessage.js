const TextMessage = require('viber-bot').Message.Text;
const RichMediaMessage = require('viber-bot').Message.RichMedia;
const rng = require('./rng');

const messageConstructor = async(obj = {}) => {
    try {
        let message = [];
        if(!obj.text) {
            message.push(new TextMessage('Internal Error, Intended message not loaded'));
            return message;
        }
        message.push(new TextMessage(obj.text))
        if(obj.richmedia){
            let carousel = {
                "ButtonsGroupColumns": 6,
                "ButtonsGroupRows": 6,
                "BgColor": "#FFFFFF",
                "Buttons": []
            }
            obj.richmediaPayload.forEach( item => {
                carousel.Buttons.push({
                    "ActionBody": item.actionBody,
                    "ActionType": "none",
                    "BgMediaType": "picture",
		            "Image": item.image,
                    "Rows": 3,
                    "Columns": 6
                })
                carousel.Buttons.push({
                    "ActionBody": item.actionBody,
                    "ActionType": "none",
                    "Text": `<b>${item.title}</b><br>${item.description}`,
                    "Rows": 2,
                    "Columns": 6
                })
                carousel.Buttons.push({
                    "ActionBody": item.actionBody,
                    "ActionType": "reply",
                    "BgColor": "#da2828",
                    "Text": `<font color="#FFFFFF">${item.button}</font>`,
                    "Rows": 1,
                    "Columns": 6
                })                    
            })
            message.push(new RichMediaMessage(carousel))
        }
        return message;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const convoStart = async(context, name) => {
    try{
        let message = { message: '', trackingData: 'Some stuff' };
        switch(context){
            case 'portfolio':
                message.message = await messageConstructor({
                    text: `Hello ${name}, hope you enjoyed my portfolio! This is my sample chatbot, feel free to test around`
                });
                break;
            default:
                message.message = await messageConstructor({
                    text: `Hello ${name}! Welcome to Aaron's Chatbot, feel free to test around`
                });
                break;
        };
        return message;
    } catch (error) {
        throw error;
    }
}

const messageHandler = async(message = {}, type = '') => {
    try {
        let text = message.text.toLowerCase();
        let resp = ''; let trackingData = '';
        if(type == 'text'){
            if(Object.keys(message.trackingData).length > 0){
                switch(message.trackingData) {
                    case '':
                        break;
                }
            } else {
                switch(text) {
                    case 'home':
                    case 'hi':
                    case 'hello':
                        //home message here
                        resp = {
                            text: 'What would you like to do?',
                            richmedia: true,
                            richmediaPayload: [
                                {
                                    actionBody: 'rngGame',
                                    image: "https://viber-bot-aaron.herokuapp.com/dice.jpg",
                                    title: 'RNG Game',
                                    description: 'Guess the random number',
                                    button: 'Play'
                                },
                                {
                                    actionBody: 'contactMe',
                                    image: "https://viber-bot-aaron.herokuapp.com/chatbot.jpg",
                                    title: 'Contact Me',
                                    description: 'Contact me for more details',
                                    button: 'Get contact info'
                                }
                            ]
                        }
                        break;
                    case 'rngGame':
                        //rngGame prompt
                        let rng = rng();
                        resp = {
                            text: 'Guess the missing number:' + rng.quiz;
                        }
                        trackingData = rng.answer;
                        break;
                }
            }
        }
        if(type == 'contact'){
            //contact message handler
        }
        if(type == 'location'){
            //location message handler
        }
        resp = await messageConstructor(resp);
        resp = {
            message: resp,
            trackingData: trackingData
        }
        return resp
    } catch (error) {
        throw error;
    }
}

module.exports = {
    convoStart: convoStart,
    messageHandler: messageHandler
};