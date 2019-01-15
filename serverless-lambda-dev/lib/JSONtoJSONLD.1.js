'use strict'

const jsonld = require('jsonld');

//
//  shared routine for transforming JSON file into a JSON-LD formated file
//
class JSONtoJSONLD {

    constructor() {

    }

    transform(_JSON) {
        // console.log('transform _JSON:', _JSON)
        return new Promise(function (resolve, reject) {

            try {


                if (typeof _JSON === 'string' || _JSON instanceof String) {
                    _JSON = JSON.parse(_JSON) || _JSON;
                }
                if (_JSON && typeof _JSON === 'object' && _JSON.constructor === Object) {
                    _JSON = _JSON;
                }
                // console.log("_JSON: ", _JSON)
                let objArray = []
                if (Array.isArray(_JSON)) {
                    objArray = _JSON;
                }
                else {
                    objArray = [_JSON];
                }
                // console.log("objArray: ", objArray)
                var objStr = '{ "@graph": ' + JSON.stringify(objArray) + ' }' // converts JSON / objArray to JSONLD structure
                var objLD = JSON.parse(objStr)
                console.log("objLD: ", objLD)



                // https://json-ld.org/playground/
                // https://www.npmjs.com/package/jsonld
                // const jsonld = require('jsonld');

                const context = require('./contexts.js');


                let _compacted = null;
                let _expanded = null;
                let _flattened = null;
                let _final = null;

                // //
                // // // compact a document according to a particular context
                // //
                // jsonld.compact(objLD, context, function (err, compacted) {
                //     if (err) {
                //         console.error('compact err', err)
                //     }

                //     // console.log(JSON.stringify(compacted, null, 2));
                //     _compacted = compacted

                //     console.log('_compacted:', _compacted)



                //     // expand a document, removing its context
                //     jsonld.expand(compacted, function (err, expanded) {
                //         if (err) {
                //             console.error('expand', err)
                //         }
                //         // console.log(JSON.stringify(expanded, null, 2));
                //         _expanded = expanded

                //         console.log('_expanded:', _expanded)


                //         // flatten a document
                //         jsonld.flatten(expanded, (err, flattened) => {
                //             if (err) {
                //                 console.error('flatten', err)
                //             }
                //             _flattened = flattened

                //             console.log('_flattened:', _flattened)


                //             jsonld.compact(_flattened, context, function (err, final) {
                //                 if (err) {
                //                     console.error('compact err', err)
                //                 }
                //                 _final = final
                //                 console.log('_final:', _final)


                //             });
                //         });
                //     });
                // });

                // //
                // //
                // //




            }
            catch (e) {
                console.log('catch e error in JSONtoJSONLD ', e);

                reject(e);

            } // end catch
        }); // end promise

    }; // end function JSON2CSV transform


}; // end class JSONtoJSONLD

module.exports = JSONtoJSONLD


function getContextMaster() {

    // var folder = path.join(__dirname, '../../public/things/jsonld');
    // var filepathContext = path.join(folder, 'context/contextMaster.jsonld');

    // utilsFil.getFileContent(filepathContext, function (err, fileContent) {
    //       if (err) {
    //           console.log('error', err);
    //           cb(err);
    //       }
    //       //console.log('fileContent', fileContent)

    //     return fileContent

    // }); //end getFileContent

}
