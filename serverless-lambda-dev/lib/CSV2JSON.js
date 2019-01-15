//
//  shared routine for transforming CSV file into a JSON file
//
class CSV2JSON {

    constructor() {

    }

    transform(_csv) {
        // console.log('transform _csv:', _csv)
        return new Promise(function (resolve, reject) {

            try {

                // let _json = {}

                if (_csv != "") {

                    fixCSVIssues(_csv, function (err, csvStr) {
                        if (err) {
                            console.error('calling fixCSVIssues err:', err)
                            reject(err)
                        }
                        else {

                            try {
                                // console.console('returned fixCSVIssues csvStr:', csvStr)

                                // https://www.npmjs.com/package/csvjson
                                var data = csvStr
                                var csvjson = require('csvjson');
                                var options = {
                                    delimiter: ',', // optional
                                    quote: '"' // optional
                                };
                                let _JSON = csvjson.toObject(data, options);
                                console.log('_JSON: ', _JSON); //here is your result jsonarray

                                resolve(_JSON)

                                // //https://www.npmjs.com/package/csvtojson
                                // const csvtojsonV2 = require("csvtojson/v2");
                                // // console.log('csvtojsonV2', csvtojsonV2)
                                // csvtojsonV2({
                                //         noheader: false,
                                //         eol: "\n",
                                //         alwaysSplitAtEOL: true
                                //     })
                                //     .fromString(csvStr)
                                //     .on('error', (error) => {
                                //         console.log('on error:', error)
                                //     })
                                //     .on('done', (error) => {
                                //         //do some stuff
                                //         console.log('on done error:', error)
                                //     })
                                //     .then((jsonObj) => {
                                //         console.log('then jsonObj:', jsonObj);
                                //         /**
                                //          * [
                                //          * 	{a:"1", b:"2", c:"3"},
                                //          * 	{a:"4", b:"5". c:"6"}
                                //          * ]
                                //          */
                                //         resolve(jsonObj)
                                //         // resolve('hiya')
                                //     })


                            }
                            catch (e) {
                                console.log('csvtojsonV2.fromString e', e);
                                reject(e);
                            }


                        } // end if not err

                    }) // end fixCSVIssues

                }
                else {
                    resolve(null)
                }

            } // end try promise
            catch (e) {
                console.log('catch error CSV2JSON', e);
                reject(e);
            }
        }); // end promise

    }; // end function CSV2JSON transform


    //new function from foafiaf-manage
    getCSVsaveJSON(csv) {
        // console.log('getCSVsaveJSON', csv)

        return new Promise(function (resolve, reject) {

            try {

                var _CSV = csv;
                // var _type = etype;
                // console.log('_type', _type)
                // utilsFil.readCSVfile(_type, function (err, _CSV) {
                //         if (err) {
                //             console.log('readCSVfile error', err);
                //             //cb(err);
                //         }
                //         //console.log('_CSV:', _CSV);

                fixCSVIssues(_CSV, function (err, csvStr) {
                    // console.log('fixCSVIssues csv', csv)



                    try {
                        var data = csvStr
                        var csvjson = require('csvjson');
                        var options = {
                            delimiter: ',', // optional
                            quote: '"' // optional
                        };
                        let _JSON = csvjson.toObject(data, options);
                        console.log('_JSON: ', _JSON); //here is your result jsonarray

                        resolve(_JSON)



                    }
                    catch (err) {
                        console.error('new Converter({}) err', err);
                    } // end try

                }); // end fixCSVIssues

            }
            catch (e) {
                console.log('catch error export', e);
                reject(e)
            }
        }); // end promise
    };




}; // end class CSV2JSON
module.exports = CSV2JSON


function fixCSVIssues(_csv, cb) {
    // console.log('fixCSVIssues')
    // console.log('fixCSVIssues _csv::', _csv)
    try {

        let _updated = null;
        // replace know issues
        String.prototype.replaceAll = function (find, replace) {
            var str = this;
            return str.replace(new RegExp(find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g'), replace);
        };


        _updated = _csv
        _updated = _updated.replaceAll('\\', '')
        _updated = _updated.replaceAll('[\\"', '["')
        _updated = _updated.replaceAll('\\",\\"', '","')
        _updated = _updated.replaceAll('"\\]', '"]')

        _updated = _updated.replaceAll('""schema:Event""', 'schema:Event')
        _updated = _updated.replaceAll('""owl:Thing""', 'owl:Thing')
        _updated = _updated.replaceAll('""dul:Event""', 'dul:Event')
        _updated = _updated.replaceAll('""bio:Event""', 'bio:Event')
        _updated = _updated.replaceAll('""org:Event""', 'org:Event')


        //_updated = _updated.replaceAll('"\\]', '"]')
        _updated = _updated.replaceAll('\\"dbo:Place\\"', 'dbo:Place')
        _updated = _updated.replaceAll('""dbo:Place""', 'dbo:Place')
        _updated = _updated.replaceAll('""dbo:Location""', 'dbo:Location')
        _updated = _updated.replaceAll('""schema:Place""', 'schema:Place')
        _updated = _updated.replaceAll('""dbo:PopulatedPlace""', 'dbo:PopulatedPlace')
        _updated = _updated.replaceAll('""geo:SpatialThing""', 'geo:SpatialThing')
        _updated = _updated.replaceAll('""Gateway to the Rock River Valley""', '^Gateway to the Rock River Valley^')

        _updated = _updated.replaceAll('""sioc:topic""', 'sioc:topic')
        _updated = _updated.replaceAll('""foaf:topic""', 'foaf:topic')

        _updated = _updated.replaceAll(
            '',
            ''
        )

        // _updated = _updated.replaceAll(
        //     '"[""schema:Event"",""owl:Thing"",""dul:Event"", ""schema:Event"",""bio:Event"",""org:Event""]"', 
        //     '"[schema:Event,owl:Thing,dul:Event, schema:Event,bio:Event,org:Event]"'
        //     )

        // let _obj = JSON.parse(_json);
        // for (let i=0; i<_obj.length; i++) {
        //     let el = _obj[i];
        //     //console.log('el', el)

        //     let _id = el['@id'];
        //     let rdftype = el['rdf:type'] || null;
        //     console.log('rdftype', rdftype)
        //     if (rdftype) {
        //         console.log('rdftype', rdftype)
        //     }

        // }

        // console.log('fixCSVIssues _updated', _updated)
        if (cb) {
            cb(null, _updated);
        }
        return _updated;

    }
    catch (e) {
        console.log('catch error fixCSVIssues e', e);
        return null
    }
}
