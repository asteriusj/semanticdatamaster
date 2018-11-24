// const myFunctions = require('./myFunctions')
// const SDS = require('./SemanticDataServices')


//
// inspired by https://code-maven.com/javascript-module-to-run-in-browser-and-in-node
//
(function () {
    "use strict";
    console.log('loading Transform.js')

    this.JSONSchema2OWLJSONLD = function () {
        console.log('')
        console.log('JSONSchema2OWLJSONLD')
        console.log('')
        return Object.freeze({

            transform: function (_jsonschema) {
                console.log('JSONSchema2OWLJSONLD.transform', _jsonschema)
                return new Promise(function (resolve, reject) {

                    try {

                        JSONSchema2OWLJSONLD(_jsonschema).then(function (_owljsonld) {
                            console.log('')
                            console.log('call JSONSchema2OWLJSONLD Succeed _owljsonld', _owljsonld)
                            console.log('')
                            // if (isJSONValid(_owljsonld)) {
                            //     resolve(_owljsonld)
                            // }
                            // else {
                            //     reject("_owljsonld Not valid JSON")
                            // }
                            resolve(_owljsonld)

                        }).catch(function (e) {
                            console.log('')
                            console.error('call JSONSchema2OWLJSONLD Fail! e', e)
                            console.log('')
                            reject(e)

                        });

                    }
                    catch (e) {
                        console.log('')
                        console.error('JSONSchema2OWLJSONLD.transform e', e)
                        console.log('')
                        reject(e);
                    }; // end try 
                }); // end promise

            },
            version: 0.20180122,
        });
    }();

    this.OWLJSONLD2JSONSchema = function () {
        console.log('OWLJSONLD2JSONSchema')
        return Object.freeze({

            transform: function (_owljsonld) {
                // console.log('OWLJSONLD2JSONSchema.transform', _owljsonld)
                console.log('OWLJSONLD2JSONSchema.transform')
                return new Promise(function (resolve, reject) {

                    try {

                        OWLJSONLD2JSONSchema(_owljsonld).then(function (_jsonschema) {
                            console.log('')
                            // console.log('call OWLJSONLD2JSONSchema Succeed _jsonschema', _jsonschema)
                            console.log('call OWLJSONLD2JSONSchema Succeed!')

                            resolve(_jsonschema)

                        }).catch(function (e) {
                            console.log('')
                            console.error('call OWLJSONLD2JSONSchema Fail! e', e)

                            reject(e)

                        });

                    }
                    catch (e) {
                        console.log('')
                        console.error('OWLJSONLD2JSONSchema.transform e', e)
                        console.log('')
                        reject(e);
                    }; // end try 
                }); // end promise

            },
            version: 0.20180214,
        });

    }();

    this.FormFieldDefs2JSONSchema = function () {
        console.log('FormFieldDefs2JSONSchema')
        return Object.freeze({

            transform: function (_jsonarray) {
                console.log('FormFieldDefs2JSONSchema.transform', _jsonarray)
                return new Promise(function (resolve, reject) {
                    try {

                        let _jsonschema = getJSONArraySaveJSONSchema(_jsonarray)
                        resolve(_jsonschema)

                    }
                    catch (e) {
                        console.error('FormFieldDefs2JSONSchema.transform e', e)
                        reject(e);
                    }; // end try 
                }); // end promise
            },
            version: 0.20180120,
        });

    }();

    this.JSONSchema2FormFieldDefs = function () {
        console.log('JSONSchema2FormFieldDefs')
        return Object.freeze({

            transform: function (_jsonschema) {
                console.log('JSONSchema2FormFieldDefs.transform', _jsonschema)
                return new Promise(function (resolve, reject) {
                    try {

                        getJSONSCHEMAsaveJSONArray(_jsonschema).then(function (_formfielddefs) {
                            console.log('call getJSONSCHEMAsaveJSONArray Succeed _formfielddefs', _formfielddefs)

                            if (isJSONValid(_formfielddefs)) {
                                resolve(_formfielddefs)
                            }
                            else {
                                reject("_formfielddefs Not valid JSON")
                            }

                        }).catch(function (e) {
                            console.error('call getJSONSCHEMAsaveJSONArray Fail! e', e)
                            reject(e)

                        });


                    }
                    catch (e) {
                        console.error('JSONSchema2FormFieldDefs.transform e', e)
                        reject(e);
                    }; // end try 
                }); // end promise
            },
            version: 0.20180120,
        });

    }();

}).call(this);


