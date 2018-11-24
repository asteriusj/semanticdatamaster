'use strict'
const request = require("request")
const fs = require('fs');
const path = require('path');

const json = require('json-promise');
//const {IsJSON} = require("is-json-promise/safe"); 


//var models = require('../../models');
const utilsFil = require('./utilsFil.js');

const utilsCon = require('./utilsCon.js');
const sheetConfig = require('./sheetConfig.js');

const entityTypes = sheetConfig.getEntityTypeList()
//console.log('entityTypes', entityTypes)

let etype = process.argv[2] || null;

if (etype) {
    
    let _type = etype;
    getJSONsaveJSONLD(_type, function() {} )
    
} else {
    
    for (let i=0; i<entityTypes.length; i++) {
        let _type = entityTypes[i]
        getJSONsaveJSONLD(_type, function() {} )
    }
}
    
function getJSONsaveJSONLD(etype, cb){
    console.log('getJSONsaveJSONLD', etype)
    
    try {
        
        var _type = etype;
        //console.log('_type', _type) 
        utilsFil.readJSONfile(_type, function (err, _json) {                               console.log('read in json file ')
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
                //console.log('_JSON:', _JSON);
            
            
            
                utilsCon.JSONtoJSONLD(_JSON, function(err, _jsonld) {                   console.log('now convert to jsonld ')
                if (err) {
                    console.log('error', err);
                    cb(err);
                }
                //console.log('_jsonld: ', _jsonld);
                let _JSONLD = _jsonld;
                // json.stringify(_jsonld)
                //     .then(function onStringify(_jsonld) {
                //         _JSONLD = _jsonld; 
                //     })
                //     .catch(function onStringifyError(e) {
                //         // is already a json string?
                //         //_JSONLD = _jsonld; 
                //     });
                //     //console.log('_JSONLD: ', _JSONLD);
                    
                // // IsJSON(_jsonld)
                // //   .then(function onISJSON(_jsonld) {
                // //         _JSONLD = _jsonld; 
                // //     })
                // //   .catch(function onIsJSONError(e) {
                // //         // is already a json string?
                // //         _JSONLD = JSON.stringify(_jsonld)
                // //     });
                _JSONLD = JSON.stringify(_jsonld)
                //console.log('_JSONLD:', _JSONLD);
                
                utilsFil.writeJSONLDfile(_JSONLD, _type, function(err, filepath) {         console.log('now write file')
                    if (err) {
                        console.log('writeJSONLDfile error', err);
                        //cb(err);
                    } 
                    
                    if (cb) cb(null, filepath);
                });
                
            });

        });
        
    }
    catch(e) {
        console.log('catch error getJSONsaveJSONLD', e);
        cb(e);
       //return 
    } 

};     
