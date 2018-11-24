class SemanticDataServices {

    constructor(stuff) {
        console.log('constructor', stuff)

    }




    //
    //  shared routine for transforming a JSON Schema of form field elements 
    //  into a OWL in JSON-LD
    //
    // JSONSchema2OWLJSONLD(_json, cb) {
    jsonschema2owljsonld(_json, cb) {
        console.log('JSONSchema2OWLJSONLD _json', _json)

        return new Promise(function (resolve, reject) {
            try {
                let _JSON = JSON.stringify(_json) || _json;
                console.log('JSONSchema2OWLJSONLD entry', _JSON)

                var _graph = [
                    {
                        "@id": "https://github.com/asteriusj/semanticdatamaster/",
                        "@type": "owl:Ontology",
                        "date": "$Date: 2017-10-07 23:18:26 $",
                        "description": "\nThe \n",
                        "title": "Semantic Data Master (SDM) Ontology",
                        "comment": "\n\n",
                        "label": {
                            "@language": "en",
                            "@value": "Ontology for Semantic Data Model"
                        },
                        "versionInfo": {
                            "@language": "en",
                            "@value": "Draft"
                        }
                }
            ]

                try {

                    var objSchema = JSON.parse(_JSON);
                    console.log('')
                    console.log('objSchema:', objSchema);

                    var objArray = objSchema.schema || objSchema;
                    console.log('')
                    console.log('objArray:', objArray);

                    //
                    // If schema has title, then create an object / class for main entity
                    //
                    if (objArray['title'] != undefined) {

                        // Main object type
                        let _class = {};
                        _class.key = objArray['x_contentmap'] || null;
                        _class["@id"] = "sdm:" + objArray['title'] || null;
                        _class["@type"] = "owl:Class";
                        _class["comment"] = objArray['description'] || null;

                        console.log('_class', _class)
                        _graph.push(_class)
                    }


                    var objArray = objArray.properties || objSchema;
                    console.log('objArray:', objArray);
                    //
                    // Loop over schema properties an create an OWL element for each field defined
                    //
                    var ids = [];
                    for (key in objArray) {

                        console.log(objArray[key]);



                        let obj = objArray[key]

                        let _key = obj['x_contentmap'] || null;

                        let _id = obj.id || obj.key || null;

                        let _type = "owl:DatatypeProperty";

                        let _comment = obj['title'] || null;
                        // let _comment = obj['placeholder'] || null;
                        // let _comment = obj['description'] || null;

                        let _label = obj['label'] || obj['name'] || obj['title'] || null;


                        let _domain = null;

                        if (obj['x_contentmap'].includes("person")) {
                            _domain = "sdm:Person";
                        }
                        else {
                            _domain = "sdm:Person";
                        }


                        let _range = null;

                        if (obj.type === "string") {
                            _range = "xsd:string";
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


                        let _equivalentProperty = obj['x_semantic'];

                        let _definition = obj['helpMessage'];


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
                        }

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
                        _entry["comment"] = _comment;
                        _entry["doman"] = _domain;
                        _entry["label"] = _label;
                        _entry["range"] = _range;
                        _entry["owl:equivalentProperty"] = _equivalentProperty;
                        _entry["skos:definition"] = _definition;



                        console.log('_entry', _entry)
                        _graph.push(_entry)



                        let _prop = {};

                    }; // end for each obj


                }
                catch (e) {
                    console.log('catch e error in JSONSCHEMAtoFormFieldDefJSON ', e);
                    if (cb) cb(e);
                }
                finally {
                    console.log('finally _graph:', _graph)

                    var result = {
                        "@graph": _graph,
                        "@id": "urn:x-arq:DefaultGraph",
                        "@context": {}
                    }


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
                console.log('catch error JSONSchema2OWLJSONLD', e);
                if (cb) cb(e);
                reject(e);

            }
        }); // end promise
    }; // end JSONSchema2OWLJSONLD



} // end class

module.exports = SemanticDataServices
