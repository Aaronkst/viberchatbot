// templaet function ( button divid by array size);

const convoStart = async(context, name) => {
    let message = `Hello ${name}! Welcome to Aaron's Chatbot, feel free to test around`;
    switch(context){
        case 'portfolio':
            message = `Hello ${name}, hope you enjoyed my portfolio! This is my sample chatbot, feel free to test around`
            break;
    };
    return message;
}

const messageHandler = async(message = {}, type = '') => {
    try {
        let resp = '';
        if(type == 'text'){
            if(message.trackingData[0]){
                switch(message.trackingData[0]) {
                    case '':
                        break;
                }
            } else {
                switch(message.text) {
                    case 'Home':
                        //home message here
                        resp = {
                            message: 'What would you like to do?',
                            richmedia: true,
                            richmediaObj: {},
                            keyboard: true,
                            keyboardObj: {
                                "Type": "keyboard",
                                "Revision": 1,
                                "Buttons": [{
                                    "Columns": 6,
                                    "Rows": 1,
                                    "BgColor": "#0dcaf0",
                                    "ActionType": "reply",
                                    "ActionBody": `Home`,
                                    "Text": "Home"
                                }]
                            }
                        }
                        break;
                }
            }
        }
        if(type == 'contact'){
            if(message.trackingData[0]){
                switch(message.trackingData[0]) {
                    case '':
                        break;
                }
            } else {
                resp = {
                    message: 'Message is not recognized',
                    keyboard: true,
                    keyboardObj: {
                        "Type": "keyboard",
                        "Revision": 1,
                        "Buttons": [{
                            "Columns": 6,
                            "Rows": 1,
                            "BgColor": "#0dcaf0",
                            "ActionType": "reply",
                            "ActionBody": `Home`,
                            "Text": "Home"
                        }]
                    }
                }
            }
        }
        if(type == 'location'){

        }
        return resp;
    } catch (error) {
        return { status: 'error', err: error };
    }
}

module.exports = {
    convoStart: convoStart,
};