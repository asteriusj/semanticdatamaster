/*
 *  Interface definitions and resposne headers for Lambda functions
 *  These are the Methods that are exposed for functions and are used to bind to 
 *  API Gateway ... 
 */

const TransformServices = require('./TransformServices')

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

/**
 * Initialises the TransformServices based on environment variables
 */
function createTransformServices() {
    const transformServices = new TransformServices(

    )
    return transformServices
}

/**
 * These functions are used to handle in incoming Lambda event and process
 * it using the relevant services.
 */
module.exports = {


    CreatePerson: (event, context, callback) => {
        context.callbackWaitsForEmptyEventLoop = false

        // Get and parse the body of the POST request
        // const requestBody = JSON.parse(event.body)

        const transform = createTransformServices()

        transform.createPerson(event)
            .then((info) => {
                info['ADDED'] = 'Came form perseServices.createPerson call'
                callback(null, responses.success(info))
            })
            .catch(error => {
                error['ADDED'] = 'Came form perseServices.createPerson call'
                callback(null, responses.error(error))
            })
    },

    jsonschema2owljsonld: (event, context, callback) => {
        context.callbackWaitsForEmptyEventLoop = false

        const transform = createTransformServices()

        transform.JSONSchema2OWLJSONLD(event, context)
            .then(hiyas => {
                callback(null, responses.success(hiyas))
            })
            .catch(error => {
                callback(null, responses.error(error))
            })
    },

    owljsonld2jsonschema: (event, context, callback) => {
        context.callbackWaitsForEmptyEventLoop = false

        const transform = createTransformServices()

        transform.JSONSchema2OWLJSONLD(event, context)
            .then(hiyas => {
                callback(null, responses.success(hiyas))
            })
            .catch(error => {
                callback(null, responses.error(error))
            })
    }



}
