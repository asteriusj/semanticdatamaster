// Copyright 2018 Asterius Media LLC
//
// License: MIT See LICENSE for details
//
"use strict";

// require('dotenv').config()
const fetch = require('node-fetch');

module.exports = class GSheet_Class {
    constructor() {
        // process.env.SHEETID,
        //     process.env.GAPIKEY
    }



    getEntityById(_rawNodes, _id, cb) {
        // console.log('getEntityById', _rawNodes, _id)
        var theNode = null;
        for (var z = 0; z < _rawNodes.length; z++) {
            if (_rawNodes[z].id === _id) {
                theNode = _rawNodes[z];
            }
            if (_rawNodes[z]['@id'] === _id) {
                theNode = _rawNodes[z];
            }
        }
        if (cb) cb(null, theNode)
        return theNode;
    }



    getPropertyByName(propname, json) {
        return new Promise((resolve, reject) => {
            try {
                // console.log('getProperty propname ',propname)
                let theObject = json
                let finalResults = []
                let targetProp = propname

                function getObject(theObject) {
                    for (let prop in theObject) {
                        if (theObject.hasOwnProperty(prop)) {
                            // console.log(prop + ': ' + theObject[prop]);
                            // console.log(targetProp + ': ' + targetProp);
                            if (prop === targetProp) {
                                // console.log('--found id',prop);
                                // console.log('theObject[prop]',theObject[prop]);

                                finalResults.push(theObject[prop])
                                // if (theObject[prop] === targetValue) {
                                //   console.log('----found porop', prop, ', ', theObject[prop]);
                                //   finalResults.push(theObject);
                                // }
                            }
                            if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                                getObject(theObject[prop]);
                            }
                        }
                    }
                } // end getObject

                getObject(theObject);

                // console.log('propname finalResults',propname,finalResults)

                resolve(finalResults)
            }
            catch (e) {
                console.error('error:', e)
                reject(e);
            }
        }); //end promise
    } // end function


    retrieveSheet(sheetid, alt) {
        return new Promise((resolve, reject) => {
            try {

                const sheetConfig = require('./sheetConfig.js');
                const sheeturls = sheetConfig.getSheetList();

                const entityTypes = sheetConfig.getEntityTypeList()

                // console.log('process.env.SHEETID',process.env.SHEETID )
                // console.log('process.env.WORKSHEET',process.env.WORKSHEET )
                // console.log('process.env.GAPIKEY',process.env.GAPIKEY )

                let _SHEETID = process.env.SHEETID || sheeturls['Indicator'].id;
                if (sheetid) {
                    _SHEETID = sheetid
                }
                let _ALT = "json";
                if (alt) {
                    _ALT = alt
                }
                let _WORKSHEET = process.env.WORKSHEET || 'Indicators'
                // if (worksheet) {
                //     _WORKSHEET = worksheet
                // }
                let _APIKEY = process.env.GAPIKEY || "AIzaSyA2C9xknFbJsUGlz6i3tI_33c1hvU1f7qA"
                console.log('_SHEETID _ALT _WORKSHEET _APIKEY', _SHEETID, _ALT, _WORKSHEET, _APIKEY)


                //
                // https://stackoverflow.com/questions/30082277/accessing-a-new-style-public-google-sheet-as-json
                // https://console.developers.google.com/apis/credentials?pli=1&angularJsUrl=%2Fprojectselector%2Fapis%2Fcredentials%3Fpli%3D1%26supportedpurview%3Dproject&authuser=2&project=foafiaf-sheet-interface&folder&organizationId
                //
                let range = 'A1%3AAE75'
                // const _APIURL = 'https://sheets.googleapis.com/v4/spreadsheets/' + _SHEETID + '/values:batchGet?ranges=' + _WORKSHEET + '&majorDimension=ROWS&key=' + _APIKEY            
                const _APIURL = 'https://sheets.googleapis.com/v4/spreadsheets/' +
                    _SHEETID +
                    '/values/' + range +
                    '?key=' + _APIKEY

                console.log('_APIURL', _APIURL)


                fetch(_APIURL)
                    // .then(response => response.json())
                    .catch(error => {
                        console.log('fetch error', error)
                        reject(error)

                    })
                    .then(response => {

                        console.log('fetch Success:', JSON.stringify(response))
                        if (response.error) {
                            console.log('fetch response.error', response.error)
                            reject(response.error)

                        }
                        else {
                            // console.log('fetch response',JSON.stringify(response) )
                            let data = response;
                            // console.log('data: ',data)

                            resolve(data)



                        } //end if not error
                    });

            }
            catch (e) {
                console.error('retrieveSheet e:', e)
                reject(e);
            }
        }); //end promise
    } // end function



    retrieveEntities() {
        console.log('retrieveEntities()', )
        return new Promise((resolve, reject) => {
            try {

                const sheetConfig = require('./sheetConfig.js');
                const sheeturls = sheetConfig.getSheetList();

                const entityTypes = sheetConfig.getEntityTypeList()

                // console.log('process.env.SHEETID',process.env.SHEETID )
                // console.log('process.env.WORKSHEET',process.env.WORKSHEET )
                // console.log('process.env.GAPIKEY',process.env.GAPIKEY )

                let _SHEETID = process.env.SHEETID || sheeturls['Indicator'].id;

                let _APIKEY = process.env.GAPIKEY || "AIzaSyA2C9xknFbJsUGlz6i3tI_33c1hvU1f7qA"
                console.log('_SHEETID  _APIKEY', _SHEETID, _APIKEY)

                //
                // https://developers.google.com/apis-explorer/?hl=en_US#p/sheets/v4/sheets.spreadsheets.values.get?spreadsheetId=1Vod362xQ__GehFbVfO3FrgN0Nawu4Nv74DeC5yPjjfw&range=A1%253AAE75&_h=2&
                //
                let range = 'A1%3AAE75'
                // const _APIURL = 'https://sheets.googleapis.com/v4/spreadsheets/' + _SHEETID + '/values:batchGet?ranges=' + _WORKSHEET + '&majorDimension=ROWS&key=' + _APIKEY            
                const _APIURL = 'https://sheets.googleapis.com/v4/spreadsheets/' +
                    _SHEETID +
                    '/values/' + range +
                    '?key=' + _APIKEY
                console.log('_APIURL', _APIURL)


                fetch(_APIURL)
                    .catch(error => {
                        console.log('fetch error', error)
                        resolve(error)

                    })
                    // .then(response => response.json())
                    .then(response => {

                        // console.log('Success:', JSON.stringify(response)) 
                        if (response.error) {
                            console.log('fetch response.error', response.error)
                            reject(response.error)

                        }
                        else {
                            // console.log('fetch response',JSON.stringify(response) )
                            let data = response;
                            // console.log('data: ',data)

                            // resolve(data)

                            let RowValues = data.values;

                            const rows = [];
                            for (let i = 1; i < RowValues.length; i++) {
                                let rowObject = {};
                                for (let j = 0; j < RowValues[i].length; j++) {
                                    rowObject[RowValues[0][j]] = RowValues[i][j];
                                }
                                rows.push(rowObject);
                            }
                            // console.log('rows', rows )
                            // 
                            resolve(rows)



                        } //end if not error
                    });

            }
            catch (e) {
                console.error('retrieveEntities e:', e)
                reject(e);
            }
        }); //end promise
    } // end function


    retrieveEntity(entityid) {
        console.log('retrieveEntity(entityid)', entityid)
        return new Promise((resolve, reject) => {
            try {

                const sheetConfig = require('./sheetConfig.js');
                const sheeturls = sheetConfig.getSheetList();

                const entityTypes = sheetConfig.getEntityTypeList()

                // console.log('process.env.SHEETID',process.env.SHEETID )
                // console.log('process.env.WORKSHEET',process.env.WORKSHEET )
                // console.log('process.env.GAPIKEY',process.env.GAPIKEY )

                let _SHEETID = process.env.SHEETID || sheeturls['Indicator'].id;

                let _APIKEY = process.env.GAPIKEY || "AIzaSyA2C9xknFbJsUGlz6i3tI_33c1hvU1f7qA"
                // console.log('_SHEETID _WORKSHEET _APIKEY',_SHEETID,_WORKSHEET,_APIKEY)

                //
                // https://developers.google.com/apis-explorer/?hl=en_US#p/sheets/v4/sheets.spreadsheets.values.get?spreadsheetId=1Vod362xQ__GehFbVfO3FrgN0Nawu4Nv74DeC5yPjjfw&range=A1%253AAE75&_h=2&
                //
                let range = 'A1%3AAE75'
                // const _APIURL = 'https://sheets.googleapis.com/v4/spreadsheets/' + _SHEETID + '/values:batchGet?ranges=' + _WORKSHEET + '&majorDimension=ROWS&key=' + _APIKEY            
                const _APIURL = 'https://sheets.googleapis.com/v4/spreadsheets/' +
                    _SHEETID +
                    '/values/' + range +
                    '?key=' + _APIKEY
                console.log('_APIURL', _APIURL)


                fetch(_APIURL)
                    .then(response => response.json())
                    .catch(error => { reject(error) })
                    .then(response => {

                        // console.log('Success:', JSON.stringify(response)) 
                        if (response.error) {
                            console.log('fetch response.error', response.error)
                            reject(response.error)

                        }
                        else {
                            // console.log('fetch response',JSON.stringify(response) )
                            let data = response;
                            // console.log('data: ',data)

                            // resolve(data)

                            let RowValues = data.values;

                            const rows = [];
                            for (let i = 1; i < RowValues.length; i++) {
                                let rowObject = {};
                                for (let j = 0; j < RowValues[i].length; j++) {
                                    rowObject[RowValues[0][j]] = RowValues[i][j];
                                }
                                rows.push(rowObject);
                            }
                            // console.log('rows', rows )
                            // 
                            // resolve(rows)

                            //find row with entity @id
                            let _id = entityid || ""
                            // console.log('_id',_id)

                            const objUtils = new Utils_Class()
                            // findObjects(obj, targetProp, targetValue, finalResults) {
                            let ent = objUtils.getEntityById(rows, _id) || null;
                            // console.log('ent',ent)

                            resolve(ent)


                        } //end if not error
                    });

            }
            catch (e) {
                console.error('retrieveEntity e:', e)
                reject(e);
            }
        }); //end promise
    } // end function


}; // end GSheet_Class
// module.exports = GSheet_Class
