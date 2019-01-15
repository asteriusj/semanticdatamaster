// *
// * Class deinitions and contsants for functionalitity that can be xposed via lambda handlers
// * module.exports used to make interfaces available to handlers but not ourside such as API Gateway
// * Inspired by: https://medium.com/the-reading-room/how-to-create-a-simple-rest-web-service-with-node-aws-lambda-and-the-serverless-framework-4730c88cd39a
// *

// const fetch = require('node-fetch');

const GSheet_Class = require('./gsheetClass')


class GSheetServices {

    constructor() {

    }

    // **
    // 
    // **
    GetGSheet(event, context) {
        // console.log('GetGSheet event context:', event, context)
        return new Promise((resolve, reject) => {
            try {

                const objGSheet = new GSheet_Class()
                console.log('event', event)

                let _sheetid = null;
                if (event.sheetid) {
                    _sheetid = event.sheetid

                }
                else if (event.pathParameters) {
                    if (event.pathParameters.sheetid) {
                        _sheetid = event.pathParameters.sheetid

                    }
                }
                // console.log('_sheetid', _sheetid)

                let _alt = null;
                if (event.alt) {
                    _alt = event.alt

                }
                else if (event.pathParameters) {
                    if (event.pathParameters.alt) {
                        _alt = event.pathParameters.alt

                    }
                }
                // console.log('_alt', _alt)

                objGSheet.retrieveSheet(_sheetid, _alt)
                    .then(res => {
                        // console.log('res', res)
                        resolve(res)
                    })
                    .catch(error => {
                        console.log('objGSheet error', error)
                        reject(error)
                    });


            }
            catch (e) {
                console.log('GetGSheet e.message: ' + e.message)
                reject({
                    statusCode: 500,
                    body: 'GetGSheet e.message: ' + e.message
                });
            }; // end try
        }); // end promise
    }; // end GetGSheet


    // **
    // 
    // **
    GetSheetEntities(event, context) {
        // console.log('GetGSheet event context:', event, context)
        return new Promise((resolve, reject) => {
            try {

                const objGSheet = new GSheet_Class()
                // console.log('event', event)

                let _sheetid = null;
                if (event.sheetid) {
                    _sheetid = event.sheetid

                }
                else if (event.pathParameters) {
                    if (event.pathParameters.sheetid) {
                        _sheetid = event.pathParameters.sheetid

                    }
                }
                // console.log('_sheetid', _sheetid)

                let _alt = null;
                if (event.alt) {
                    _alt = event.alt

                }
                else if (event.pathParameters) {
                    if (event.pathParameters.alt) {
                        _alt = event.pathParameters.alt

                    }
                }
                // console.log('_alt', _alt)

                // shacl2jsonschema.transform(_shacl)
                objGSheet.retrieveEntities(_sheetid)
                    .then(res => {
                        console.log('objGSheet.retrieveEntities res', res)
                        resolve(res)
                    })
                    .catch(error => {
                        console.log('objGSheet.retrieveEntities error', error)
                        reject(error)
                    });


            }
            catch (e) {
                console.log('GetGSheet e.message: ' + e.message)
                reject({
                    statusCode: 500,
                    body: 'GetGSheet e.message: ' + e.message
                });
            }; // end try
        }); // end promise
    }; // end GetGSheet




}; // end GSheetServices

module.exports = GSheetServices
