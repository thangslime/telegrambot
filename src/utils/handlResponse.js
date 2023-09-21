const handleResponse = (res, data) => {
    try {
        const response = {
            status: 200,
            data: data
        }
        res.status(data.status && data.status != 200 ? data.status : 200).send(data.status && data.status != 200 ? data : response)
    } catch (error) {
        res.status(500).send({status: 500, message: 'Internal Error Server'})
    }
}

class ApiError extends Error {
    constructor(status, errorCode, message) {
        super(message);
        this.status = status;
        this.errorCode = errorCode;
        this.errorMessage = message;
    }
}
module.exports = {
    handleResponse,
    ApiError
}
