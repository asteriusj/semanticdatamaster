console.log('owljsonld2jsonschema.js loading...')
'use strict'
const request = require("request")
const fs = require('fs');
const path = require('path');

const json = require('json-promise');
//const {IsJSON} = require("is-json-promise/safe"); 

//var models = require('../../models');
const utilsFil = require('./utilsFil.js');
const utils = require('./utils.js');

var T = require('./Transforms');

const defaultLocation = "../owl/";
// const defaultInfile = "jsonschema.json";
const defaultInfile = "semanticdatamaster.jsonld";
const defaultOutfile = "outJSONSchema.json";


let etype = process.argv[2] || null;

if (etype) {

    let _file = etype;
    // getJSONSCHEMAsaveJSON(_file, function() {})

}
else {

    let _file = defaultLocation + defaultInfile;
    console.log('_file', _file)
    // getJSONSCHEMAsaveJSON(_type, function() {})

    utilsFil.getFileContent(_file, function (err, _json) {
        console.log('read in json file ')
        if (err) {
            console.log('getFileContent error', err);
            //cb(err);
        }
        let _JSONLD = JSON.parse(_json) || _json;
        // console.log('_JSONLD', _JSONLD)

        T.OWLJSONLD2JSONSchema.transform(_JSONLD).then(function (_jsonschema) {
            console.log('')
            console.log("call OWLJSONLD2JSONSchema.transform Success! ")
            console.log('')
            // let JSONSchema = JSON.parse(_jsonschema) || _jsonschema;
            let JSONSchema = _jsonschema;
            console.log('JSONSchema', JSONSchema)
            // NEED TO ADD OUTFILE SAVE

        }).catch(function (e) {
            console.log('')
            console.error('call OWLJSONLD2JSONSchema.transform Fail! e', e)
            console.log('')
        });


    });
}
