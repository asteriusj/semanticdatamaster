// *
// * Class deinitions and contsants for functionalitity that can be xposed via lambda handlers
// * module.exports used to make interfaces available to handlers but not ourside such as API Gateway
// * Inspired by: https://medium.com/the-reading-room/how-to-create-a-simple-rest-web-service-with-node-aws-lambda-and-the-serverless-framework-4730c88cd39a
// *

// const fetch = require('node-fetch');

const JSONtoJSONLD = require('./jsonld-ex.js')


class TransformServices {

    constructor() {

    }

    // **
    // 
    // **
    JSONtoJSONLD(event) {
        return new Promise((resolve, reject) => {

            try {

                const json2jsonld = new JSONtoJSONLD();

                // let _json = {}
                // if (event.pathParameters) {
                //     if (event.pathParameters.string) {
                //         let _json = event.pathParameters.string
                //     }
                // }
                // let _json = event.body
                // _json = [{ "@id": "foafiaf:Scorecard_Top_25", "@type": "skos:Concept", "rdf:type": "sioc:topic", "dbo:type": "foafiaf:Scorecard", "foaf:topic": "Community Transformation Scorecard", "rdfs:label": "Top 25", "dc:title": "A Top 25 Community", "dc:description": "Informs us that are mission is to be a top 25 community", "skos:definition": "", "rdfs:comment": "", "dbo:abstract": "", "foafiaf:keywords": "", "foafiaf:categories": "Scorecard", "skos:related": "", "skos:inScheme": "foafiaf:Scorecard_0", "foafiaf:Parent": "", "skos:broader": "", "skos:narrower": "", "foafiaf:polarity": "Increasing is good", "foafiaf:timeperiodtype": "Quarter", "foafiaf:unitofmeasure": "ROYG", "foafiaf:targetvalue": "1", "foafiaf:datavalues": "", "foafiaf:datatrend": "", "foafiaf:status": "Cyan", "foafiaf:color": "#00FFFF" }, { "@id": "foafiaf:Scorecard_Top Level", "@type": "skos:ConceptScheme", "rdf:type": "sioc:topic", "dbo:type": "foafiaf:Scorecards", "foaf:topic": "Scorecards: Indicator Scorecards", "rdfs:label": "Top Level", "dc:title": "Top Level Indicators", "dc:description": "", "skos:definition": "What does this top level indicator tell us about our transformation; what likey outcome or output does achieving this vision?", "rdfs:comment": "", "dbo:abstract": "", "foafiaf:keywords": "Top Level", "foafiaf:categories": "Scorecard", "skos:related": "", "skos:inScheme": "foafiaf:Scorecard_0", "foafiaf:Parent": "", "skos:broader": "", "skos:narrower": "", "foafiaf:polarity": "", "foafiaf:timeperiodtype": "", "foafiaf:unitofmeasure": "", "foafiaf:targetvalue": "", "foafiaf:datavalues": "", "foafiaf:datatrend": "", "foafiaf:status": "Cyan", "foafiaf:color": "#00FFFF" }]

                let _json = event.body || null;
                // _json = [{ "A1": "Do", "B1": "Re", "C1": "Me" }]
                if (_json != null) {
                    _json = _json["@graph"] || _json
                }
                else if (_json == null) {
                    // _json = [];
                    _json = [{ "@id": "foafiaf:Scorecard_Top_25", "@type": "skos:Concept", "rdf:type": "sioc:topic", "dbo:type": "foafiaf:Scorecard", "foaf:topic": "Community Transformation Scorecard", "rdfs:label": "Top 25", "dc:title": "A Top 25 Community", "dc:description": "Informs us that are mission is to be a top 25 community", "skos:definition": "", "rdfs:comment": "", "dbo:abstract": "", "foafiaf:keywords": "", "foafiaf:categories": "Scorecard", "skos:related": "", "skos:inScheme": "foafiaf:Scorecard_0", "foafiaf:Parent": "", "skos:broader": "", "skos:narrower": "", "foafiaf:polarity": "Increasing is good", "foafiaf:timeperiodtype": "Quarter", "foafiaf:unitofmeasure": "ROYG", "foafiaf:targetvalue": "1", "foafiaf:datavalues": "", "foafiaf:datatrend": "", "foafiaf:status": "Cyan", "foafiaf:color": "#00FFFF" }, { "@id": "foafiaf:Scorecard_Top Level", "@type": "skos:ConceptScheme", "rdf:type": "sioc:topic", "dbo:type": "foafiaf:Scorecards", "foaf:topic": "Scorecards: Indicator Scorecards", "rdfs:label": "Top Level", "dc:title": "Top Level Indicators", "dc:description": "", "skos:definition": "What does this top level indicator tell us about our transformation; what likey outcome or output does achieving this vision?", "rdfs:comment": "", "dbo:abstract": "", "foafiaf:keywords": "Top Level", "foafiaf:categories": "Scorecard", "skos:related": "", "skos:inScheme": "foafiaf:Scorecard_0", "foafiaf:Parent": "", "skos:broader": "", "skos:narrower": "", "foafiaf:polarity": "", "foafiaf:timeperiodtype": "", "foafiaf:unitofmeasure": "", "foafiaf:targetvalue": "", "foafiaf:datavalues": "", "foafiaf:datatrend": "", "foafiaf:status": "Cyan", "foafiaf:color": "#00FFFF" }]
                    // _json = { "@context": "http://schema.org/", "@type": "Person", "name": "Jane Doe", "jobTitle": "Professor", "telephone": "(425) 123-4567", "url": "http://www.janedoe.com" }
                    // _json = [{ "@context": "http://schema.org/", "@type": "Person", "name": "Jane Doe", "jobTitle": "Professor", "telephone": "(425) 123-4567", "url": "http://www.janedoe.com" }, { "@context": "http://schema.org/", "@type": "Person", "name": "John  Doe", "jobTitle": "Consultant", "telephone": "(425) 123-4567" }]
                    _json = JSON.stringify(_json)
                }
                console.log('_json', _json)


                // json2jsonld.transform(_json)
                //     .then(data => {
                //         console.log('json2jsonld.transform data', data)
                //         resolve(data)
                
                //     })
                //     .catch(error => {
                //         console.log('json2jsonld.transform error', error)
                //         reject(error)
                //         // resolve(error)
                
                //     })
            }
            catch (e) {
                console.log('JSONtoJSONLD e.message: ' + e.message)
                reject({
                    statusCode: 500,
                    body: 'JSONtoJSONLD e.message: ' + e.message
                });
            }; // end try
        }); // end promise

    }; // end JSONtoJSONLD