//
//  shared routine for transforming anOWL in JSON-LD of form field elements 
//  into a JSON Schema 
//
function OWLJSONLD2JSONSchema(_owljsonld, cb) {
    console.log('')
    // console.log('OWLJSONLD2JSONSchema _owljsonld', _owljsonld)
    console.log('OWLJSONLD2JSONSchema ')
    console.log('')

    return new Promise(function (resolve, reject) {
        try {
            let _JSONLD = JSON.stringify(_owljsonld) || _owljsonld;
            console.log('')
            console.log('OWLJSONLD2JSONSchema entry')
            console.log('')

            var _schema = {};
            _schema.type = "object"

            // try processing jsonld
            try {

                var objOWL = JSON.parse(_JSONLD); // parse input JSONLS content to be transformed
                console.log('')
                // console.log('objSchema:', objSchema);

                var _graph = objOWL['@graph'] || null; // get graph root
                console.log('')
                // console.log('_graph:', _graph);

                // find "@type": "owl:Ontology"
                var ont = _graph.find(item => item['@type'] === 'owl:Ontology');

                // if has Ontology element, set top object to these properties
                if (ont) {
                    console.log('ont:', ont)

                    let _id = processSingleProp(ont["@id"]);
                    let _type = 'object';
                    let _label = processSingleProp(ont["label"]);
                    let _title = processSingleProp(ont["title"]);
                    let _description = processSingleProp(ont["description"]);
                    let _comment = processSingleProp(ont["comment"]);

                    let _creator = processSingleProp(ont["creator"]);
                    let _publisher = processSingleProp(ont["publisher"]);
                    let _created = processSingleProp(ont["created"]);
                    let _modified = processSingleProp(ont["modified"]);

                    if (_id) _schema.id = _id || "_:0";
                    if (_title) _schema.title = _title;
                    if (_description) _schema.description = _description;
                    if (_label) _schema.label = _label;
                    if (_comment) _schema.comment = _comment;

                    if (_creator) _schema.creator = _creator;
                    if (_publisher) _schema.publisher = _publisher;
                    if (_created) _schema.created = _created;
                    if (_modified) _schema.modified = _modified;

                    // _schema.creator = ont['dc:creator']['@value'] || ont['dc:creator'] || ont.creator || null;
                    // _schema.publisher = ont['dc:publisher']['@value'] || ont['dc:publisher'] || ont.publisher || null;
                    // _schema.created = ont['created'] || ont['dcterms:created']['@value'] || ont.created || ont['dcterms:created'] || null;
                    // _schema.modified = ont['modified'] || ont['dcterms:modified']['@value'] || ont.modified || ont['dcterms:modified'] || null;

                }
                else {
                    _schema.properties = {};

                }; // end if ont
                _schema.properties = {};


                //
                // loop over graph elements then apply processes props to _schema.properties
                //
                Object.keys(_graph).forEach(function (key) {
                    // console.log('Key : ' + key + ', Value : ' + _graph[key])

                    let _element = _graph[key];
                    let _id = _element["@id"];
                    let _type = _element["@type"];
                    let _label = processSingleProp(_element["label"]);

                    // if multiple types in array, set to allow accessing one
                    if (!Array.isArray(_type)) _type = [_type]

                    if ((_type.includes("owl:Class")) || (_type.includes("rdfs:Class"))) {

                        // process with type Class element function
                        processClassEl(_element)
                            .then((data) => {})
                            .catch((e) => { console.error(e) })

                    }
                    else if ((_type.includes("owl:ObjectProperty")) || (_type.includes("rdf:ObjectProperty"))) {

                        // process with type Class element function
                        processObjectPropertyEl(_element)
                            .then((data) => {})
                            .catch((e) => { console.error(e) })

                    }
                    else if ((_type.includes("rdf:Property")) || (_type.includes("owl:Property")) || (_type.includes("owl:FunctionalProperty")) || (_type.includes("owl:InverseFunctionalProperty"))) {

                        // process type Property element
                        processPropertyEl(_element)
                            .then((data) => {})
                            .catch((e) => { console.error(e) })

                    }
                    else if ((_type.includes("rdf:DatatypeProperty")) || (_type.includes("owl:DatatypeProperty"))) {

                        processDataTypePropertyEl(_element)

                    }
                    else if (_type.includes('owl:Ontology')) {
                        // already processed

                    }
                    else if (_type.includes(undefined)) {
                        // assume rdf:property if type undefined
                        // process with type Property element function
                        processPropertyEl(_element)
                            .then((data) => {})
                            .catch((e) => { console.error(e) })

                    }
                    else {
                        console.log('_type', _type) // log types that are not caught

                    }

                }); // end loop over jspn-ld flattened elements

                //
                // Common processing function for property transformation
                //
                function processSingleProp(_p0) {
                    // console.log('processSingleProp')
                    let pp = null

                    if (_p0 != undefined) {
                        // console.log('_p0', _p0)

                        let _p1 = null;
                        if (Array.isArray(_p0)) {
                            _p1 = _p0[0]
                        }
                        else {
                            _p1 = _p0
                        };
                        // console.log('_p1', _p1)

                        let _p2 = null;
                        if (_p1['@value']) {
                            _p2 = _p1['@value']
                        }
                        else {
                            _p2 = _p1
                        };
                        // console.log('_p2', _p2)

                        pp = _p2;
                        // console.log('pp', pp)
                    }

                    return pp
                }; // end

                function stripPrefix(pname) {
                    var idx = pname.indexOf(":");
                    if (idx > 0) pname = pname.slice(idx + 1, pname.length);
                    console.log("idx pname", idx, pname)
                    return pname
                };

                function processClassEl(_el) {
                    // console.log('processClassEl')
                    return new Promise((resolve, reject) => {
                        try {

                            let id = processSingleProp(_el["@id"]);
                            let type = 'object';
                            let label = processSingleProp(_el["label"]);
                            let title = processSingleProp(_el["title"]);
                            let description = processSingleProp(_el["description"]);
                            let comment = processSingleProp(_el["comment"]);
                            let domain = processSingleProp(_el["domain"]);

                            let subclassof = processSingleProp(_el["subClassOf"]);

                            let property = {}
                            if (id) property['id'] = id;
                            if (type) property['type'] = type;
                            if (label) property['name'] = label;
                            if (title) property['title'] = title;
                            if (description) property['description'] = description;
                            if (comment) property['comment'] = title;
                            if (domain) property['parent'] = title;
                            if (subclassof) property['parent'] = subclassof;

                            _schema.properties[id] = property

                            resolve(_schema)

                        }
                        catch (e) {
                            console.error('function processClassEl e:', e)
                            reject(e)
                        }
                        finally {}

                    }) // end return
                }; // end function processClassEl

                function processObjectPropertyEl(_el) {
                    // console.log('processObjectPropertyEl')
                    return new Promise((resolve, reject) => {
                        try {

                            let id = processSingleProp(_el["@id"]);
                            let type = processSingleProp(_el["@type"]);

                            let label = processSingleProp(_el["label"]);
                            let title = processSingleProp(_el["title"]);
                            let description = processSingleProp(_el["description"]);
                            let comment = processSingleProp(_el["comment"]);

                            let domain = processSingleProp(_el["domain"]);
                            let range = processSingleProp(_el["range"]);


                            let property = {}
                            if (id) property['id'] = id;
                            if (type) property['type'] = "string";
                            if (label) property['name'] = label;
                            if (title) property['title'] = title;
                            if (description) property['description'] = description;
                            if (comment) property['comment'] = comment;
                            if (domain) property['parent'] = domain;
                            // if (range) property['range'] = range;

                            _schema.properties[id] = property

                            resolve(_schema)

                        }
                        catch (e) {
                            console.error('function processObjectPropertyEl e:', e)
                            reject(e)
                        }
                        finally {}

                    }) // end return

                }; // end function processObjectPropertyEl


                function processPropertyEl(_el) {
                    // console.log('processPropertyEl')
                    return new Promise((resolve, reject) => {
                        try {

                            let id = processSingleProp(_el["@id"]);
                            let type = processSingleProp(_el["@type"]);

                            let label = processSingleProp(_el["label"]);
                            let title = processSingleProp(_el["title"]);
                            let description = processSingleProp(_el["description"]);
                            let comment = processSingleProp(_el["comment"]);

                            let domain = processSingleProp(_el["domain"]);
                            let range = processSingleProp(_el["range"]);

                            let equivalentclass = processSingleProp(_el["equivalentClass"]);

                            let property = {}
                            if (id) property['id'] = id;
                            if (type) property['type'] = range || "string";
                            if (label) property['name'] = label;
                            if (title) property['title'] = title;
                            if (description) property['description'] = description;
                            if (comment) property['comment'] = comment;
                            if (domain) property['parent'] = domain;
                            // if (range) property['range'] = range;
                            if (equivalentclass) property['x_semantic'] = id;

                            _schema.properties[id] = property

                            resolve(_schema)

                        }
                        catch (e) {
                            console.error('function processPropertyEl:', e)
                            reject(e)
                        }
                        finally {}

                    }) // end return
                }; // end function processPropertyEl

                function processDataTypePropertyEl(_el) {
                    // console.log('processDataTypePropertyEl')
                    return new Promise((resolve, reject) => {
                        try {

                            let id = processSingleProp(_el["@id"]);
                            let type = processSingleProp(_el["@type"]);


                            let label = processSingleProp(_el["label"]);
                            let title = processSingleProp(_el["title"]);
                            let description = processSingleProp(_el["description"]);
                            let comment = processSingleProp(_el["comment"]);

                            let domain = processSingleProp(_el["domain"]);
                            let range = processSingleProp(_el["range"]);

                            let equivalentclass = processSingleProp(_el["equivalentClass"]);
                            let propertydisjointwith = processSingleProp(_el["propertyDisjointWith"]);

                            let property = {}
                            if (id) property['id'] = id;

                            // // remove prefix and : char
                            // let atype = stripPrefix(range) || 'string';

                            let atype = 'string';
                            switch (range) {

                            case 'xs:string':
                            case 'rdfs:Literal':
                                break;

                            case 'xs:int':
                                atype = 'integer';
                                break;

                            case 'xs:date':
                                atype = 'date';
                                break;

                            default:
                                atype = 'string';
                            }


                            if (type) property['type'] = atype

                            if (label) property['name'] = label;
                            if (title) property['title'] = title;
                            if (description) property['description'] = description;
                            if (comment) property['comment'] = comment;
                            if (domain) property['parent'] = domain;
                            // if (range) property['range'] = range;
                            if (equivalentclass) property['x_semantic'] = equivalentclass;
                            // if (propertydisjointwith) property['propertyDisjointWith'] = propertydisjointwith;

                            _schema.properties[id] = property

                            //   "txtLastName": {
                            //     "control": "input",
                            //     "type": "string",
                            //     "format": "text",
                            //     "id": "txtLastName",
                            //     "name": "familyName",
                            //     "title": "Last Name",
                            //     "x_semantic": "foaf:familyName",
                            //     "x_contentmap": "employee.person.familyname",
                            //     "size": 13,
                            //     "autocomplete": "FALSE",
                            //     "required": true
                            //   },

                            resolve(_schema)

                        }
                        catch (e) {
                            console.error('function processDataTypePropertyEl:', e)
                            reject(e)
                        }
                        finally {}

                    }) // end return
                }; // end function processDataTypePropertyEl




            } // end try lsonld s
            catch (e) {
                console.log('catch error OWLJSONLD2JSONSchema processing jsonld', e);
                // if (cb) cb(e);
                reject(e);
            }

            resolve(_schema)

        } // end try promise
        catch (e) {
            console.log('catch error OWLJSONLD2JSONSchema', e);
            // if (cb) cb(e);
            reject(e);
        }
    }); // end promise

}; // end function OWLJSONLD2JSONSchema



