console.log('schema2formfields.js loading...')
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
const defaultInfile = "jsonschema.json";
const defaultOutfile = "outFormFieldDefs.json";


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
        let _JSON = _json;
        console.log('_JSON', _JSON)

        _JSON = { "schema": { "title": "", "type": "object", "properties": { "txtAddress": { "control": "input", "type": "string", "format": "text", "id": "txtAddress", "name": "address", "title": "Address", "placeholder": "Mailing address ", "x_semantic": "", "x_contentmap": "place.address", "size": 30, "maxLength": 30, "maximum": 30 }, "txtAddress1": { "type": "string", "id": "txtAddress1", "name": "", "title": "", "x_semantic": "", "x_contentmap": "client.organization.address.address1" }, "txtAddress2": { "type": "string", "id": "txtAddress2", "name": "", "title": "", "x_semantic": "", "x_contentmap": "client.organization.address.address2" } } } }


        T.JSONSchema2FormFieldDefs.transform(_JSON).then(function (_formfieldef) {
            console.log("call JSONSchema2FormFieldDefs.transform Success! _formfieldef", _formfieldef)

            // let FormFieldDef = JSON.parse(_formfieldef) || _formfieldef;
            // console.log('FormFieldDef', FormFieldDef)
            // NEED TO ADD OUTFILE SAVE

        }).catch(function (e) {
            console.error('call JSONSchema2FormFieldDefs.transform Fail! e', e)

        });


    });
}
