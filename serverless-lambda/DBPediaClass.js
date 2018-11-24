//
//  shared routine for capturing DBPedia properties that entend entities
//

// const request = require('request');
const fetch = require('node-fetch');
// const CryptoJS = require("crypto-js");
// const Item = require('./models/Item');

// const connectToDatabase = require('./db');
// const LogItem = require('./models/LogItem');
// const CacheStorage = require('./CacheStorage')

class DBPedia_Class {

    dbpLookUp(_dbp) {
        console.log('begin dbpLookUp(_dbp)', _dbp)
        return new Promise((resolve, reject) => {
            try {
                let _dbpedia = {
                    country: null,
                    state: null,
                    city: null,
                    location: null,
                    abstract: null,
                    comment: null,
                    type: null,
                    label: null,
                    product: null,
                    industry: null,
                    homepage: null,
                    sameas: null,
                    title: null,
                    text: null,
                    subject: null,
                    author: null,
                    wasDerivedFrom: null,
                    isPrimaryTopicOf: null,
                    name: null
                };
                //fecth depedia page if it exists
                if ((_dbp == null) || (_dbp == "http://dbpedia.org/page/")) return null;

                let URL = _dbp.replace('/page/', '/data/') + '.json'
                // console.log('dbpLookUp url: ', URL)

                let something = false;

                // function to process property returned from dbpedia
                function getDBPval(prop) {
                    // console.log('getDBPval(prop)',prop)
                    let res = null;
                    if (!isEmpty(prop)) {
                        let item = prop[0] // get first record from result arrays

                        if (item.length > 1) {
                            for (var key in item) {
                                let itm = item[key]
                                if (itm.lang) {
                                    if (itm.lang === 'en') res = itm
                                }
                                else {
                                    res = itm
                                }
                            }
                        }
                        else {
                            if (item.lang) {
                                // console.log('getDBPval(prop)',prop)
                                if (item.lang === 'en') res = item
                            }
                            else {
                                res = item
                            }
                        }
                    }
                    // console.log('getDBPval res',res)
                    return res
                } // end getDBPval


                // fetch dbpedia as json
                // console.log('URL:',URL)
                fetch(URL)
                    .then(response => response.json())
                    .then(function (myJson) {
                        // console.log('fetch URL',URL)

                        return myJson
                    })
                    .then(function (myJson) {

                        // save DBPedia data page is not null
                        // let dbpdata = myJson;
                        // if (dbpdata != null) {
                        // //
                        // // save dbpdata to cache
                        // //
                        // _upsertCache(key, dbpdata, function(err,result) {
                        //     if(err) console.error('call _upsertCache err:',err)
                        //     // console.log('call _upsertCache res:',result)

                        // }); // end _upsertCache

                        // //
                        // // save to S3
                        // //
                        // let name = key;
                        // let type = "json";
                        // // console.log('_save2s3 name', name)
                        // Cache.save2s3(dbpdata, name, type, function (err, result) {
                        //     if (err) console.error('call _save2s3 err:', err)
                        //     // console.log('call _save2s3 result:', result)
                        //     // return result
                        // })

                        // }

                        return myJson

                    })
                    .then(function (myJson) {
                        getProperty('http://dbpedia.org/ontology/state', myJson)
                            .then((data) => {
                                let val = getDBPval(data)
                                if (val != null) {
                                    if (Array.isArray(val)) {
                                        val = val[0]
                                    }
                                    _dbpedia.state = val['value'] || val;
                                    something = true
                                }
                            }) // end getProperty
                        return myJson
                    })
                    .then(function (myJson) {
                        getProperty('http://dbpedia.org/property/country', myJson)
                            .then((data) => {
                                let val = getDBPval(data)
                                if (val != null) {
                                    if (Array.isArray(val)) {
                                        val = val[0]
                                    }
                                    _dbpedia.country = val['value'] || val;
                                    if (_dbpedia.country === "USA") _dbpedia.country = "United States";
                                    if (_dbpedia.country === "U.S.") _dbpedia.country = "United States";
                                    something = true
                                }
                            }) // end getProperty
                        return myJson
                    })
                    .then(function (myJson) {
                        getProperty('http://dbpedia.org/ontology/city', myJson)
                            .then((data) => {
                                let val = getDBPval(data)
                                if (val != null) {
                                    if (Array.isArray(val)) {
                                        val = val[0]
                                    }
                                    _dbpedia.city = val['value'] || val;

                                    // console.log('_dbpedia.city',_dbpedia.city)

                                    something = true
                                }
                            }) // end getProperty
                        return myJson
                    })
                    .then(function (myJson) {
                        getProperty('http://dbpedia.org/ontology/location', myJson)
                            .then((data) => {
                                let val = getDBPval(data)
                                if (val != null) {
                                    if (Array.isArray(val)) {
                                        val = val[0]
                                    }
                                    _dbpedia.location = val['value'] || val;
                                    something = true
                                }
                            }) // end getProperty
                        return myJson
                    })
                    .then(function (myJson) {
                        getProperty('http://dbpedia.org/ontology/abstract', myJson)
                            .then((data) => {
                                let val = getDBPval(data)
                                // console.log('abstract val',val)
                                if (val != null) {
                                    if (Array.isArray(val)) {
                                        val = val[0]
                                    }
                                    _dbpedia.abstract = val['value'] || val;
                                    something = true
                                }
                            }) // end getProperty
                        return myJson
                    })
                    .then(function (myJson) {
                        getProperty('http://www.w3.org/2000/01/rdf-schema#comment', myJson)
                            .then((data) => {
                                let val = getDBPval(data)
                                // console.log('abstract val',val)
                                if (val != null) {
                                    if (Array.isArray(val)) {
                                        val = val[0]
                                    }
                                    _dbpedia.comment = val['value'] || val;
                                    something = true
                                }
                            }) // end getProperty
                        return myJson
                    })
                    .then(function (myJson) {
                        getProperty('http://www.w3.org/2000/01/rdf-schema#label', myJson)
                            .then((data) => {
                                let val = getDBPval(data)
                                if (val != null) {
                                    if (Array.isArray(val)) {
                                        val = val[0]
                                    }
                                    _dbpedia.label = val['value'] || val;
                                    something = true
                                }
                            }) // end getProperty
                        return myJson
                    })
                    .then(function (myJson) {
                        getProperty('http://www.w3.org/1999/02/22-rdf-syntax-ns#type', myJson)
                            .then((data) => {
                                let val = getDBPval(data)
                                if (val != null) {
                                    if (Array.isArray(val)) {
                                        val = val[0]
                                    }
                                    _dbpedia.type = val['value'] || val;
                                    something = true
                                }
                            }) // end getProperty
                        return myJson
                    })
                    .then(function (myJson) {
                        getProperty('http://dbpedia.org/ontology/product', myJson)
                            .then((data) => {
                                let val = getDBPval(data)
                                if (val != null) {
                                    if (Array.isArray(val)) {
                                        val = val[0]
                                    }
                                    _dbpedia.product = val['value'] || val;
                                    something = true
                                }
                            }) // end getProperty
                        return myJson
                    })
                    .then(function (myJson) {
                        getProperty('http://dbpedia.org/ontology/industry', myJson)
                            .then((data) => {
                                let val = getDBPval(data)
                                if (val != null) {
                                    if (Array.isArray(val)) {
                                        val = val[0]
                                    }
                                    _dbpedia.industry = val['value'] || val;
                                    something = true
                                }
                            }) // end getProperty
                        return myJson
                    })
                    .then(function (myJson) {
                        getProperty('http://xmlns.com/foaf/0.1/homepage', myJson)
                            .then((data) => {
                                let val = getDBPval(data)
                                if (val != null) {
                                    if (Array.isArray(val)) {
                                        val = val[0]
                                    }
                                    _dbpedia.homepage = val['value'] || val;

                                    something = true
                                }
                            }) // end getProperty
                        return myJson
                    })
                    .then(function (myJson) {
                        getProperty('http://www.w3.org/2002/07/owl#sameAs', myJson)
                            .then((data) => {
                                let val = getDBPval(data)
                                if (val != null) {
                                    if (Array.isArray(val)) {
                                        val = val[0]
                                    }
                                    _dbpedia.sameas = val['value'] || val;
                                    something = true
                                }
                            }) // end getProperty
                        return myJson
                    })
                    .then(function (myJson) {
                        getProperty('http://dbpedia.org/property/title', myJson)
                            .then((data) => {
                                let val = getDBPval(data)
                                if (val != null) {
                                    if (Array.isArray(val)) {
                                        val = val[0]
                                    }
                                    _dbpedia.title = val['value'] || val;
                                    something = true
                                }
                            }) // end getProperty
                        return myJson
                    })
                    .then(function (myJson) {
                        getProperty('http://dbpedia.org/property/text', myJson)
                            .then((data) => {
                                let val = getDBPval(data)
                                if (val != null) {
                                    if (Array.isArray(val)) {
                                        val = val[0]
                                    }
                                    _dbpedia.text = val['value'] || val;
                                    something = true
                                }
                            }) // end getProperty
                        return myJson
                    })
                    .then(function (myJson) {
                        getProperty('http://purl.org/dc/terms/subject', myJson)
                            .then((data) => {
                                let val = getDBPval(data)
                                if (val != null) {
                                    if (Array.isArray(val)) {
                                        val = val[0]
                                    }
                                    _dbpedia.subject = val['value'] || val;
                                    something = true
                                }
                            }) // end getProperty
                        return myJson
                    })
                    .then(function (myJson) {
                        getProperty('http://dbpedia.org/property/author', myJson)
                            .then((data) => {
                                let val = getDBPval(data)
                                if (val != null) {
                                    if (Array.isArray(val)) {
                                        val = val[0]
                                    }
                                    _dbpedia.author = val['value'] || val;
                                    something = true
                                }
                            }) // end getProperty
                        return myJson
                    })
                    .then(function (myJson) {
                        getProperty('http://www.w3.org/ns/prov#wasDerivedFrom', myJson)
                            .then((data) => {
                                let val = getDBPval(data)
                                if (val != null) {
                                    if (Array.isArray(val)) {
                                        val = val[0]
                                    }
                                    _dbpedia.wasDerivedFrom = val['value'] || val;
                                    something = true
                                }
                            }) // end getProperty
                        return myJson
                    })
                    .then(function (myJson) {
                        getProperty('http://xmlns.com/foaf/0.1/isPrimaryTopicOf', myJson)
                            .then((data) => {
                                let val = getDBPval(data)
                                if (val != null) {
                                    if (Array.isArray(val)) {
                                        val = val[0]
                                    }
                                    _dbpedia.isPrimaryTopicOf = val['value'] || val;
                                    something = true
                                }
                            }) // end getProperty
                        return myJson
                    })
                    .then(function (myJson) {
                        getProperty('http://xmlns.com/foaf/0.1/name', myJson)
                            .then((data) => {
                                let val = getDBPval(data)
                                if (val != null) {
                                    if (Array.isArray(val)) {
                                        val = val[0]
                                    }
                                    _dbpedia.name = val['value'] || val;
                                    something = true
                                }

                                if (something === true) {
                                    // return _dbpedia
                                    resolve(_dbpedia)
                                }
                                else {
                                    // return null
                                    resolve(null)
                                }

                            }) // end getProperty
                    })


                    .catch((err) => {
                        console.warn("fetch DBPedia warning:", err)
                        reject(e);
                    }); // end fetch

                // }); // end if cached

            }
            catch (e) {
                console.error('dbpLookUp e:', e)
                reject(e);
            }
        }); //end promise
    } // end function


}; // end DBPedia_Class

module.exports = DBPedia_Class

function getProperty(propname, json) {
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

function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0) return false;
    if (obj.length === 0) return true;

    if (obj === {}) return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and toValue enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}
