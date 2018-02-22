//
//  shared routine for transforming anOWL in JSON-LD of form field elements 
//  into a JSON Schema 
//
class OWLJSONLD2JSONSchema {

    constructor() {

    }

    transform(_owljsonld) {
        // console.log('')
        // console.log('OWLJSONLD2JSONSchema _owljsonld', _owljsonld)
        // console.log('OWLJSONLD2JSONSchema ')
        // console.log('')

        return new Promise(function (resolve, reject) {
            try {
                let _JSONLD = JSON.stringify(_owljsonld) || _owljsonld;
                console.log('')
                console.log('OWLJSONLD2JSONSchema entry')
                console.log('')

                var _schema = {};
                _schema.type = "object";
                _schema.properties = {};

                // try processing jsonld
                try {

                    var objOWL = JSON.parse(_JSONLD); // parse input JSONLS content to be transformed
                    // console.log('')
                    // console.log('objSchema:', objSchema);

                    var _graph = objOWL['@graph'] || null; // get graph root
                    // console.log('')
                    // console.log('_graph:', _graph);

                    // find "@type": "owl:Ontology"
                    var ont = _graph.find(item => item['@type'] === 'owl:Ontology');

                    if (ont) {
                        // console.log('ont:', ont)

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


                    //
                    // loop over graph elements
                    //
                    Object.keys(_graph).forEach(function (key) {
                        // console.log('Key : ' + key + ', Value : ' + _graph[key])

                        let _element = _graph[key];
                        let _id = _element["@id"];
                        let _type = _element["@type"];

                        let _label = processSingleProp(_element["label"]);






                        if (!Array.isArray(_type)) _type = [_type]

                        if ((_type.includes("owl:Class")) || (_type.includes("rdfs:Class"))) {

                            // process type Class element
                            processClassEl(_element)
                                .then((data) => {})
                                .catch((e) => { console.error(e) })

                        }
                        else if ((_type.includes("owl:ObjectProperty")) || (_type.includes("rdf:ObjectProperty"))) {

                            processObjectPropertyEl(_element)

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
                            // assume rdf:property
                            // process type Property element
                            processPropertyEl(_element)
                                .then((data) => {})
                                .catch((e) => { console.error(e) })

                        }
                        else {
                            console.log('unprocessed _type', _type)

                        }

                    }); // end loop over jspn-ld flattened elements


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

                    function processClassEl(_el) {
                        // console.log('processClassEl')
                        return new Promise((resolve, reject) => {
                            try {

                                let id = processSingleProp(_el["@id"]);
                                let type = 'object';
                                let label = processSingleProp(_el["label"]);
                                let title = processSingleProp(_el["title"]);
                                let description = processSingleProp(_el["description"]);
                                let subclassof = processSingleProp(_el["subClassOf"]);


                                let property = {}
                                if (id) property['id'] = id;
                                if (type) property['type'] = type;
                                if (label) property['name'] = label;
                                if (title) property['title'] = title;
                                if (description) property['description'] = title;

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

                        let id = processSingleProp(_el["@id"]);
                        let type = processSingleProp(_el["@type"]);

                        let label = processSingleProp(_el["label"]);
                        let title = processSingleProp(_el["title"]);
                        let description = processSingleProp(_el["description"]);

                        let domain = processSingleProp(_el["domain"]);
                        let range = processSingleProp(_el["range"]);


                        let property = {}
                        if (id) property['id'] = id;
                        if (type) property['type'] = "string";
                        if (label) property['name'] = label;
                        if (title) property['title'] = title;
                        if (description) property['description'] = title;
                        if (domain) property['parent'] = domain;
                        // if (range) property['range'] = range;

                        _schema.properties[id] = property


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

                                let domain = processSingleProp(_el["domain"]);
                                let range = processSingleProp(_el["range"]);

                                let equivalentclass = processSingleProp(_el["equivalentClass"]);

                                let property = {}
                                if (id) property['id'] = id;
                                if (type) property['type'] = range || "string";
                                if (label) property['name'] = label;
                                if (title) property['title'] = title;
                                if (description) property['description'] = title;
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

                        let id = processSingleProp(_el["@id"]);
                        let type = processSingleProp(_el["@type"]);

                        let label = processSingleProp(_el["label"]);
                        let title = processSingleProp(_el["title"]);
                        let description = processSingleProp(_el["description"]);

                        let domain = processSingleProp(_el["domain"]);
                        let range = processSingleProp(_el["range"]);

                        let equivalentclass = processSingleProp(_el["equivalentClass"]);
                        let propertydisjointwith = processSingleProp(_el["propertyDisjointWith"]);

                        let property = {}
                        if (id) property['id'] = id;
                        if (type) property['type'] = range || "string"; // need to process options
                        if (label) property['name'] = label;
                        if (title) property['title'] = title;
                        if (description) property['description'] = title;
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

                    }; // end function processDataTypePropertyEl




                } // end try lsonld s
                catch (e) {
                    console.error('catch error OWLJSONLD2JSONSchema processing jsonld', e);
                    // if (cb) cb(e);
                    reject(e);
                }

                // console.log('_schema', _schema)
                resolve(_schema)

            } // end try promise
            catch (e) {
                console.error('catch error OWLJSONLD2JSONSchema', e);
                // if (cb) cb(e);
                reject(e);
            }
        }); // end promise

    }; // end function OWLJSONLD2JSONSchema transform

}; // end class OWLJSONLD2JSONSchema

module.exports = OWLJSONLD2JSONSchema
