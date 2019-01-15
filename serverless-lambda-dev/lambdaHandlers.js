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

// const TransformServices = require('./TransformServices')
// const TranslateServices = require('./TranslateServices')
// const EnhanceServices = require('./EnhanceServices.js')

/**
 * Initialises the Services based on environment variables
 */
// function createTransformServices() {
//   const transformServices = new TransformServices(

//   )
//   return transformServices
// }

// function createTranslateServices() {
//   const translateServices = new TranslateServices(

//   )
//   return translateServices
// }

module.exports.helloWorld = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your lamdaHandlers function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);
};



// module.exports.shacl2jsonschema = (event, context, callback) => {
//   context.callbackWaitsForEmptyEventLoop = false

//   const transform = createTransformServices()

//   console.log('event', event)
//   transform.SHACL2JSONSchema(event)
//     .then(hiyas => {
//       callback(null, responses.success(hiyas))
//     })
//     .catch(error => {
//       callback(null, responses.error('error:', error))
//     })

// };

// module.exports.jsonschema2shacl = (event, context, callback) => {
//   context.callbackWaitsForEmptyEventLoop = false

//   const transform = createTransformServices()

//   console.log('event', event)
//   transform.JSONSchema2SHACL(event)
//     .then(hiyas => {
//       callback(null, responses.success(hiyas))
//     })
//     .catch(error => {
//       callback(null, responses.error('error:', error))
//     })

// };

// module.exports.jsonschema2owljsonld = (event, context, callback) => {
//   context.callbackWaitsForEmptyEventLoop = false

//   const transform = createTransformServices()

//   console.log('event', event)
//   transform.JSONSchema2SHACL(event)
//     .then(hiyas => {
//       callback(null, responses.success(hiyas))
//     })
//     .catch(error => {
//       callback(null, responses.error('error:', error))
//     })

// };

// module.exports.owljsonld2jsonschema = (event, context, callback) => {
//   context.callbackWaitsForEmptyEventLoop = false

//   const transform = createTransformServices()

//   transform.OWLJSONLD2JSONSchema(event)
//     .then(hiyas => {
//       callback(null, responses.success(hiyas))
//     })
//     .catch(error => {
//       callback(null, responses.error(error))
//     })

// };

// module.exports.jsonschema2formfielddef = (event, context, callback) => {
//   context.callbackWaitsForEmptyEventLoop = false

//   const transform = createTransformServices()

//   console.log('event', event)
//   transform.JSONSchema2FormFieldDef(event)
//     .then(hiyas => {
//       callback(null, responses.success(hiyas))
//     })
//     .catch(error => {
//       callback(null, responses.error('error:', error))
//     })

// };

// module.exports.formfielddef2jsonschema = (event, context, callback) => {
//   context.callbackWaitsForEmptyEventLoop = false

//   const transform = createTransformServices()

//   console.log('event', event)
//   transform.FormFieldDef2JSONSchema(event)
//     .then(hiyas => {
//       dbpedialookupcallback(null, responses.success(hiyas))
//     })
//     .catch(error => {
//       callback(null, responses.error('error:', error))
//     })

// };


// module.exports.csv2formfielddef = (event, context, callback) => {
//   context.callbackWaitsForEmptyEventLoop = false

//   const transform = createTransformServices()

//   console.log('event', event)
//   transform.JSONSchema2FormFieldDef(event)
//     .then(hiyas => {
//       callback(null, responses.success(hiyas))
//     })
//     .catch(error => {
//       callback(null, responses.error('error:', error))
//     })

// };
