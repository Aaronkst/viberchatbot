const convoStart = async(context, name) => {
    let message = `Hello ${name}! Welcome to Aaron's Chatbot, feel free to test around`;
    switch(context){
        case 'portfolio':
            message = `Hello ${name}, hope you enjoyed my portfolio! This is my sample chatbot, feel free to test around`
            break;
    };
    return {
        type: 'text',
        message: message,
        keyboard: false,
        trackData: 'home'
    };
}

const messageHandler = async(message = {}) => {
    try {

    } catch (error) {
        return { status: 'error', err: error };
    }
}

module.exports = {
    convoStart: convoStart,
};