//
//  shared routine for transforming a JSON Schema of form field elements 
//  into a OWL in JSON-LD
//
function JSONSchema2OWLJSONLD(_json, cb) {
    console.log('')
    console.log('JSONSchema2OWLJSONLD _json', _json)
    console.log('')

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
            reject(e);
        }
    }); // end promise
}; // end JSONSchema2OWLJSONLD














//
//  shared routine for transforming a JSON array representing a Sheet 
//  into a JSON Schema structure
//
function getJSONArraySaveJSONSchema(_json, cb) {
    console.log('getJSONArraySaveJSONSchema', _json)

    try {

        let _JSON = JSON.stringify(_json) || _json;

        console.log('FormFieldDefJSONtoJSONSCHEMA entry', _JSON)


        var schema = {
            "title": "",
            "type": "object",
            "properties": {}
        }
        var _properties = {};
        var _definitions = {};

        var form = [
                      "*",
            {
                "type": "submit",
                "title": "OK"
                      }
                    ]
        var _formfields = []

        var values = {};
        var _values = {};

        let arrParents = [];

        let arrObjects = [];

        try {

            var objArray = JSON.parse(_JSON)
            var numrec = objArray.length;
            console.log("objArray,length ", objArray.length)

            var ids = [];

            //
            //  Loop over form field def array
            //
            for (var i = 0; i < objArray.length; i++) {
                // for (var i=0; i<11; i++) {
                if (objArray[i].control === 'fieldset') schema.title = objArray[i].label;

                let _prop = {};

                let obj = objArray[i]
                // console.log('i obj',i, obj)

                let _id = obj.id || null;
                // ids[i] = _id ;



                if (obj.type) _prop.type = obj.type;

                if (obj.type == "") {
                    _prop.type = "string";
                }
                else if (obj.type == "boolean") {
                    _prop.type = "boolean";
                }
                else if (obj.type == "text") {
                    _prop.type = "string";
                    _prop.format = "text";
                }
                else if (obj.type == "password") {
                    _prop.type = "string";
                    _prop.format = "password";
                }
                else if (obj.type == "email") {
                    _prop.type = "string";
                    _prop.format = "email";
                }
                else if (obj.type == "tel") {
                    _prop.type = "string";
                    _prop.format = "tel";
                }
                else if (obj.type == "url") {
                    _prop.type = "string";
                    _prop.format = "uri";
                }
                else if (obj.type == "textarea") {
                    _prop.type = "string";
                    _prop.control = "textarea";
                    _prop.format = "textarea";
                }
                else if (obj.type == "date") {
                    _prop.type = "string";
                    _prop.format = "date";
                }
                else if (obj.type == "datetime") {
                    _prop.type = "string";
                    _prop.format = "date-time";
                }
                else if (obj.type == "datetime-local") {
                    _prop.type = "string";
                    _prop.format = "datetime-local";
                }
                else if (obj.type == "time") {
                    _prop.type = "string";
                    _prop.format = "time";
                }
                else if (obj.type == "color") {
                    _prop.type = "string";
                    _prop.format = "color";
                }
                else if (obj.type == "radio") {
                    _prop.type = "string";
                    _prop.format = "radio";
                }
                else if (obj.type == "checkbox") {
                    _prop.type = "string";
                    _prop.format = "checkbox";
                }
                else if (obj.type == "datalist") {
                    _prop.type = "string";
                    _prop.format = "datalist";
                    //_prop.enum
                }
                else if (obj.type == "number") {
                    _prop.type = "number";
                }
                else if (obj.type == "range") {
                    _prop.type = "number";
                    _prop.format = "range";
                }
                else {
                    _prop.type = "string";
                    // _prop.inputtype = "text" ;
                }; // end if 

                //https://www.w3schools.com/html/html_form_input_types.asp
                // if (obj.type == "text" )            _prop.type = "string" ;
                // if (obj.type == "password" )        _prop.type = "string" ;
                // if (obj.type == "radio" )           _prop.type = "string" ;
                // if (obj.type == "checkbox" )        _prop.type = "string" ;
                // if (obj.type == "button" )          _prop.type = "string" ;
                // if (obj.type == "color" )           _prop.type = "string" ;
                // if (obj.type == "date" )            _prop.type = "string" ;
                // if (obj.type == "datetime" )        _prop.type = "string" ;
                // if (obj.type == "datetime-local" )  _prop.type = "string" ;
                // if (obj.type == "email" )           _prop.type = "string" ;
                // if (obj.type == "month" )           _prop.type = "string" ;
                // if (obj.type == "range" )           _prop.type = "string" ;
                // if (obj.type == "search" )          _prop.type = "string" ;
                // if (obj.type == "tel" )             _prop.type = "string" ;
                // if (obj.type == "time" )            _prop.type = "string" ;
                // if (obj.type == "url" )             _prop.type = "string" ;
                // if (obj.type == "week" )            _prop.type = "string" ;

                // https://spacetelescope.github.io/understanding-json-schema/reference/string.html
                // _prop.format = null ;  
                // if (obj.type == "text" )            _prop.format = "text" ;
                // if (obj.type == "password" )        _prop.format = "password" ;
                // if (obj.type == "radio" )           _prop.format = "radio" ;
                // if (obj.type == "checkbox" )        _prop.format = "checkbox" ;
                // if (obj.type == "color" )           _prop.format = "color" ;
                // if (obj.type == "date" )            _prop.format = "date" ;
                // if (obj.type == "datetime-local" )  _prop.format = "datetime-local" ;

                // if (obj.type == "email" )     _prop.format = "email" ;
                // if (obj.type == "date" )      _prop.format = "date-time" ;
                // if (obj.type == "datetime" )  _prop.format = "date-time" ;
                // if (obj.type == "url" )       _prop.format = "uri" ;
                // if (obj.type == "datalist" )          _prop.format = "datalist" ;
                // // if (obj.type == "" )          _prop.format = "ipv4" ;
                // // if (obj.type == "" )          _prop.format = "ipv6" ;

                // if (obj.type == "datalist" )    _prop.enum = obj['options / datalist'] ;

                if (obj.control) _prop.control = obj.control;
                if (obj.format) _prop.format = obj.format;


                // options 
                if (obj.options != null) {
                    // console.log("JSON.stringify(obj.options)", JSON.stringify(obj.options))
                    let _options = JSON.stringify(obj.options) || null;
                    // console.log('_options', _options)
                    if (_options != null) {
                        _options = JSON.parse(_options)

                        let _em = getObjectEnumList(_options)
                        // console.log('_em', _em)
                        if (_em != null) {
                            let _enum = JSON.stringify(_em)
                            // console.log('_enum', _enum)
                            _prop.enum = _enum;
                        }

                        let _fm = _options.format || null
                        // console.log('_fm', _fm)
                        if (_fm != null) {
                            let _format = _fm
                            // console.log('_format', _format)
                            _prop.format = _format;
                        }
                    }
                }



                _prop.id = _id || obj['key'] || obj.name;
                _prop.name = obj.name || _prop.id;
                _prop.title = obj.title || obj.label || obj.name || null;

                _prop.x_semantic = obj.dbo || "";
                _prop.x_contentmap = obj['content map'] || obj['contentmap'] || null;

                _prop.description = obj.caption || _prop.x_contentmap || null;

                if (obj.parent) _prop.parent = obj.parent;
                if (obj.repeatable) _prop.repeatable = obj.repeatable;

                if (obj.placeholder) _prop.placeholder = obj.placeholder;
                if (obj.default) _prop.value = obj.default;

                if (obj.size) _prop.size = obj.size;
                if (obj.maxlength) _prop.minLength = obj.maxlength;

                if (obj.min) {
                    _prop.minumum = obj.min;
                }
                if (obj.max) {
                    _prop.maximum = obj.max;
                }

                if (obj['validation']) _prop.pattern = obj['validation'];
                if (obj['pattern (regexp)']) _prop.pattern = obj['pattern (regexp)'];

                if (obj.required) _prop.required = obj.required;
                if (obj.reqmsg) _prop.reqMessage = obj.reqmsg;
                if (obj.helpmsg) _prop.helpMessage = obj.helpmsg;

                if (obj.disabled) _prop.disabled = obj.disabled;
                if (obj.readonly) _prop.readOnly = obj.readonly

                if (obj.transforms) _prop.transforms = obj.transforms;
                if (obj.triggers) _prop.triggers = obj.triggers;
                if (obj.assumptions) _prop.assumptions = obj.assumptions;
                if (obj.autofocus) _prop.autofocus = obj.autofocus;
                if (obj.autocomplete) _prop.autocomplete = obj.autocomplete;


                if (_id != null) {
                    _properties[_prop.id] = _prop;
                }
                else {
                    console.log("_id is null:", _id)
                }
                // console.log('_properties:', _properties)

                //
                // if has default value
                //
                if (_prop.value != null) {
                    let val = {
                        "contentmap": _prop.x_contentmap,
                        "value": _prop.value
                    }
                    _values[_prop.id] = val;
                }

                //
                // if has type object
                //
                if (obj.type === "object") {
                    let typeObj = {
                        "type": "object",
                        "id": obj.id,
                        "title": obj.label,
                        "properties": {}
                    }
                    arrObjects.push(typeObj);

                    _definitions[obj.id] = typeObj
                }

                //
                // if has parent set definiton
                //
                if (obj.parent != "") {
                    arrParents[obj.id] = obj.parent
                }

            } // end for objArray





            //
            // Now process form field defs to produce form specs
            //
            for (var j = 0; j < objArray.length; j++) {

                let obj = objArray[j]
                // console.log('j obj',j, obj)

                let _key = obj.id || null;
                // console.log('_key', _key)

                let _control = obj.control || null;
                let _type = obj.type || null;

                let _datalist = obj.datalist || null;
                let _titlemap = null
                if (_datalist) {
                    let _dl = getObjectDataList(_datalist)
                    _titlemap = JSON.stringify(_dl)
                }

                let _size = obj.size || null;
                let _maxlength = obj.maxlength || null;
                let _caption = obj.caption || null;
                let _placeholder = obj.placeholder || null;

                let _ff = {

                };

                _ff.key = _key;

                if (_titlemap) {
                    _ff.titleMap = _titlemap;
                }

                if (_control) {
                    _ff.control = _control;
                }

                if (_type == "date") {
                    _ff.type = "date";
                }
                else if (_type == "datetime") {
                    _ff.type = "datetime";
                }
                else if (_type == "time") {
                    _ff.type = "datetime";
                }

                if (_type == "password") {
                    _ff.type = "password";
                }

                if (_type == "checkbox") {
                    _ff.type = "checkbox";
                    _ff.inlinetitle = _caption;
                }

                if (_type == "radios") {
                    _ff.type = "radios";
                }

                if (_type == "textarea") {
                    _ff.type = "textarea";
                    if (_size) _ff.size = _size;
                    if (_maxlength) _ff.maxlength = _maxlength;
                }

                if (_type == "range") {
                    _ff.type = "range";
                }

                if (_placeholder) {
                    _ff.placeholder = _placeholder;
                }


                if ((_key != null) && (_ff != null)) {
                    _formfields.push(_ff);
                    // _formfields[_key] =  _ff  ;
                }
                else {
                    // console.log("_key or _ff is null:", _key, _ff)
                }


            }; // end for each row


            //
            // progess _properties look for and handle parent nesting
            //
            for (p in _properties) {

                let _p = _properties[p]
                // console.log('p _p', p, _p)

                let _key = _p.id || null;
                // console.log('_key', _key)

                let _parent = _p.parent || null;
                if (_parent != null) {
                    // console.log('_key _parent', _key, _parent)

                    let subprop = {
                        "type": "object",
                        "title": "Sub Prop",
                        "properties": {}
                    }

                    subprop.properties = { _p }


                    let _contentmap = _p["x_contentmap"] || null


                    // setp subprop of parent
                    _properties[_parent].subprop = subprop;
                    console.log('_properties[_parent]', _properties[_parent])
                }


            }; // end for each prop

        }
        catch (e) {
            console.log('catch e error in FormFieldDefJSONtoJSONSCHEMA ', e);
            if (cb) cb(e);
            return e;
        }
        finally {
            // console.log('finally _properties:', _properties)
            schema.properties = _properties;
            schema.definitions = _definitions;
            form = _formfields;
            values = _values
            var result = { "schema": schema, "form": form, "values": values }
            // var result = { "schema": schema }
            console.log('finally result:', result)
            // console.log('finally props:', props)

            //
            // OUTPUT RESuLTING JSON SCHEMA
            // 
            let _content = JSON.stringify(result);

            if (cb) cb(_content);
            return _content;

        } // end finally

    }
    catch (e) {
        console.log('catch error getJSONsaveJSONSCHEMA', e);
        cb(e);
        //return 
    }
}; // end 


