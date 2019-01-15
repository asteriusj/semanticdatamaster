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
const TranslateServices = require('./lib/TranslateServices')
// const EnhanceServices = require('./EnhanceServices')

// /**
//  * Initialises the TranslateServices based on environment variables
//  */
function createTranslateServices() {
    // console.error('createTranslateServices')
    try {
        const t = new TranslateServices()
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
            message: ' Your TranslateServicesfunction executed successfully!',
            input: event,
        }),
    };

    callback(null, response);
};


// module.exports.csv2csv = (event, context, callback) => {
//     const response = {
//         statusCode: 200,
//         headers: {
//             'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//         },
//         body: JSON.stringify({
//             message: 'Go CSV test function sucessful!',
//             input: event,
//         }),
//     };

//     callback(null, response);
// };


module.exports.csv2json = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    console.log('csv2json event:', event)

    try {

        const translate = createTranslateServices()

        translate.CSV2JSON(event, context)
            .then(data => {
                console.log('translate.CSV2JSON data:', data)
                callback(null, responses.success(data))
            })
            .catch(error => {
                callback(null, responses.error('translate.CSV2JSON error:', error))
            })

    }
    catch (e) {
        callback(null, responses.error('csv2json e:', e))
    }

};


module.exports.json2csv = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    console.log('json2csv event ', event)

    const translate = createTranslateServices()


    translate.JSON2CSV(event, context)
        .then(data => {
            console.log('translate.JSON2CSV data:', data)
            callback(null, responses.success(data))
        })
        .catch(error => {
            callback(null, responses.error('translate.JSON2CSV error:', error))
        })

};


module.exports.json2jsonld = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    // console.log('json2jsonld event ', event)

    const translate = createTranslateServices()


    translate.JSON2JSONLD(event, context)
        .then(data => {
            console.log('translate.JSON2JSONLD data:', data)

            // set response forjsonld content

            const jsonldResponse = {
                success: (data = {}, code = 200) => {
                    return {
                        'statusCode': code,
                        'headers': {
                            'Content-Type': 'application/ld+json',
                            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
                            'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS 
                        },
                        'body': JSON.stringify(data)
                    }
                }
            }



            callback(null, jsonldResponse.success(data))

        })
        .catch(error => {
            callback(null, responses.error('translate.JSON2JSONLD error:', error))
        })

};
