// var owl2jsonschema = require('../owl2jsonschema.js/index.js');
// /* becomes require('owl2jsonschema') */
// var parser = new owl2jsonschema( /*[options object]*/ );
// /*
// //	You can parse remote or local, absolute or relative files or an xml string :
// //	NOTE - currently there must be an RDF Container and an OWL Ontology present ...
// */
// // CREATES files containing the JSON Schemas in a folder OUTPUT/[host]_[path]
// // RETURNS in [callback function] a string containing the JSON structure by default

// // parser.parse('http://mappings.dbpedia.org/server/ontology/export', function () {
// //     console.log('FINAL CALLBACK fn says READY. ;)');
// // });
// // EXAMPLES :
// // parser.parse('http://purl.org/NET/cidoc-crm/core');
// // parser.parse('http://www.ontologydesignpatterns.org/ont/dul/DUL.owl');
// // OR
// parser.parse('../owl/dbpedia.xml' /*, [callback function]*/ );
// // OR
// // parser.parse('<?xml><rdf:RDF><owl:Ontology>...</owl:Ontology>...</rdf:RDF>' /*, [callback function]*/);


// //
// //  shared routine for transforming a JSON Schema of form field elements 
// //  into a OWL in JSON-LD
// //
// function OWLJSONLD2JSONSchema(_owljsonld, cb) {
//     console.log('OWLJSONLD2JSONSchema _json', _json)

//     return new Promise(function (resolve, reject) {
//         try {
//             let _JSON = JSON.stringify(_json) || _json;
//             console.log('OWLJSONLD2JSONSchema entry', _JSON)

//             resolve();

//         }
//         catch (e) {
//             console.log('catch error OWLJSONLD2JSONSchema', e);
//             if (cb) cb(e);
//             reject(e);

//         }
//     }); // end promise
// }; // end OWLJSONLD2JSONSchema
console.log('_owl2jsonschema.js loading...')
'use strict'
const request = require("request")
const fs = require('fs');
const path = require('path');

const json = require('json-promise');
//const {IsJSON} = require("is-json-promise/safe"); 


var owl2jsonschema = require('./owl2jsonschema/index.js');
/* becomes require('owl2jsonschema') */
var parser = new owl2jsonschema( /*[options object]*/ );



//var models = require('../../models');
const utilsFil = require('./utilsFil.js');
// const utils = require('./utils.js');

const defaultLocation = "./";
const defaultInfile = "test.xml";
const defaultOutfile = "test.json";

let etype = process.argv[2] || null;

if (etype) {

    let _file = defaultLocation + etype;

    // getJSONsaveJSONSCHEMA(_type, function () {})

}
else {

    let _file = defaultLocation + defaultInfile;
    // let _file = '../owl/' + defaultInfile;
    console.log('_file', _file)

    doOwl2JsonSchema(_file, function () {})


};


function doOwl2JsonSchema(_file) {
    console.log('doOwl2JsonSchema_file', _file)

    // parser.parse('./export.xml' /*, [callback function]*/ );
    // parser.parse('http://xmlns.com/foaf/0.1/foaf.owl', function () {
    // parser.parse('<?xml><rdf:RDF><owl:Ontology>...</owl:Ontology>...</rdf:RDF>' /*, [callback function]*/);

    parser.parse(_file, function (err, result) {
        if (err) console.error(err)
        console.log('result:', result);

    });
}
