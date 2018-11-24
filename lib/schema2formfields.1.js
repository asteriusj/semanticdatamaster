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

const defaultLocation = "../csv/";
const defaultInfile = "outJsonSchema.json";
const defaultOutfile = "outFormFielddefs.json";

let etype = process.argv[2] || null;

if (etype) {

    let _type = etype;
    getJSONSCHEMAsaveJSON(_type, function() {})

}
else {

    let _type = defaultLocation + defaultInfile;
    getJSONSCHEMAsaveJSON(_type, function() {})

    // for (let i=0; i<entityTypes.length; i++) {
    //     let _type = entityTypes[i]
    //     getJSONsaveJSONSCHEMA(_type, function() {} )
    // }
}


function getJSONSCHEMAsaveJSON(etype, cb) {
    console.log('getJSONSCHEMAsaveJSON', etype)

    try {

        var _type = etype;
        //console.log('_type', _type) 

        utilsFil.getFileContent(_type, function(err, _json) {
            console.log('read in json file ')
            if (err) {
                console.log('readJSONfile error', err);
                //cb(err);
            }
            let _JSON = _json;
            json.stringify(_json)
                .then(function onStringify(_json) {
                    _JSON = _json;
                })
                .catch(function onStringifyError(e) {
                    // is already a json string?
                    //let _JSON = _json; 
                });
            // console.log('_JSON:', _JSON);    


            console.log('JSONSCHEMAtoFormFieldDefJSON entry')
            // Type-specific keywords
            //   string
            //   Numeric types
            //   object
            //   array
            //   boolean
            //   null

            //  {
            //     "content map": "employee.person.place.address",
            //     "id": "txtAddress1",
            //     "name": "address",
            //     "label": "Address",
            //     "dbo": "streetAddress"
            //   },
            var schema = {};
            var _properties = {}

            var form = {}
            var _formfields = []

            try {

                var objArray = JSON.parse(_JSON)
                // console.log('objArray:', objArray); 

                var ids = [];
                for (key in objArray) {

                        console.log(objArray[key]);


                    let _prop = {};

                    let obj = objArray[key]

                    let _id = obj.id || null;
                    let _contentmap = obj['x_contentmap'] || null;
                    let _name = obj['name'] || null;
                    let _label = obj['label'] || null;
                    let _dbo = obj['dbo'] || null;

                    // creat formfield entry
                    let _ff = {};
                    _ff.id = _id;
                    _ff.contentmap = _contentmap;
                    _ff.name = _name;
                    _ff.label = _label;
                    _ff.dbo = _dbo;
                    
                    if ( (_id != null) && (_ff != null) ) {
                          _formfields.push(_ff) ;
                    } else {
                      console.log("_id or _ff is null:", _id, _ff)
                    }
                        
                }; // end for each obj


            }
            catch (e) {
                console.log('catch e error in JSONSCHEMAtoFormFieldDefJSON ', e);
                if (cb) cb(e);
            }
            finally {
                // console.log('finally _properties:', _properties)
                schema = _properties;
                form = _formfields
                var result = { "schema": schema, "form": form }
                //var result ={ "schema": schema }
                //   console.log('finally result:', result )
                // console.log('finally props:', props)


                //
                // OUTPUT RESuLTING JSON SCHEMA
                // 
                let _content = JSON.stringify(form);
                let _filepath = defaultLocation + defaultOutfile;;
                utilsFil.putFileContent(_content, _filepath, function(err, _json) {
                    console.log('rwite out json file ')
                    if (err) {
                        console.log('putFileContent error', err);
                        //cb(err);
                    }

                }); // end putFileContent

            } // end finally

        });

    }
    catch (e) {
        console.log('catch error getJSONSCHEMAsaveJSON', e);
        cb(e);
        //return 
    }

};
