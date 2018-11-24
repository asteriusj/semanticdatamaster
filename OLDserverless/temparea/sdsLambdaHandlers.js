'use strict'

console.log('Loading function')
const uuid = require('uuid');
// const AWS = require('aws-sdk');
const SDS = require('./SemanticDataServices.js')
// const SDS = new sds.createSemanticDataServices()

// All the request info in event
// "handler" is defined on the function creation
exports.handler = (event, context, callback) => {

    // Callback to finish response
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    // To support mock testing, accept object not just strings
    if (typeof event.body == 'string')
        event.body = JSON.parse(event.body)
    switch (event.httpMethod) {
        //  name and key are in payload
    case 'DELETE':
        SDS.deleteSemDatSrv(event.body, done)
        break
        // No payload, just a query string param    
    case 'GET':
        SDS.getSemDatSrv({ index: 0 }, done)
        break
        //  name and key are in payload
    case 'POST':
        SDS.putSemDatSrv(event.body, done)
        break
        //  name and key are in payload   
    case 'PUT':
        SDS.updateSemDatSrv(event.body, done)
        //  name and key are in payload 

// case 'create':
//     dynamo.put(event.payload, callback);
//     break;
// case 'read':
//     dynamo.get(event.payload, callback);
//     break;
// case 'update':
//     dynamo.update(event.payload, callback);
//     break;
// case 'delete':
//     dynamo.delete(event.payload, callback);
//     break;
// case 'list':
//     dynamo.scan(event.payload, callback);
//     break;
// case 'echo':
//     callback(null, "Success");
//     break;
// case 'ping':
//     callback(null, "pong");
//     break;



    default:
        done(new Error(`Unsupported method "${event.httpMethod}"`))
    }
}
