const HiyaServices = require('./HiyaServices')

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
 * Initialises the HiyaServices based on environment variables
 */
function createHiyaServices() {
    const hiyaServices = new HiyaServices(
        process.env.HIYA_HOST,
        process.env.HIYA_USERNAME,
        process.env.HIYA_PASSWORD,
        process.env.HIYA_PORT
    )
    return hiyaServices
}

/**
 * These functions are used to handle in incoming Lambda event and process
 * it using the relevant services.
 */
module.exports = {

    getHiyas: (event, context, callback) => {
        context.callbackWaitsForEmptyEventLoop = false

        const hiyaServices = createHiyaServices()

        hiyaServices.getHiyas()
            .then(hiyas => {
                callback(null, responses.success(hiyas))
            })
            .catch(error => {
                callback(null, responses.error(error))
            })
    },

    getHiya: (event, context, callback) => {
        context.callbackWaitsForEmptyEventLoop = false

        const hiyaServices = createHiyaServices()

        // Get the index parameter out of the event
        // console.log('event.pathParameters.index', event.pathParameters.index)
        const index = 1;
        if (event.pathParameters.index != undefined) {
            const index = event.pathParameters.index;
        }
        hiyaServices.getHiya(index)
            .then(hiya => {
                // Create a 'success' response object containing the e-mail we got
                // back from hiyaServices.getEmail()
                callback(null, responses.success(hiya))
            })
            .catch(error => {
                callback(null, responses.error(error))
            })
    },

    putHiya: (event, context, callback) => {
        context.callbackWaitsForEmptyEventLoop = false

        // Get and parse the body of the POST request
        const requestBody = JSON.parse(event.body)

        const hiyaServices = createHiyaServices()

        hiyaServices.puHiya(
                requestBody.id,
                requestBody.date,
                requestBody.title,
                requestBody.abstract
            )
            .then((info) => {
                callback(null, responses.success(info))
            })
            .catch(error => {
                callback(null, responses.error(error))
            })
    }
}
