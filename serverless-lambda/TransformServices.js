// *
// * Class deinitions and contsants for functionalitity that can be xposed via lambda handlers
// * module.exports used to make interfaces available to handlers but not ourside such as API Gateway
// * Inspired by: https://medium.com/the-reading-room/how-to-create-a-simple-rest-web-service-with-node-aws-lambda-and-the-serverless-framework-4730c88cd39a
// *

// const fetch = require('node-fetch');
const JSONSchema2SHACL = require('./JSONSchema2SHACL')
const JSONSchema2OWLJSONLD = require('./JSONSchema2OWLJSONLD')
const OWLJSONLD2JSONSchema = require('./OWLJSONLD2JSONSchema')

class TransformServices {

    constructor() {

    }

    // **
    // 
    // **
    JSONSchema2SHACL(event) {
        return new Promise((resolve, reject) => {
            const jsonschema2shacl = new JSONSchema2SHACL()
            let _jsonschema = {}
            if (event.pathParameters) {
                if (event.pathParameters.string) {
                    let _jsonschema = event.pathParameters.string
                }
            }
            // let _jsonschema = event.body
            // _jsonschema = { "id": "Person.json", "title": "Person", "format": "http://schema.org/Person", "comment": "A person (alive, dead, undead, or fictional).", "media": { "type": "application/json;profile=http://schema.org/Person" }, "allOf": [{ "$ref": "Thing.json" }], "type": "object" }

            console.log('_jsonschema', _jsonschema)

            jsonschema2shacl.transform(_jsonschema)
                .then(shacl => {
                    console.log('shacl', shacl)
                    resolve(shacl)
                })
                .catch(error => {
                    // reject(error)
                    resolve(error)
                });

        }) // end return

    }; // end JSONSchema2SHACL

    // **
    // 
    // **
    OWLJSONLD2JSONSchema(event) {
        return new Promise((resolve, reject) => {
            const owdjsonld2jsonschema = new OWLJSONLD2JSONSchema()

            let _owljsonld = event.body || '{ "@graph": []}'
            owdjsonld2jsonschema.transform(_owljsonld)
                .then(schema => {
                    console.log('schema', schema)
                    resolve(schema)
                })
                .catch(error => {
                    reject(error)
                });

        }) // end return
    } // end JSONSchema2OWLJSONLD

    // **
    // 
    // **
    JSONSchema2OWLJSONLD(event) {
        return new Promise((resolve, reject) => {
            const jsonschema2owljsonld = new JSONSchema2OWLJSONLD()
            let _jsonschema = {}
            if (event.pathParameters) {
                if (event.pathParameters.string) {
                    let _jsonschema = event.pathParameters.string
                }
            }
            // let _jsonschema = event.body
            // _jsonschema = { "id": "Person.json", "title": "Person", "format": "http://schema.org/Person", "comment": "A person (alive, dead, undead, or fictional).", "media": { "type": "application/json;profile=http://schema.org/Person" }, "allOf": [{ "$ref": "Thing.json" }], "type": "object" }

            console.log('_jsonschema', _jsonschema)

            jsonschema2owljsonld.transform(_jsonschema)
                .then(owljsonld => {
                    console.log('owljsonld', owljsonld)
                    resolve(owljsonld)
                })
                .catch(error => {
                    // reject(error)
                    resolve(error)
                });

        }) // end return

    }; // end JSONSchema2OWLJSONLD


}; // end TransformServices

module.exports = TransformServices