var foobarEnum = ["foo", "bar", "fuzz", "qux"];

var genderEnum = ["male", "female", "alien"];
var genderDataList = {
    "male": "Dude",
    "female": "Dudette",
    "alien": "I'm from outer space!"
};

var industryEnum = ["one", "two", "three"];
var industryDataList = {
    "one": "A Onea",
    "two": "A Twoa",
    "three": "A Threea"
};

function getObjectEnumList(object, filter) {
    // console.log('getObjectEnumList ')
    let enumList = null;

    if (object === "foobarEnum") enumList = foobarEnum;

    if (object === "genderEnum") enumList = genderEnum;

    if (object === "industryEnum") enumList = industryEnum;

    return enumList;
}

function getObjectDataList(object, filter) {
    console.log('getObjectDataList ')
    let dataList = null;

    if (object === "genderDataList") dataList = genderDataList;

    if (object === "industryDataList") dataList = industryDataList;

    return dataList;
}

function getPersonOptionsList() {
    console.log('getPersonOptionsList')

    personTypeList = myPersonList

    // console.log('personTypeList',personTypeList)

    var _list = [{ "label": "", "value": "" }]

    for (p = 0; p < personTypeList.length; p++) {
        var type = personTypeList[p];
        var item = { "label": type.txt, "value": type.id };

        _list.push(item)
    }

    // console.log('_list', JSON.stringify(_list))
    return _list;
}
//
// END OF xxx
//



