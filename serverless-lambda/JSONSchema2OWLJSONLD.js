//
//  shared routine for transforming anOWL in JSON-LD of form field elements 
//  into a JSON Schema //
class JSONSchema2SHACL {

    constructor() {

    }

    transform(_jsonschema) {

        return new Promise(function (resolve, reject) {
            try {
                let _JSON = JSON.stringify(_json) || _json;
                console.log('')
                console.log('JSONSchema2OWLJSONLD entry', _JSON)
                console.log('')

                var _graph = [
                    {
                        "@id": "https://github.com/asteriusj/semanticdatamaster/",
                        "@type": "owl:Ontology",
                        "date": "$Date: 2017-10-07 23:18:26 $",
                        "description": "This is a model defined with the SDM Ontology \n",
                        "title": "Semantic Data Master (SDM) Ontology",
                        "comment": "exmaple of goes here?\n",
                        "label": {
                            "@language": "en",
                            "@value": "Ontology for Semantic Data Models "
                        },
                        "versionInfo": {
                            "@language": "en",
                            "@value": "Draft"
                        }
                    }
                ]

                // try processing schema
                try {
    
                    var objSchema = JSON.parse(_JSON); // parse input JSON Schema content to be transformed
                    console.log('')
                    // console.log('objSchema:', objSchema);
    
                    var _objSchema = objSchema.schema || objSchema; // get root of schema elements
                    console.log('')
                    // console.log('_objSchema:', _objSchema);
    
                    let _superclass = "sdm:Thing";
    
    
                    //
                    // If schema has title, then create an object / class for main entity
                    //
                    if (_objSchema['title'] != undefined) {
    
                        if (_objSchema['x_semantic']) {
                            _superclass = "sdm:" + _objSchema['x_semantic']
                        }
    
                        // Main object type
                        let _class = {};
                        _class.key = _objSchema['x_contentmap'] || "Thing";
                        _class["@id"] = _superclass;
                        _class["@type"] = "owl:Class";
                        _class["label"] = _objSchema['title'] || _objSchema['x_semantic'];
                        _class["comment"] = _objSchema['description'] || null;
                        _class["subClassOf"] = "owl:Thing";
    
                        // console.log('_class', _class)
                        _graph.push(_class)
                    }
    
                    var _propArray = _objSchema.properties || null; // get property array to process
                    // console.log('_propArray:', _propArray);
    
                    processPropertyArray(_propArray, _superclass);
    
                    //
                    // Start process proerty array function
                    //
                    function processPropertyArray(objArray, superclass) {
                        console.log('')
                        console.log('processTypeObjectArray', objArray, superclass)
                        console.log('')
                        try {
                            //
                            // Loop over schema properties an create an OWL element for each field defined
                            //
                            var ids = [];
                            for (var key in objArray) {
    
                                console.log(objArray[key]);
    
                                let obj = objArray[key]
    
                                let _key = key || obj.id || obj['x_contentmap'] || null;
    
                                let _semantic = obj['x_semantic'] || null;
    
                                let _id = obj.id || _key;
    
                                _id = "sdm:" + _id;
    
    
                                //
                                // Starting DataProperty
                                //
                                if (['string', 'number', 'boolean'].includes(obj.type)) {
    
                                    let _type = "owl:DatatypeProperty";
    
                                    // let _comment = obj['title'] || null;
                                    // let _comment = obj['placeholder'] || null;
                                    let _comment = obj['description'] || null;
    
                                    let _label = obj['label'] || obj['name'] || obj['title'] || null;
    
                                    let _domain = superclass;
    
                                    // if (obj['x_contentmap'].includes("person")) {
                                    //     _domain = "sdm:Person";
                                    // }
                                    // else {
                                    //     _domain = "sdm:Person";
                                    // }
    
                                    let _range = null;
    
                                    if (obj.type === "string") {
                                        _range = "xsd:string";
                                    }
                                    else if (obj.type === "boolean") {
                                        _range = "xsd:boolean";
                                    }
                                    else if (obj.type === "number") {
                                        _range = "xsd:integer";
                                    }
                                    else {
                                        _range = "rdfs:Literal";
                                    }
    
                                    if (obj.format === "date") {
                                        _range = "xsd:date";
                                    }
                                    //
                                    // more formats here
    
                                    let _equivalentProperty = obj['x_semantic'] || null;
    
                                    let _definition = obj['helpMessage'] || null;
    
                                    let _example = obj['default'] || null; /// Use HOW ???
    
    
                                    //
                                    // Process restrictions for formats
                                    //
                                    if (obj.format === "range") {
    
                                        let _min = obj['min'] || null;
                                        let _max = obj['max'] || null;
    
                                        let _restrictions = [
                                            {
                                                "@id": "sdm:personAge",
                                                "equivalentClass": "_:min12max19"
                                                },
                                            {
                                                "@id": "sdm:personAge",
                                                "equivalentClass": "_:min12max19"
                                                },
                                            {
                                                "@id": "_:min12max19",
                                                "@type": "rdfs:Datatype",
                                                "onDatatype": "xsd:integer",
                                                "withRestrictions": {
                                                    "@list": [
                                                        { "xs:minExclusive": 12 },
                                                        { "xs:maxInclusive": 19 }
                                                    ]
                                                }
                                                }
                                            ]
    
                                        _graph.push(_restrictions)
    
                                    }; // end process restrictions
    
    
                                    // {
                                    //   "@id": "sdm:age",
                                    //   "@type": "owl:DatatypeProperty",
                                    //   "comment": "\nAge in years.\n",
                                    //   "domain": "sdm:Person",
                                    //   "label": "age",
                                    //   "range": "sdm:personAge",
                                    //   "equivalentProperty": "foaf:age"
                                    // },
                                    // {
                                    //   "@id": "sdm:personAge",
                                    //   "equivalentClass": "_:min12max19"
                                    // },
                                    // {
                                    //   "@id": "_:min12max19",
                                    //   "@type": "rdfs:Datatype",
                                    //   "onDatatype": "xsd:integer",
                                    //   "withRestrictions": {
                                    //     "@list": [
                                    //       "_:min12",
                                    //       "_:max19"
                                    //     ]
                                    //   }
                                    // },
    
                                    //   "txtGivenName": {
                                    //     "control": "input",
                                    //     "type": "string",
                                    //     "format": "text",
                                    //     "id": "txtGivenName",
                                    //     "name": "givenName",
                                    //     "title": "First or given name  ",
                                    //     "placeholder": "Fisrst Name goes here  ",
                                    //     "value": "Michael",
                                    //     "x_semantic": "foaf:givenName",
                                    //     "x_contentmap": "person.givenname",
                                    //     "size": 13,
                                    //     "autocomplete": "FALSE",
                                    //     "required": true,
                                    //     "helpMessage": "First name to be used ",
                                    //     "default": "Michael"
                                    //   },
                                    // {
                                    //   "@id": "sdm:given-name",
                                    //   "@type": "owl:DatatypeProperty",
                                    //   "comment": {
                                    //     "@language": "en",
                                    //     "@value": "The given name associated with the object"
                                    //   },
                                    //   "domain": "sdm:Person",
                                    //   "label": {
                                    //     "@language": "en",
                                    //     "@value": "given name"
                                    //   },
                                    //   "range": "xsd:string",
                                    // owl:equivalentProperty  foaf:birthday ,
                                    // skos:definition      "Strategy maps identified entity(s)." .
    
                                    // :hasResponseType  a  owl:DatatypeProperty;
                                    // rdfs:range  [
                                    //     a  rdfs:Datatype;
                                    //     owl:oneOf  ( "Accept" "Decline" "Provisional" )
                                    // ] .
    
                                    // },
    
    
                                    // create _entry entry
                                    let _entry = {};
                                    _entry.key = _key;
                                    _entry["@id"] = _id;
                                    _entry["@type"] = _type;
                                    if (_label) _entry["rdfs:label"] = _label;
                                    if (_comment) _entry["rdfs:comment"] = _comment;
                                    if (_domain) _entry["rdfs:doman"] = _domain;
                                    if (_range) _entry["rdfs:range"] = _range;
                                    if (_equivalentProperty) _entry["owl:equivalentProperty"] = _equivalentProperty;
                                    if (_definition) _entry["skos:definition"] = _definition;
    
                                    //
                                    // Add entry to json-ld elements
                                    //
                                    // console.log('_entry', _entry)
                                    _graph.push(_entry)
    
    
                                }; // end if datatype property
                                //
                                // end of DataProperty 
                                //
    
    
    
                                //
                                // start of ObjectProperty  or subclass object
                                //
                                if (obj.type === 'object') {
    
                                    //do object routine
                                    //   "customer": {
                                    //         "type": "object",
                                    //         "title": "Customer",
                                    //         "properties": {
                                    //           "name": {
                                    //             "type": "string",
                                    //             "title": "Name"
                                    //           },
                                    //           "gender": {
                                    //             "type": "string",
                                    //             "title": "Gender",
                                    //             "enum": [
                                    //               "male",
                                    //               "female",
                                    //               "alien"
                                    //             ]
                                    //           }
                                    //         }
    
                                    var _akey = key || objArray['x_contentmap'] || null;
                                    var _aid = objArray['id'] || _akey;
                                    var _atype = "owl:Class";
                                    var _alabel = objArray['title'] || objArray['x_semantic'];
                                    var _acomment = objArray['description'] || null;
                                    var _asubclassof = superclass;
    
                                    let _aclass = {};
                                    if (_akey) _aclass.key = _akey;
                                    if (_aid) _aclass["@id"] = _aid;
                                    if (_atype) _aclass["@type"] = _atype;
                                    if (_alabel) _aclass["rdfs:label"] = _alabel;
                                    if (_acomment) _aclass["rdfs:comment"] = _acomment;
                                    if (_asubclassof) _aclass["rdfs:subClassOf"] = _asubclassof;
    
                                    // console.log('_aclass', _aclass)
                                    _graph.push(_aclass)
    
                                    // get properties of obj that has _key
                                    var _aproparray = obj.properties
    
                                    // call function to process properties recureively
                                    //
                                    //
                                    //
                                    // var processTypeObjectArray(_aproparray, _key);
    
    
                                }; // end if object
                                //
                                // end of ObjectProperty    
                                //
    
                            }; // end for each obj
                        } // end try
                        catch (e) {
                            console.log('catch e error in function processTypeObjectArray ', e);
                        }
                        finally {
                            return;
                        }
                    } // end of function processTypeObjectArray
    
                    // set contect and graph id
                    var _context = {
                        "schema": "http://schema.org/",
                        "con": "http://www.w3.org/2000/10/swap/pim/contact#",
                        "owl": "http://www.w3.org/2002/07/owl#",
                        "org": "http://www.w3.org/ns/org#",
                        "xsd": "http://www.w3.org/2001/XMLSchema#",
                        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
                        "vcard": "http://www.w3.org/2006/vcard/ns#",
                        "dbo": "http://dbpedia.org/ontology/",
                        "sf": "https://github.com/vocol/salesforce/",
                        "dct": "http://purl.org/dc/terms/",
                        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                        "xs": "http://www.w3.org/2001/XMLSchema#",
                        "prov": "http://www.w3.org/ns/prov#",
                        "vs": "http://www.w3.org/2003/06/sw-vocab-status/ns#",
                        "sdm": "https://github.com/asteriusj/semanticdatamaster/",
                        "foaf": "http://xmlns.com/foaf/0.1/",
                        "dc": "http://purl.org/dc/elements/1.1/"
                    };
    
                } // end try processing schema
                catch (e) {
                    console.log('catch e error in JSONSCHEMAtoFormFieldDefJSON ', e);
                    // if (cb) cb(e);
                }
                finally {
                    // console.log('finally _graph:', _graph)
    
                    var result = {
                        "@id": "urn:x-arq:DefaultGraph",
                        "@context": _context,
                        "@graph": _graph
                    }
    
                    //
                    // OUTPUT RESuLTING JSON-LD
                    // 
                    let _content = JSON.stringify(result);
                    console.log('')
                    console.log('FINALLY _content', _content)
                    console.log('')
                    if (cb) cb(_content);
                    // return _content;
                    resolve(_content)
    
                } // end finally


            } // end try promise
            catch (e) {
                console.log('catch error JSONSchema2OWLJSONLD', e);
                // if (cb) cb(e);
                reject(e);}
        }); // end promise

    }; // end function JSONSchema2SHACL transform

}; // end class JSONSchema2SHACL

module.exports = JSONSchema2SHACL
