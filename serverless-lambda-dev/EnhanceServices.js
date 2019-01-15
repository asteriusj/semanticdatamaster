// *
// * Class deinitions and contsants for functionalitity that can be xposed via lambda handlers
// * module.exports used to make interfaces available to handlers but not ourside such as API Gateway
// * Inspired by: https://medium.com/the-reading-room/how-to-create-a-simple-rest-web-service-with-node-aws-lambda-and-the-serverless-framework-4730c88cd39a
// *

// const fetch = require('node-fetch');
const JsonMetadata = require('./JsonMetadata')
const DBPedia_Class = require('./DBPediaClass')


class EnhanceServices {

    constructor() {

    }

    // **
    // 
    // **
    JsonMetadata(event) {
        console.log('JsonMetadata event:', event)
        return new Promise((resolve, reject) => {
            try {

                let jsonmetadata = new JsonMetadata()



                let _json = event.body || event || ""

                jsonmetadata.enhance(_json)
                    .then(data => {
                        //   console.log('jsonmetadata.enhance data',data)
                        resolve(data)
                        //   resolve({
                        //       statusCode: 200,
                        //       body: data 
                        //   });
                    })
                    .catch(error => {
                        console.log('jsonmetadata.enhance error', error)
                        reject(error)
                        //   reject({
                        //       statusCode: 500,
                        //       body: 'jsonmetadata error.message: ' + error.message 
                        //   });
                    })


            }
            catch (e) {
                console.log('JsonMetadata e.message: ' + e.message)
                reject({
                    statusCode: 500,
                    body: 'JsonMetadata e.message: ' + e.message
                });
            }; // end try
        }); // end promise
    }; // end JsonMetadata
    DBPediaLookUp(_param) {
        console.log(' starting DBPediaLookUp _param:', _param)
        return new Promise((resolve, reject) => {
            try {

                // const objUtils = new Utils_Class();
                const objDBPedia = new DBPedia_Class();

                let _entity = {}

                //process if _param not empty
                if ((_param != null) && (_param != undefined) && (_param != "")) {

                    let _entityid = _param.replace(/ /g, "_")
                    let _dbp = "http://dbpedia.org/page/" + _param.replace(/ /g, "_")

                    //do lookup if _string is not blank resulting in blank page request
                    // if (_dbp != "http://dbpedia.org/page/") {

                    console.log('calling dbpLookUp ', _dbp)
                    objDBPedia.dbpLookUp(_dbp)
                        .then((data) => {
                            console.log('returning dbpLookUp ')

                            let dbpedia = data || null;
                            resolve(dbpedia)
                            // if (dbpedia != null) {
                            //     let _abstract = dbpedia.abstract['value'] || null;
                            // }

                            // _entity["@id"] = _entityid || null
                            // _entity["@type"] = dbpedia.type || null;
                            // // _ci['dbo:type'] =  "" ;
                            // _entity['rdfs:label'] = dbpedia.label || _label || null
                            // _entity['dc:title'] = dbpedia.title || dbpedia.name || null;

                            // _entity['dc:abstract'] = dbpedia.abstract || null;
                            // _entity['rdfs:comment'] = dbpedia.comment || null;

                            // _entity['dbp:text'] = dbpedia.text || null;
                            // _entity['dct:subject'] = dbpedia.subject || null;
                            // _entity['dbp:author'] = dbpedia.author || null;

                            // _entity['perse:city'] = dbpedia.city || null;
                            // _entity['perse:state'] = dbpedia.state || null;
                            // _entity['perse:country'] = dbpedia.country || null;

                            // if (dbpedia.sameAs != null) {
                            //     _entity["owl:sameAs"] = [dbpedia.sameAs];
                            // }
                            // else {
                            //     _entity["owl:sameAs"] = [];
                            // }

                            // if (dbpedia.wasDerivedFrom != null) {
                            //     _entity["prov:wasDerivedFrom"] = [dbpedia.wasDerivedFrom];
                            // }
                            // else {
                            //     _entity["prov:wasDerivedFrom"] = [];
                            // }

                            // if (dbpedia.isPrimaryTopicOf != null) {
                            //     _entity["foaf:isPrimaryTopicOf"] = [dbpedia.isPrimaryTopicOf];
                            // }
                            // else {
                            //     _entity["foaf:isPrimaryTopicOf"] = [];
                            // }

                            // _entity['foaf:name'] = dbpedia.name || null;

                            // console.log(' finishing dbpLookUp ')
                            // resolve(_entity)
                        })
                        .catch((err) => {
                            console.error("get dbpLookUp err:", err)
                            reject("get dbpLookUp err:", err)
                        }); // end dbpLookUp


                    // }
                    // else {
                    //     reject('{string} is empty')

                    // } // end of not empty _sting

                }
                else {
                    reject('{string} is null or undefined or blank')

                } // end if not empty

            }
            catch (e) {
                console.error('DBPediaLookUp error:', e)
                reject('DBPediaLookUp error:', e)
            } // try catch
        }) // end promise
    } //dbpedia_entity


}; // end EnhanceServices
module.exports = EnhanceServices
