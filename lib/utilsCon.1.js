'use strict'
const fs = require('fs');
const path = require('path');
const jsonld = require('jsonld');
//var rdflib = require('rdflib');
//var models = require('../../models')
const utilsFil = require('./utilsFil.js');
//var genUtils = require('./genUtils.js');

// **
//
// JSONtoJSONLD
// 
//
// SheetToJSON
// JSONtoSheet
//
// CSVtoJSON
// JSONtoCSV
//
// **

function getContextMaster() {
    
    var folder = path.join(__dirname, '../../public/things/jsonld');
    var filepathContext = path.join(folder, 'context/contextMaster.jsonld');

    utilsFil.getFileContent(filepathContext, function (err, fileContent) {
          if (err) {
              console.log('error', err);
              cb(err);
          }
          //console.log('fileContent', fileContent)
          
        return fileContent
        
    }); //end getFileContent

}

exports.JSONtoJSONLD = function (_JSON, cb) {
  console.log('JSONtoJSONLD entry' )
  //console.log('_JSON', _JSON)
  
  
  try {

    var objArray = JSON.parse(_JSON)
    
    var objStr = '{   "@graph": ' + JSON.stringify(objArray) + ' }'         // converts JSON / objArray to JSONLD structure
    var objLD = JSON.parse(objStr)
    //console.log("objLD: ",  JSON.stringify(objLD))

     const jsonld = require('jsonld');
     
     jsonld.flatten(objLD, function(err, flattened) {                       // first flatten JSONLD structure
        if (err) {
              console.log('error', err);
              cb(err);
        }
        //console.log("flattened: ",  JSON.stringify(flattened))
        //if (cb) cb(null, flattened);
        
        jsonld.expand(flattened, function(err, expanded) {                  // second expand JSONLD strcuture
            if (err) {
                  console.log('error', err);
                  cb(err);
            }
            //console.log("expanded: ",  JSON.stringify(expanded))
            // if (cb) cb(null, expanded);
            
            //var context = {"schema": "http://schema.org/"};
            let context = {                                                 // TODO import from contectMaster.jsonld
    "tmo": "http://foafiaf-asteriusj.c9users.io/owl/tmo_data.rdf",
    "owl": "http://www.w3.org/2002/07/owl#",
    "dce": "http://purl.org/dc/",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "skos": "http://www.w3.org/2004/02/skos/core",
    "bio": "http://purl.org/vocab/bio/0.1/",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "d0": "http://www.ontologydesignpatterns.org/ont/dul/d0.owl",
    "foaf": "http://xmlns.com/foaf/0.1/",
    "foafiaf": "http://foafiaf-asteriusj.c9users.io/owl/foafiaf#",
    "geo": "http://www.w3.org/2003/01/geo/wgs84_pos#",
    "wot": "http://xmlns.com/wot/0.1/",
    "prov": "http://www.w3.org/ns/prov#",
    "acl": "http://www.w3.org/ns/auth/acl#",
    "rel": "http://purl.org/vocab/relationship/",
    "sioc": "http://rdfs.org/sioc/ns#",
    "org": "http://www.w3.org/ns/org#",
    "pto": "http://www.productontology.org/id/",
    "gr": "http://www.heppnetz.de/ontologies/goodrelations/v1.owl",
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "dul": "http://www.loa.istc.cnr.it/ontologies/DUL.owl",
    "vs": "http://www.w3.org/2003/06/sw-vocab-status/ns#",
    "dc": "http://purl.org/dc/elements/1.1/",
    "dbo": "http://dbpedia.org/ontology/",
    "dbp": "http://dbpedia.org/property/",
    "dbr": "http://dbpedia.org/resource/",
    "perse": "https://foafiaf-asteriusj.c9.io/owl/perseprofile#",
    "mbti": "https://foafiaf-asteriusj.c9.io/owl/persamodel_MBTI#",
    "disc": "https://foafiaf-asteriusj.c9.io/owl/persamodel_DiSC#",
    "traxion": "https://foafiaf-asteriusj.c9.io/owl/perseprofile_Traxion#",
    "vcard" : "http://www.w3.org/2006/vcard/ns#"
  }
            //let context = getContextMaster();
            jsonld.compact(expanded, context, function(err, compacted) {    // fonally cpmpact JSONLS structure
                if (err) {
                      console.log('error', err);
                      cb(err);
                }
                //console.log("compacted: ",  JSON.stringify(compacted))
                
                if (cb) cb(null, compacted);
            
            });
            
        });
        
     });
     
      
  } catch(e) {
        console.log('catch e error in JSONtoJSONLD ', e);
        cb(e);
       //return 
  }
};  


