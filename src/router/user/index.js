const { ApiError } = require('../../utils/handlResponse')

const test = (req) => {
    try {
        console.log(req);
        return true
    } catch (error) {
        return error
    }
}

const webhook = (dataBody) => {
    try {
        return dataBody
    } catch (error) {
        return error
    }
}

module.exports = {
    test,
    webhook
}