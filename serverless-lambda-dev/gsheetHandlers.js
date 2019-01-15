'use strict';

/**
 * Base response HTTP headers
 */
const responseHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS 
}

/**
 * HTTP response templates
 */
const responses = {
    success: (data = {}, code = 200) => {
        return {
            'statusCode': code,
            'headers': responseHeaders,
            'body': JSON.stringify(data)
        }
    },
    error: (error) => {
        return {
            'statusCode': error.code || 500,
            'headers': responseHeaders,
            'body': JSON.stringify(error)
        }
    }
}

const GSheetServices = require('./GSheetServices')

/**
 * Initialises the GSheetServices based on environment variables
 */
function createGSheetServices() {
    const gSheetServices = new GSheetServices(

    )
    return gSheetServices
}



module.exports.helloWorld = (event, context, callback) => {
    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        },
        body: JSON.stringify({
            message: 'Go Serverless v1.0! Your function executed successfully!',
            input: event,
        }),
    };

    callback(null, response);
};



module.exports.getGSheet = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false

    const gsheet = createGSheetServices()

    // console.log('event', event)
    gsheet.GetGSheet(event, context)
        .then(data => {
            callback(null, responses.success(data))
        })
        .catch(error => {
            callback(null, responses.error('error:', error))
        })

};


module.exports.getSheetEntities = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false

    const gsheet = createGSheetServices()

    // console.log('event', event)
    gsheet.GetSheetEntities(event, context)
        .then(data => {
            callback(null, responses.success(data))
        })
        .catch(error => {
            callback(null, responses.error('error:', error))
        })

};
