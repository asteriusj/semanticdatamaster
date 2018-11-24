console.log('jsonschema2owljsonld.js loading...')
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

const defaultLocation = "../json/";
// const defaultInfile = "jsonschema.json";
const defaultInfile = "defaultjsonschema.json";
const defaultOutfile = "outOWLJSONLD.json";


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
        let _JSON = JSON.parse(_json) || _json;
        console.log('_JSON', _JSON)

        // _JSON = { "schema": { "title": "", "type": "object", "properties": { "txtAddress": { "control": "input", "type": "string", "format": "text", "id": "txtAddress", "name": "address", "title": "Address", "placeholder": "Mailing address ", "x_semantic": "", "x_contentmap": "place.address", "size": 30, "maxLength": 30, "maximum": 30 }, "txtAddress1": { "type": "string", "id": "txtAddress1", "name": "", "title": "", "x_semantic": "", "x_contentmap": "client.organization.address.address1" }, "txtAddress2": { "type": "string", "id": "txtAddress2", "name": "", "title": "", "x_semantic": "", "x_contentmap": "client.organization.address.address2" } } } }


        T.JSONSchema2OWLJSONLD.transform(_JSON).then(function (_owljsonld) {
            console.log('')
            console.log("call JSONSchema2OWLJSONLD.transform Success! _owljsonld", _owljsonld)
            console.log('')
            // let OWLJSONLD = JSON.parse(_owljsonld) || _owljsonld;
            // console.log('OWLJSONLD', OWLJSONLD)
            // NEED TO ADD OUTFILE SAVE

        }).catch(function (e) {
            console.log('')
            console.error('call JSONSchema2OWLJSONLD.transform Fail! e', e)
            console.log('')
        });


    });
}
