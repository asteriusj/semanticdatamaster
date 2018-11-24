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

const TransformServices = require('./TransformServices')
const TranslateServices = require('./TranslateServices')
const EnhanceServices = require('./EnhanceServices.js')

/**
 * Initialises the TransformServices based on environment variables
 */
function createTransformServices() {
  const transformServices = new TransformServices(

  )
  return transformServices
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



module.exports.shacl2jsonschema = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  const transform = createTransformServices()

  console.log('event', event)
  transform.SHACL2JSONSchema(event)
    .then(hiyas => {
      callback(null, responses.success(hiyas))
    })
    .catch(error => {
      callback(null, responses.error('error:', error))
    })

};

module.exports.jsonschema2shacl = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  const transform = createTransformServices()

  console.log('event', event)
  transform.JSONSchema2SHACL(event)
    .then(hiyas => {
      callback(null, responses.success(hiyas))
    })
    .catch(error => {
      callback(null, responses.error('error:', error))
    })

};

module.exports.jsonschema2owljsonld = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  const transform = createTransformServices()

  console.log('event', event)
  transform.JSONSchema2SHACL(event)
    .then(hiyas => {
      callback(null, responses.success(hiyas))
    })
    .catch(error => {
      callback(null, responses.error('error:', error))
    })

};

module.exports.owljsonld2jsonschema = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  const transform = createTransformServices()

  transform.OWLJSONLD2JSONSchema(event)
    .then(hiyas => {
      callback(null, responses.success(hiyas))
    })
    .catch(error => {
      callback(null, responses.error(error))
    })

};

module.exports.jsonschema2formfield = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  const transform = createTransformServices()

  console.log('event', event)
  transform.JSONSchema2FormField(event)
    .then(hiyas => {
      callback(null, responses.success(hiyas))
    })
    .catch(error => {
      callback(null, responses.error('error:', error))
    })

};

module.exports.formfield2jsonschema = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  const transform = createTransformServices()

  console.log('event', event)
  transform.FormField2JSONSchema(event)
    .then(hiyas => {
      callback(null, responses.success(hiyas))
    })
    .catch(error => {
      callback(null, responses.error('error:', error))
    })

};


module.exports.jsonmetadata = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  const enhance = new EnhanceServices()

  enhance.JsonMetadata(event.body)
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
