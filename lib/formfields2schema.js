console.log('formfields2schema.js loading...')
'use strict'
const request = require("request")
const fs = require('fs');
const path = require('path');

const json = require('json-promise');
//const {IsJSON} = require("is-json-promise/safe"); 

//var models = require('../../models');
const utilsFil = require('./utilsFil.js');
// const utils = require('./utils.js');

const defaultLocation = "../json/";
const defaultInfile = "formfielddefs.json";
const defaultOutfile = "outJsonSchema.json";

var T = require('./Transforms');

let etype = process.argv[2] || null;

if (etype) {

    let _file = defaultLocation + etype;

    // getJSONsaveJSONSCHEMA(_type, function () {})

}
else {

    let _file = defaultLocation + defaultInfile;
    console.log('_file', _file)

    utilsFil.getFileContent(_file, function (err, _json) {
        console.log('read in json file ')
        if (err) {
            console.log('getFileContent error', err);
            //cb(err);
        }
        let _JSON = _json;
        console.log('_JSON', _JSON)

        T.FormFieldDefs2JSONSchema.transform(_JSON).then(function (_jsonschema) {
            console.log("call FormFieldDefs2JSONSchema.transform Success! _jsonschema", _jsonschema)

            let JSONSchema = JSON.parse(_jsonschema)
            console.log('JSONSchema', JSONSchema)

            // NEED TO ADD OUTFILE SAVE


        }).catch(function (e) {
            console.error('call FormFieldDefs2JSONSchema.transform Fail! e', e)

        });


    });


};
