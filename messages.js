const messageType = require('./messages-type.js');
const {
    REQUEST_LATEST_BLOCK,
    RECEIVE_LATEST_BLOCK,
    REQUEST_LATEST_BLOCKCHAIN,
    RECEIVE_LATEST_BLOCKCHAIN
} = messageType;
class Messages {
    static getLatestBlock() {
        return {
            type: RECEIVE_LATEST_BLOCK,
        };
    }

    static sendLatestBlock(block) {
        return {
            type: RECEIVE_LATEST_BLOCK,
            data: block
        };
    }

    static getBlockchain() {
        return {
            type: RECEIVE_LATEST_BLOCKCHAIN
        };
    }
    static sendBlockchaain(Blockchain) {
        return {
            type: RECEIVE_LATEST_BLOCKCHAIN,
            data: Blockchain
        };
    }
}



module.exports = Messages;