    // // **
    // // 
    // // **
    // SHACL2JSONSchema(event) {
    //     return new Promise((resolve, reject) => {
    //         const shacl2jsonschema = new SHACL2JSONSchema()
    //         let _shacl = {}
    //         if (event.pathParameters) {
    //             if (event.pathParameters.string) {
    //                 let _shacl = event.pathParameters.string
    //             }
    //         }
    //         // let _jsonschema = event.body
    //         // _jsonschema = { "id": "Person.json", "title": "Person", "format": "http://schema.org/Person", "comment": "A person (alive, dead, undead, or fictional).", "media": { "type": "application/json;profile=http://schema.org/Person" }, "allOf": [{ "$ref": "Thing.json" }], "type": "object" }

    //         console.log('_shacl', _shacl)

    //         shacl2jsonschema.transform(_shacl)
    //             .then(jsonschema => {
    //                 console.log('jsonschema', jsonschema)
    //                 resolve(jsonschema)
    //             })
    //             .catch(error => {
    //                 // reject(error)
    //                 resolve(error)
    //             });

    //     }) // end return

    // }; // end SHACL2JSONSchema

    // // **
    // // 
    // // **
    // JSONSchema2SHACL(event) {
    //     return new Promise((resolve, reject) => {
    //         const jsonschema2shacl = new JSONSchema2SHACL()
    //         let _jsonschema = {}
    //         if (event.pathParameters) {
    //             if (event.pathParameters.string) {
    //                 let _jsonschema = event.pathParameters.string
    //             }
    //         }
    //         // let _jsonschema = event.body
    //         // _jsonschema = { "id": "Person.json", "title": "Person", "format": "http://schema.org/Person", "comment": "A person (alive, dead, undead, or fictional).", "media": { "type": "application/json;profile=http://schema.org/Person" }, "allOf": [{ "$ref": "Thing.json" }], "type": "object" }

    //         console.log('_jsonschema', _jsonschema)

    //         jsonschema2shacl.transform(_jsonschema)
    //             .then(shacl => {
    //                 console.log('shacl', shacl)
    //                 resolve(shacl)
    //             })
    //             .catch(error => {
    //                 // reject(error)
    //                 resolve(error)
    //             });