function SheetToJSON(sheetJSON, type, cb) {
    console.log('SheetToJSON entry')
    //console.log('sheetJSON', sheetJSON)
    var _obj = JSON.parse(sheetJSON);
    var _type = type;
    
    try {

        var table = _obj.table;     //console.log('table', table)
        
        var cols = table.cols;      //console.log('cols', cols)
        
        var rows = table.rows;      //console.log('rows', rows)
        
        // create array of cell headers indexed by id or label
        var heads = [];
        for (var c=0; c<cols.length; c++) {
            var col = cols[c];
            //console.log('col.label:', col.label, col.id, col.type)
            var head = { i: c , id: col.id , label: col.label , type: col.type }
            heads[c] = head;
        }
        console.log('heads:', heads)

        // fill cells with values indexed by id or label from header
        //for (var r=0; r<rows.length; r++) {
        for (var r=0; r<3; r++) {
            console.log('r:', r)
            var entry = rows[r].c;
           
            if (r===0){
                if (heads[0].label === '') {
                    //console.log('is blank', heads[0].label)
                    //console.log('row rows[r]', r, rows[r])
                    for (var c = 0; c < entry.length; c++) {
                        var col = entry[c] || '';
    
                        heads[c].label = col.v;                 // replace blank header label with first row value
                    }
                    //console.log('new heads', heads)
                }   
            }
    
            // loop over columns and add vlue to cell and to tuple pairs
            var vals = []
            var pairs = "{ "
            for (var c = 0; c < entry.length; c++) {
    
                var C = entry[c] || '';
                var V = C.v || null;        // value
                var F = C.f || null;        // formated value
                var T = C.t || null;        // value type
                //console.log('c:', c, cols[c].label,  V, F, T)
                
                // var val = F || V;
                // //var key = cells[c].label || cells[c].id
                // vals[c] = val;
                
                //console.log('heads[c]', heads[c])
                var head = heads[c] 
                var _subject = r;                                           // row record num or id
                var _predicate = head.label || head.id                      // header of column
                var _object = F || V ;                                      // value of entry
                //console.log('s/p/o->', _subject, _predicate, _object)
                
                if (_object){
                    if ( _object.startsWith("[") ) {
                        var pair = " '" + _predicate + "': " + _object + " ";
                    } else {
                       var pair = " '" + _predicate + "': '" + _object + "' "; 
                    }
    
                    console.log('pair', pair) 
                    //pairs[c] = pair;
                    //pairs.push(pair)
                    pairs += pair + ", ";
                }
                
                
                
            }
            pairs.slice(0, -2);
            pairs += pair + " }";
            //console.log('vals:', vals)
            console.log('pairs:', pairs)
            //console.log('pairs:', JSON.parse(pairs))
              
        }//end for loop over rows
        
        
        //if (cb) cb(null, json);
        
    }
    catch(e) {
        console.log('SheetToJSON error ', e);
        cb(e);
       //return 
    }
    
};
//module.exports = SheetToJSON


// function JSONtoSheet(type, cb) {
//     console.log('SheetToJSONLD entry')
   
//     try {

//         var _type = type; 
        
 
        
//     }
//     catch(e) {
//         console.log('JSONtoSheet error ', e);
//         cb(e);
//       //return 
//     }
    
// };
//module.exports = JSONtoSheet;

// function CSVtoJSON(_CSV, cb) {
//   console.log('CSVtoJSON entry' )
//   console.log('_CSV', _CSV)
//   var _JSON = {}
  
//   try {
    
//     var Converter = require("csvtojson").Converter;
    
//     var converter = new Converter({});
//     converter.fromString(_CSV, function (err, _JSON) {
//         if (err) {
//                 console.log('error', err);
//                 cb(err);
//           }
//         console.log('_JSON: ', _JSON); //here is your result jsonarray

//         if (cb) cb(null, _JSON);
        
//     });
    
//   } catch(e) {
//         console.log('CSVtoJSON error ', e);
//         cb(e);
//   }
// };
// module.exports = CSVtoJSON;


// function JSONtoCSV(type, cb) {
//     console.log('CSVtoJSONLD entry')
    
//     try {

//         _type = type;
        
//     }
//     catch(e) {
//         console.log('SheetToJSONLD error ', e);
//         cb(e);
//       //return 
//     }
    
// };
// module.exports = JSONtoCSV;


// function CSVtoJSONLD(_CSV, cb) {
//   console.log('CSVtoJSONLD entry' )
//   var json_ld = require('jsonld');

//   var _JSON = {}
//   var _JSONLD = {}
  
//   try {
    
//     var Converter = require("csvtojson").Converter;
    
//     var converter = new Converter({});
//     converter.fromString(_CSV, function (err, _JSON) {
//         if (err) {
//                 console.log('error', err);
//                 cb(err);
//           }
//         console.log('_JSON: ', _JSON); //here is your result jsonarray
        
//         // now convert to jsonld
//         JSONtoJSONLD(_JSON, function(err, _JSONLD) {
//             if (err) {
//                 console.log('error', err);
//                 cb(err);
//             }
//             //console.log('_JSONLD: ', JSON.stringify(_JSONLD));
//             if (cb) cb(null, _JSONLD);
//         });
     
//     });
    
//   } catch(e) {
// 	  console.log(e);
//   }
// }
// module.exports = CSVtoJSONLD;

