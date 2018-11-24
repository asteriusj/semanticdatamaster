//
//  shared routine for transforming JSON SChema of form field elements 
//  into a SHACL file 
//
class JSONSchema2SHACL {

    constructor() {

    }

    transform(_json) {
        console.log('transform _json:', _json)
        return new Promise(function (resolve, reject) {

            try {

                let _jsonschema = { "id": "Person.json", "title": "Person", "format": "http://schema.org/Person", "comment": "A person (alive, dead, undead, or fictional).", "media": { "type": "application/json;profile=http://schema.org/Person" }, "allOf": [{ "$ref": "Thing.json" }], "type": "object", "properties": { "additionalName": { "type": "array", "items": { "$ref": "#/definitions/additionalName" } }, "birthDate": { "title": "Birth Date", "description": "Date of birth.", "type": "string", "format": "date", "pattern": "" }, "familyName": { "id": "txtlastname", "title": "Family Name", "description": "Family name. In the U.S., the last name of an Person. This can be used along with givenName instead of the Name property.", "type": "string", "maxLength": 16, "size": 13, "required": true, "placeholder": "" }, "givenName": { "control": "input", "type": "string", "format": "text", "id": "txtGivenName", "name": "givenName", "title": "First or given name  ", "placeholder": "Fisrst Name goes here  ", "value": "Michael", "x_semantic": "foaf:givenName", "x_contentmap": "employee.person.givenname", "maxLength": 16, "size": 12, "autocomplete": "FALSE", "required": true, "helpMessage": "First name to be used ", "default": "Michael" }, "postalCode": { "type": "string", "maxItems": 1, "minItems": 1, "name": "zip code", "x_semantic": "schema:postalCode", "pattern": "^\\d{5}(?:[-\\s]\\d{4})?$" } }, "definitions": { "additionalName": { "title": "Additional Name", "description": "An additional name for a Person, can be used for a middle name.", "type": "string" }, "array": { "type": "array", "items": { "$ref": "#" } }, "birthDate": { "title": "Birth Date", "description": "Date of birth.", "type": "string", "format": "date" }, "familyName": { "title": "Family Name", "description": "Family name. In the U.S., the last name of an Person. This can be used along with givenName instead of the Name property.", "type": "string" }, "gender": { "title": "Gender", "description": "Gender of the person.", "type": "string" }, "givenName": { "title": "Given Name", "description": "Given name. In the U.S., the first name of a Person. This can be used along with familyName instead of the Name property.", "type": "string" } } }

                let _shacl = { "@graph": [{ "@id": "schema:Person", "@type": ["sh:NodeShape", "rdfs:Class"], "comment": "A person (alive, dead, undead, or fictional).", "label": "Person", "subClassOf": "schema:Thing", "equivalentClass": "http://xmlns.com/foaf/0.1/Person", "property": ["_:b603", "_:b604", "_:b605", "_:b606", "_:b607", "_:b608", "_:b609", "_:b610", "_:b611", "_:b612", "_:b613", "_:b459", "_:b614", "_:b615", "_:b616", "_:b617", "_:b618", "_:b619", "_:b156", "_:b620", "_:b621", "_:b622", "_:b623", "_:b624", "_:b625", "_:b626", "_:b91", "_:b627", "_:b342", "_:b628", "_:b629", "_:b630", "_:b631", "_:b632", "_:b633", "_:b634", "_:b635", "_:b359", "_:b636", "_:b637", "_:b638", "_:b406", "_:b514", "_:b639", "_:b162", "_:b640", "_:b72", "_:b641", "_:b642", "_:b643", "_:b644", "_:b263", "_:b645", "_:b646", "_:b647", "_:b648"] }, { "@id": "_:b643", "datatype": "xsd:string", "description": "An additional name for a Person, can be used for a middle name.", "name": "additionalName", "path": "schema:additionalName" }, { "@id": "_:b648", "datatype": "xsd:string", "description": "Family name. In the U.S., the last name of an Person. This can be used along with givenName instead of the name property.", "name": "familyName", "path": "schema:familyName" }, { "@id": "_:b156", "datatype": "xsd:string", "description": "Given name. In the U.S., the first name of a Person. This can be used along with familyName instead of the name property.", "name": "givenName", "path": "schema:givenName" }, { "@id": "_:b162", "datatype": "xsd:date", "description": "Date of birth.", "name": "birthDate", "path": "schema:birthDate" }, { "@id": "http://datashapes.org/schema", "@type": "owl:Ontology", "comment": "<p>This is an experimental RDF/SHACL version of schema.org, generated based on the RDFa data model. Alignments with common RDF practices have been made, e.g. using rdfs:Class instead of schema:Class.</p><p>Contact: <a href=\"mailto:holger@topquadrant.com\">Holger Knublauch</a></p>", "label": "Schema.org (converted to SHACL by TopQuadrant)", "imports": "http://datashapes.org/dash", "versionInfo": "2017-08-15T17:28:01.687+10:00" }] }

                // if (_json === {}) _json = _jsonschema
                _json = _jsonschema

                let _JSON = JSON.stringify(_json) || _json;
                console.log('')
                console.log('JSONSchema2OWLJSONLD entry', _JSON)
                console.log('')


                var _graph = []

                // try processing schema
                try {

                    var objSchema = JSON.parse(_JSON); // parse input JSON Schema content to be transformed
                    // console.log('')
                    // console.log('objSchema:', objSchema);

                    var _objSchema = objSchema.schema || objSchema; // get root of schema elements
                    // console.log('')
                    // console.log('_objSchema:', _objSchema);

                    var _default = {
                        "@id": "https://github.com/asteriusj/semanticdatamaster/",
                        "@type": "owl:Ontology",
                        "date": "$Date: 2017-10-07 23:18:26 $",
                        "description": "This is a model defined with the SDM Ontology \n",
                        "title": "Semantic Data Master (SDM) Ontology",
                        "comment": "example of goes here?\n",
                        "label": {
                            "@language": "en",
                            "@value": "Ontology for Semantic Data Models "
                        },
                        "versionInfo": {
                            "@language": "en",
                            "@value": "Draft"
                        }
                    }

                    _graph.push(_default)

                    let _superclass = "sdm:Thing";


                    //
                    // If schema has title, then create an object / class for main entity
                    //
                    if (_objSchema['title'] != undefined) {

                        _superclass = "sdm:" + _objSchema['title'];

                        if (_objSchema['x_semantic']) {
                            _superclass = "sdm:" + _objSchema['x_semantic'];
                        }

                        // Main object type
                        let _id = _superclass;
                        let _type = ['owl:Class', 'sh:NodeShape'];
                        let _label = processSingleProp(_objSchema["label"]);
                        let _description = processSingleProp(_objSchema["description"]);
                        let _comment = processSingleProp(_objSchema["comment"]);
                        let _format = processSingleProp(_objSchema["format"]);

                        let _class = {};
                        if (_id) _class["@id"] = _id || "_:0";

                        if (_type) _class["@type"] = _type;

                        if (_label) _class["title"] = _label;
                        if (_description) _class["description"] = _description || _format;
                        if (_comment) _class["comment"] = _comment;

                        _class["subClassOf"] = "owl:Thing";
                        _class["equivalentClass"] = _format || "";


                        _class.properties = [];

                        // console.log('_class', _class)
                        _graph.push(_class)
                    }
                    else {
                        _graph.push(_default)
                    }

                    var _propArray = _objSchema.properties || null; // get property array to process
                    // console.log('_propArray:', _propArray);

                    processPropertyArray(_propArray, _superclass);


                    function processSingleProp(_p0) {
                        // console.log('processSingleProp')
                        let pp = null

                        if (_p0 != undefined) {
                            console.log('_p0', _p0)

                            let _p1 = null;
                            if (Array.isArray(_p0)) {
                                _p1 = _p0[0]
                            }
                            else {
                                _p1 = _p0
                            };
                            console.log('_p1', _p1)

                            let _p2 = null;
                            if (_p1['@value']) {
                                _p2 = _p1['@value']
                            }
                            else {
                                _p2 = _p1
                            };
                            console.log('_p2', _p2)

                            pp = _p2;
                            console.log('pp', pp)
                        }

                        return pp
                    }; // end



                    // function processClassEl(_el) {
                    //     // console.log('processClassEl')
                    //     return new Promise((resolve, reject) => {
                    //         try {

                    //             let id = processSingleProp(_el["@id"]);
                    //             let type = 'object';
                    //             let label = processSingleProp(_el["label"]);
                    //             let title = processSingleProp(_el["title"]);
                    //             let description = processSingleProp(_el["description"]);
                    //             let subclassof = processSingleProp(_el["subClassOf"]);


                    //             let property = {}
                    //             if (id) property['id'] = id;
                    //             if (type) property['type'] = type;
                    //             if (label) property['name'] = label;
                    //             if (title) property['title'] = title;
                    //             if (description) property['description'] = title;

                    //             if (subclassof) property['parent'] = subclassof;

                    //             _schema.properties[id] = property

                    //             resolve(_schema)

                    //         }
                    //         catch (e) {
                    //             console.error('function processClassEl e:', e)
                    //             reject(e)
                    //         }
                    //         finally {}

                    //     }) // end return
                    // }; // end function processClassEl

                    // function processDataTypePropertyEl(_el) {
                    //     // console.log('processDataTypePropertyEl')

                    //     let id = processSingleProp(_el["@id"]);
                    //     let type = processSingleProp(_el["@type"]);

                    //     let label = processSingleProp(_el["label"]);
                    //     let title = processSingleProp(_el["title"]);
                    //     let description = processSingleProp(_el["description"]);

                    //     let domain = processSingleProp(_el["domain"]);
                    //     let range = processSingleProp(_el["range"]);

                    //     let equivalentclass = processSingleProp(_el["equivalentClass"]);
                    //     let propertydisjointwith = processSingleProp(_el["propertyDisjointWith"]);

                    //     let property = {}
                    //     if (id) property['id'] = id;
                    //     if (type) property['type'] = range || "string"; // need to process options
                    //     if (label) property['name'] = label;
                    //     if (title) property['title'] = title;
                    //     if (description) property['description'] = title;
                    //     if (domain) property['parent'] = domain;
                    //     // if (range) property['range'] = range;
                    //     if (equivalentclass) property['x_semantic'] = equivalentclass;
                    //     // if (propertydisjointwith) property['propertyDisjointWith'] = propertydisjointwith;

                    //     _schema.properties[id] = property

                    //     //   "txtLastName": {
                    //     //     "control": "input",
                    //     //     "type": "string",
                    //     //     "format": "text",
                    //     //     "id": "txtLastName",
                    //     //     "name": "familyName",
                    //     //     "title": "Last Name",
                    //     //     "x_semantic": "foaf:familyName",
                    //     //     "x_contentmap": "employee.person.familyname",
                    //     //     "size": 13,
                    //     //     "autocomplete": "FALSE",
                    //     //     "required": true
                    //     //   },

                    // }; // end function processDataTypePropertyEl

                    //
                    // Starting DataProperty
                    //
                    function processDataProperty(key, obj, superclass) {
                        // console.log('processDataProperty')
                        return new Promise((resolve, reject) => {
                            try {

                                let _type = "owl:DatatypeProperty";

                                let _id = key || null;

                                // let _comment = obj['title'] || null;
                                // let _comment = obj['placeholder'] || null;
                                let _comment = obj['comment'] || null;

                                let _label = obj['label'] || obj['name'] || obj['title'] || null;

                                let _name = _label

                                let _description = obj['description'] || null;

                                let _domain = superclass;

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

                                let _pattern = obj['pattern'] || null;

                                let _equivalentProperty = obj['x_semantic'] || null;
                                let _path = obj['x_semantic'] || null;

                                let _definition = obj['helpMessage'] || null;

                                let _example = obj['default'] || null; /// Use HOW ???

                                let _minItems = obj['minItems'] || null;
                                let _maxItems = obj['maxItems'] || null;

                                // sh:property [
                                //     sh:path schema:postalCode ;
                                //     sh:datatype xsd:string ;
                                //     sh:maxCount 1 ;
                                //     sh:minCount 1 ;
                                //     sh:name "zip code" ;
                                //     sh:pattern "^\\d{5}(?:[-\\s]\\d{4})?$" ;
                                //   ] ;
                                // {
                                //     "@id" : "_postalCode",
                                //     "datatype" : "xsd:string",
                                //     "sh:maxCount" : 1,
                                //     "sh:minCount" : 1,
                                //     "name" : "zip code",
                                //     "path" : "schema:postalCode",
                                //     "pattern" : "^\\d{5}(?:[-\\s]\\d{4})?$"
                                //   }
                                // "_postalCode": {
                                //   "type": "string",
                                //   "maxCount": 1,
                                //   "minCount": 1,
                                //   "name": "zip code",
                                //   "x_semantic": "schema:postalCode",
                                //   "pattern": "^\\d{5}(?:[-\\s]\\d{4})?$"
                                // }

                                // set shacl constraint - http://json-schema.org/latest/json-schema-validation.html#rfc.section.6.4.4
                                let sh_ = {}
                                if (_id) sh_["@id"] = "_:" + _id
                                if (_range) sh_["datatype"] = _range
                                if (_minItems) sh_["maxCount"] = _minItems
                                if (_minItems) sh_["minCount"] = _minItems
                                if (_name) sh_["name"] = _name
                                if (_path) sh_["path"] = _path
                                if (_pattern) sh_["pattern"] = _pattern
                                _graph.push(sh_)

                                // add to proerties array for parent
                                // console.log('_graph superclass', _graph, superclass)
                                function getById(arr, _id) {
                                    // console.log('arr', arr)
                                    for (var d = 0, len = arr.length; d < len; d += 1) {
                                        // console.log('arr[d]', arr[d])
                                        if (arr[d]["@id"] === _id) {
                                            console.log('arr[d]', arr[d])
                                            return arr[d];
                                        }
                                    }
                                }

                                var foo = getById(_graph, superclass);
                                // console.log('foo', foo)
                                if (foo) foo.properties.push(sh_["@id"])

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
                                //   "@id": "_:b643",
                                //   "datatype": "xsd:string",
                                //   "description": "An additional name for a Person, can be used for a middle name.",
                                //   "name": "additionalName",
                                //   "path": "schema:additionalName"
                                // },


                                // create _entry entry
                                let _entry = {};
                                // _entry.key = _key;
                                _entry["@id"] = _id;
                                _entry["datatype"] = _range;
                                if (_label) _entry["rdfs:label"] = _label;
                                if (_name) _entry["name"] = _name;
                                if (_comment) _entry["rdfs:comment"] = _comment;
                                if (_description) _entry["description"] = _description;

                                if (_path) _entry["path"] = _path;

                                if (_equivalentProperty) _entry["owl:equivalentProperty"] = _equivalentProperty;
                                if (_definition) _entry["skos:definition"] = _definition;

                                //
                                // Add entry to json-ld elements
                                //
                                // console.log('_entry', _entry)
                                _graph.push(_entry)



                            } // end try
                            catch (e) {
                                console.error('function processDataProperty e:', e)
                                reject(e)
                            }
                            finally {}
                        }) // end return
                    }; // end function processDataProperty


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

                                let _type = obj.type

                                //
                                //process property based on type
                                ///
                                if (_type.includes('object')) {

                                    // // process type Class element
                                    // processClassEl(_element)
                                    //     .then((data) => {})
                                    //     .catch((e) => { console.error(e) })

                                }
                                else if (['string', 'number', 'boolean'].includes(obj.type)) {

                                    // process type Property element
                                    processDataProperty(key, obj, _superclass)
                                        .then((data) => {})
                                        .catch((e) => { console.error(e) })
                                }





                            } // end for objArray


                        } // end try
                        catch (e) {
                            console.log('catch e error in function processTypeObjectArray ', e);
                        }
                        finally {
                            return;
                        }
                    }; // end of function processTypeObjectArray


                    // set contect and graph id
                    var _context = {
                        "schema": "http://schema.org/",
                        "con": "http://www.w3.org/2000/10/swap/pim/contact#",
                        "owl": "http://www.w3.org/2002/07/owl#",
                        "org": "http://www.w3.org/ns/org#",
                        "xsd": "http://www.w3.org/2001/XMLSchema#",
                        "sh": "http://www.w3.org/ns/shacl#",
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
                    console.log('catch e error in JSONSchema2SHACL ', e);
                    throw (e);
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
                    // if (cb) cb(_content);
                    // return _content;
                    resolve(_content)

                } // end finally

            } // end try promise
            catch (e) {
                console.log('catch error JSONSchema2SHACL', e);
                // if (cb) cb(e);
                reject(e);
            }
        }); // end promise

    }; // end function JSONSchema2SHACL transform

}; // end class JSONSchema2SHACL

module.exports = JSONSchema2SHACL
