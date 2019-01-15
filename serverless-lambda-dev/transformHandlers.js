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

// const GSheetServices = require('./GSheetServices')
// const TranslateServices = require('./TranslateServices')
// const EnhanceServices = require('./EnhanceServices')
const TransformServices = require('./lib/TransformServices')

// /**
//  * Initialises the TransformServices based on environment variables
//  */
function createTransformServices() {
    console.error('createTransformServices')
    try {
        const t = new TransformServices()
        return t
    }
    catch (e) { console.error(e) }
}


module.exports.helloWorld = (event, context, callback) => {
    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        },
        body: JSON.stringify({
            message: 'Your TRANSFORM SERVICES function executed successfully!',
            input: event,
        }),
    };

    callback(null, response);
};

module.exports.json2jsonld = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false

    const transform = createTransformServices()

    // console.log('event', event)
    transform.Json2JsonLd(event, context)
        .then(data => {
            callback(null, responses.success(data))
        })
        .catch(error => {
            callback(null, responses.error(' transform.Json2JsonLd error:', error))
        })

};
