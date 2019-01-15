//
//  shared routine for transforming JSON file into a JSON-LD formated file
//
class JSON2JSONLD {

    constructor() {

    }

    transform(_json) {
        console.log('JSON2JSONLD transform _json:', _json)
        return new Promise(function (resolve, reject) {

            try {

                // let _csv = """

                // var doc = _json
                // // var csvjson = require('csvjson');
                // var jsonld = require('jsonld');
                // const context = {
                //     "name": "http://schema.org/name",
                //     "homepage": { "@id": "http://schema.org/url", "@type": "@id" },
                //     "image": { "@id": "http://schema.org/image", "@type": "@id" }
                // };


                // jsonld.compact(doc, context, function (err, compacted) {
                //     console.log(JSON.stringify(compacted, null, 2));
                //     /* Output:
                //     {
                //       "@context": {...},
                //       "name": "Manu Sporny",
                //       "homepage": "http://manu.sporny.org/",
                //       "image": "http://manu.sporny.org/images/manu.png"
                //     }
                //     */
                //     resolve(compacted)
                // });

                // jsonld.toRDF(doc, { format: 'application/nquads' }, function (err, nquads) {
                //     // nquads is a string of nquads
                //     if (err) console.error(err)
                //     if (nquads) console.log('nquads', nquads)
                // });
                // jso

                // let obj = jsonld.compact(doc, context, function (err, _JSONLD) {
                //     if (err) console.err(err)
                //     console.log('_JSONLD: ', _JSONLD); //here is your result _JSONLD string

                //     resolve(_JSONLD)

                // });



                // var options = {
                //     headers: "none",
                //     wrap: false
                // }
                // /* supported options

                //     delimiter = <String> optional default value is ","
                //     wrap  = <String|Boolean> optional default value is false
                //     headers = <String> optional supported values are "full", "none", "relative", "key"
                //     objectDenote = <String> optional default value is "."
                //     arrayDenote = <String> optional default value is "[]"
                // */

                // let _CSV = csvjson.toCSV(data, options);

                // console.log('_CSV: ', _CSV); //here is your result csv string

                // resolve(_CSV)


            } // end try promise
            catch (e) {
                console.log('catch error JSON2JSONLD e:', e);
                // if (cb) cb(e);
                reject(e);
            }
        }); // end promise

    }; // end function JSON2JSONLD transform

}; // end class JSON2JSONLD

module.exports = JSON2JSONLD