    //     }) // end return

    // }; // end JSONSchema2SHACL

    // // **
    // // 
    // // **
    // OWLJSONLD2JSONSchema(event) {
    //     return new Promise((resolve, reject) => {
    //         const owdjsonld2jsonschema = new OWLJSONLD2JSONSchema()

    //         let _owljsonld = event.body || '{ "@graph": []}'
    //         owdjsonld2jsonschema.transform(_owljsonld)
    //             .then(schema => {
    //                 console.log('schema', schema)
    //                 resolve(schema)
    //             })
    //             .catch(error => {
    //                 reject(error)
    //             });

    //     }) // end return
    // } // end JSONSchema2OWLJSONLD

    // // **
    // // 
    // // **
    // JSONSchema2OWLJSONLD(event) {
    //     return new Promise((resolve, reject) => {
    //         const jsonschema2owljsonld = new JSONSchema2OWLJSONLD()
    //         let _jsonschema = {}
    //         if (event.pathParameters) {
    //             if (event.pathParameters.string) {
    //                 let _jsonschema = event.pathParameters.string
    //             }
    //         }
    //         // let _jsonschema = event.body
    //         // _jsonschema = { "id": "Person.json", "title": "Person", "format": "http://schema.org/Person", "comment": "A person (alive, dead, undead, or fictional).", "media": { "type": "application/json;profile=http://schema.org/Person" }, "allOf": [{ "$ref": "Thing.json" }], "type": "object" }

    //         console.log('_jsonschema', _jsonschema)

    //         jsonschema2owljsonld.transform(_jsonschema)
    //             .then(owljsonld => {
    //                 console.log('owljsonld', owljsonld)
    //                 resolve(owljsonld)
    //             })
    //             .catch(error => {
    //                 // reject(error)
    //                 resolve(error)
    //             });

    //     }) // end return

    // }; // end JSONSchema2OWLJSONLD

    // // **
    // // 
    // // **
    // JSONSchema2FormFieldDef(event) {
    //     return new Promise((resolve, reject) => {
    //         const jsonschema2formfield = new JSONSchema2FormFieldDef()
    //         let _jsonschema = {}
    //         if (event.pathParameters) {
    //             if (event.pathParameters.string) {
    //                 let _jsonschema = event.pathParameters.string
    //             }
    //         }
    //         // let _jsonschema = event.body
    //         // _jsonschema = { "id": "Person.json", "title": "Person", "format": "http://schema.org/Person", "comment": "A person (alive, dead, undead, or fictional).", "media": { "type": "application/json;profile=http://schema.org/Person" }, "allOf": [{ "$ref": "Thing.json" }], "type": "object" }

    //         console.log('_jsonschema', _jsonschema)

    //         jsonschema2formfield.transform(_jsonschema)
    //             .then(formfield => {
    //                 console.log('formfield', formfield)
    //                 resolve(formfield)
    //             })
    //             .catch(error => {
    //                 // reject(error)
    //                 resolve(error)
    //             });

    //     }) // end return

    // }; // end JSONSchema2FormFieldDef

    // // **
    // // 
    // // **
    // FormFieldDef2JSONSchema(event) {
    //     return new Promise((resolve, reject) => {
    //         const jsonschema2formfield = new JSONSchema2FormFieldDef()
    //         let _jsonschema = {}
    //         if (event.pathParameters) {
    //             if (event.pathParameters.string) {
    //                 let _jsonschema = event.pathParameters.string
    //             }
    //         }
    //         // let _jsonschema = event.body
    //         // _jsonschema = { "id": "Person.json", "title": "Person", "format": "http://schema.org/Person", "comment": "A person (alive, dead, undead, or fictional).", "media": { "type": "application/json;profile=http://schema.org/Person" }, "allOf": [{ "$ref": "Thing.json" }], "type": "object" }

    //         console.log('_jsonschema', _jsonschema)

    //         formfield2jsonschema.transform(_jsonschema)
    //             .then(formfield => {
    //                 console.log('formfield', formfield)
    //                 resolve(formfield)
    //             })
    //             .catch(error => {
    //                 // reject(error)
    //                 resolve(error)
    //             });

    //     }) // end return

    // }; // end FormFieldDef2JSONSchema



}; // end TransformServices

module.exports = TransformServices
