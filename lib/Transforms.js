//
// inspired by https://code-maven.com/javascript-module-to-run-in-browser-and-in-node
//
(function () {
    "use strict";

    this.OWLJSONLD2JSONSchema = function () {
        console.log('OWLJSONLD2JSONSchema')
        return Object.freeze({

            transform: function (_owljsonld) {
                console.log('JSONSchema2OWLJSONLD.transform', _owljsonld)
                return new Promise(function (resolve, reject) {

                    reject()
                }); // end promise

            },
            version: 0.20180122,
        });

    }();

    this.JSONSchema2OWLJSONLD = function () {
        console.log('JSONSchema2OWLJSONLD')
        return Object.freeze({

            transform: function (_jsonschema) {
                console.log('JSONSchema2OWLJSONLD.transform', _jsonschema)
                return new Promise(function (resolve, reject) {

                    reject()
                }); // end promise

            },
            version: 0.20180122,
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

};


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
                for (key in objArray) {

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

            // });

        }
        catch (e) {
            console.log('catch error getJSONSCHEMAsaveJSONArray', e);
            if (cb) cb(e);
            reject(e)
            //return 

        }; // end try 
    }); // end promise
}; // end getJSONSCHEMAsaveJSONArray
