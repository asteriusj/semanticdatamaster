const SemanticDataServices = require('./SemanticDataServices')

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

let arrHiyas = [
    {
        "id": 1,
        "date": "01-01-1971",
        "title": "My first Hiya",
        "abstrqct": " HIYA !"
        },
    {
        "id": 2,
        "date": "02-01-1971",
        "title": "My second Hiya",
        "abstrqct": " HIYA HIYA !"
        },
    {
        "id": 3,
        "date": "03-01-1971",
        "title": "My third one",
        "abstrqct": " Yes, this is the 3rd HIYA"
        }

    ]

/**
 * Initialises the SemanticDataServices based on environment variables
 */
function createSemanticDataServices() {
    const SemDatSrvs = new SemanticDataServices(
        process.env._HOST,
        process.env._USERNAME,
        process.env._PASSWORD

    )
    return SemDatSrvs
}

/**
 * These functions are used to handle in incoming Lambda event and process
 * it using the relevant services.
 */
module.exports = {

    getDemDatSrvs: (event, context, callback) => {
        context.callbackWaitsForEmptyEventLoop = false

        const SemanticDataServices = createSemanticDataServices()

        SemDatSrvs.getDemDatSrvs()
            .then(semdatsrvs => {
                callback(null, responses.success(emails))
            })
            .catch(error => {
                callback(null, responses.error(error))
            })
    },

    getDemDatSrv: (event, context, callback) => {
        context.callbackWaitsForEmptyEventLoop = false

        const SemDatSrvs = createSemanticDataServices()

        // Get the index parameter out of the event
        const index = event.pathParameters.index
        SemDatSrvs.getDemDatSrv(index)
            .then(semdatsrv => {
                // Create a 'success' response object containing the SemDatSrv we got
                // back from getDemDatSrvs.getDemDatSrvs()
                callback(null, responses.success(semdatsrv))
            })
            .catch(error => {
                callback(null, responses.error(error))
            })
    },

    putSemDatSrv: (event, context, callback) => {
        context.callbackWaitsForEmptyEventLoop = false

        // Get and parse the body of the POST request
        const requestBody = JSON.parse(event.body)

        const SemDatSrvs = createSemanticDataServices()

        SemDatSrvs.putSemDatSrv(
                requestBody.from,
                requestBody.to,
                requestBody.subject,
                requestBody.body
            )
            .then((info) => {
                callback(null, responses.success(info))
            })
            .catch(error => {
                callback(null, responses.error(error))
            })
    },

    updateSemDatSrv: (event, context, callback) => {
        context.callbackWaitsForEmptyEventLoop = false

        // Get and parse the body of the POST request
        const requestBody = JSON.parse(event.body)

        const SemDatSrvs = createSemanticDataServices()

        SemDatSrvs.updateSemDatSrv(
                requestBody.from,
                requestBody.to,
                requestBody.subject,
                requestBody.body
            )
            .then((info) => {
                callback(null, responses.success(info))
            })
            .catch(error => {
                callback(null, responses.error(error))
            })
    },

    deleteSemDatSrv: (event, context, callback) => {
        context.callbackWaitsForEmptyEventLoop = false

        const SemDatSrvs = createSemanticDataServices()

        // Get the index parameter out of the event
        const index = event.pathParameters.index
        SemDatSrvs.deleteSemDatSrv(index)
            .then(semdatsrv => {
                // Create a 'success' response object containing the SemDatSrv we got
                // back from SemDatSrvs.deleteSemDatSrv()
                callback(null, responses.success(semdatsrv))
            })
            .catch(error => {
                callback(null, responses.error(error))
            })
    },

}