//
//  shared routine for transforming a JSON Schema of form field elements 
//  into a JSON Array representing a Sheet with rows for each element
//
function getJSONSCHEMAsaveJSONArray(_json, cb) {
    console.log('getJSONSCHEMAsaveJSONArray _json', _json)

    return new Promise(function (resolve, reject) {
        try {

            let _JSON = JSON.stringify(_json) || _json;

            console.log('JSONSCHEMAtoFormFieldDefJSON entry', _JSON)
            // Type-specific keywords
            //   string
            //   Numeric types
            //   object
            //   array
            //   boolean
            //   null

            // 		"key": "lastName",
            // 		"type": "text",
            // 		"title": "Last Name",
            // 		"required": true,
            // 		"value": "Doe"

            //  {
            //     "content map": "employee.person.place.address",
            //     "id": "txtAddress1",
            //     "name": "address",
            //     "label": "Address",
            //     "dbo": "streetAddress"
            //   },

            var _rows = {}

            var _formfielddefs = []

            try {

                var objSchema = JSON.parse(_JSON);
                console.log('objSchema:', objSchema);

                var objArray = objSchema.schema || objSchema;
                var objArray = objArray.properties || objSchema;
                console.log('objArray:', objArray);

                var ids = [];
                for (var key in objArray) {

                    console.log(objArray[key]);

                    let _prop = {};

                    let obj = objArray[key]

                    let _contentmap = obj['x_contentmap'] || null;
                    let _id = obj.id || obj.key || null;
                    let _name = obj['name'] || null;
                    let _label = obj['label'] || obj['title'] || null;
                    let _dbo = obj['x_semantic'] || null;
                    let _type = obj.type || null;

                    let _format = obj.format || null;
                    let _control = obj.control || null;
                    let _options = obj.options || null;

                    let _caption = obj['description'] || null;
                    let _placeholder = obj['placeholder'] || null;
                    let _default = obj.value || null;
                    let _readonly = obj['readonly'] || false;
                    let _required = obj['required'] || false;
                    let _reqmsg = obj['reqMessage'] || null;
                    let _helpmsg = obj['helpMessage'] || null;
                    let _size = obj['size'] || null;
                    let _maxlength = obj['maxLength'] || null;
                    let _min = obj['min'] || obj['minumum'] || null;
                    let _max = obj['max'] || obj['maximum'] || null;

                    let _spellcheck = obj.spellcheck || null;
                    let _validation = obj['validation'] || null;
                    let _pattern = obj['pattern'] || obj['pattern (regexp)'] || null;
                    let _title = obj['title'] || null;
                    let _transforms = obj['transforms'] || null;
                    let _triggers = obj['triggers'] || null;
                    let _assumptions = obj['assumptions'] || null;
                    let _autofocus = obj['autofocus'] || false;
                    let _autocomplete = obj['autocomplete'] || false;


                    // creat formfielddef entry
                    let _ff = {};
                    _ff.contentmap = _contentmap;
                    _ff.id = _id;
                    _ff.name = _name;
                    _ff.label = _label;
                    _ff.dbo = _dbo;
                    _ff.type = _type;
                    _ff.control = _control;
                    _ff.format = _format;
                    _ff.options = _options;
                    _ff.datalist = null;
                    _ff.caption = _caption;
                    _ff.placeholder = _placeholder;
                    _ff.default = _default;
                    _ff.readonly = _readonly;
                    _ff.size = _size;
                    _ff.maxlength = _maxlength
                    _ff.min = _min;
                    _ff.max = _max;
                    _ff.spellcheck = _spellcheck;
                    _ff.required = _required;
                    _ff.reqmsg = _reqmsg;
                    _ff.helpmsg = _helpmsg;
                    _ff.validation = _validation;
                    _ff.pattern = _pattern;
                    _ff.title = _title;
                    _ff.transforms = _transforms;
                    _ff.triggers = _triggers;
                    _ff.assumptions = _assumptions;
                    _ff.autofocus = _autofocus;
                    _ff.autocomplete = _autocomplete;

                    console.log('_ff', _ff)
                    _formfielddefs.push(_ff);

                    // if ((_id != null) && (_ff != null)) {
                    //     _formfielddefs.push(_ff);
                    // }
                    // else {
                    //     console.log("_id or _ff is null:", _id, _ff)
                    // }

                }; // end for each obj


            }
            catch (e) {
                console.log('catch e error in JSONSCHEMAtoFormFieldDefJSON ', e);
                if (cb) cb(e);
            }
            finally {
                console.log('finally _formfielddefs:', _formfielddefs)

                var result = _formfielddefs
                //var result ={ "schema": schema }
                //   console.log('finally result:', result )
                // console.log('finally props:', props)


                //
                // OUTPUT RESuLTING JSON ARRAY
                // 
                let _content = JSON.stringify(result);
                console.log('FINALLY _content', _content)
                if (cb) cb(_content);
                // return _content;
                resolve(_content)

            } // end finally


        }
        catch (e) {
            console.log('catch error getJSONSCHEMAsaveJSONArray', e);
            if (cb) cb(e);
            reject(e)
            //return 

        }; // end try 
    }); // end promise
}; // end getJSONSCHEMAsaveJSONArray
