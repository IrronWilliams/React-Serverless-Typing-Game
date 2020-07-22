exports.handler = (event, context, callback) => { //only using event
    return {
        statusCode: 200,
        body: JSON.stringify({
            msg: 'Hello World',
        }),
    }

}