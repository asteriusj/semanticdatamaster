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
const EnhanceServices = require('./EnhanceServices')

/**
 * Initialises the TranslateServices based on environment variables
 */
function createEnhanceServices() {
    const enhance = new EnhanceServices(

    )
    return enhance
}



module.exports.helloWorld = (event, context, callback) => {
    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        },
        body: JSON.stringify({
            message: 'Your ENHANCE SERVICES function executed successfully!',
            input: event,
        }),
    };

    callback(null, response);
};

module.exports.jsonmetadata = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false

    const enhance = new EnhanceServices()

    enhance.JsonMetadata(event)
        .then(data => {
            console.log('enhance.JsonMetadata data', data)
            callback(null, responses.success(data))
        })
        .catch(error => {
            console.log('enhance.JsonMetadataerror', error)
            callback(null, responses.error('error:', error))
        })

};

module.exports.dbpedialookup = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    console.log('event', event)
    const enhance = new EnhanceServices()

    let _entity = null
    if (event.queryStringParameters != undefined) {
        _entity = event.queryStringParameters.entity || _entity;
    };
    if (event.entity != undefined) {
        _entity = event.entity || _entity;
    };
    let _string = null
    if (event.pathParameters != undefined) {
        _string = event.pathParameters.string || _string;
    };
    if (event.string != undefined) {
        _string = event.string || _string;
    };
    let param = _entity || _string || ""
    console.log('param:', param)

    enhance.DBPediaLookUp(param)
        .then(data => {
            console.log('enhance.DBPediaLookUp data', data)
            callback(null, responses.success(data))
        })
        .catch(error => {
            console.log('enhance.DBPediaLookUp', error)
            callback(null, responses.error(error))
        })

};
