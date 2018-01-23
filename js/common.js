console.log('common.js loading...')

// collect URL query string parameters
function getUrlVars() {
  console.log('getUrlVars')
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  console.log(vars)
  return vars;
}
var startid = getUrlVars()["startid"] || null;
var option = getUrlVars()["option"] || null;
var loaddata = getUrlVars()["loaddata"] || null;



//
// Load data from data file with predefined default filepaths and custom url paths
//
function getDataFiles(datefiletype) {
  console.log('getDataFiles datefiletype', datefiletype)

  if (datefiletype === "OWLJSONLDData") getOWLJSONLDData();
  if (datefiletype === "FieldSchemaData") getFieldSchemaData();
  if (datefiletype === "JSONSchemaData") getJSONSchemaData();
  if (datefiletype === "FormFieldDefData") getFormFieldDefData();
  // ()


} // end get data files


//
// STARTING OWLJSONLD Functions  
//
//  * getOWLJSONLD
//  * loadOWLJSONLD
//  * create localStore setItem and getItem
//  * setOWLJSONLD
//  * getOWLJSONLD
function getOWLJSONLDData() {
  console.log('getOWLJSONLDData')

  // Get local data if available - if not available load from fil
  getOWLJSONLD().then(function (_json) {
    console.log('call getOWLJSONLD _json', _json, JSON.stringify(_json))

    if (_json === null) {
      loadOWLJSONLDData();
    }
    else if (JSON.stringify(_json) != '{}') {
      doOWLJSONLDData(_json);
    }
    else {
      loadOWLJSONLDData();
    }

  }).catch(function (e) {
    console.error('call getOWLJSONLD Fail! e', e)
  });

} // end get

//
// load OWL JSONLD data file
//
function loadOWLJSONLDData() {
  console.log('loadJSONSchemaData')
  // Return a new promise.
  return new Promise(function (resolve, reject) {
    try {

      var result = false;

      // get schema
      var URL = "../owl/defaultontology.jsonld";
      console.log('loadOWLJSONLDData URL', URL)
      /*global $*/
      $.getJSON(URL, {
          // tags: "mount rainier",
          // tagmode: "any",
          // format: "json"
          dataType: 'json',
        })
        .done(function (data) {
          console.log('loadOWLJSONLDData done data:', data)
          result = true;


          createOWLJSONLD(data).then(function (result) {
            console.log('call createOWLJSONLD result', result)

            getOWLJSONLD().then(function (_json) {
              console.log('call getOWLJSONLD Succeed _json', _json)

              doOWLJSONLDData(_json);

            }).catch(function (e) {
              console.error('call getOWLJSONLD Fail! e', e)
            });
          }).catch(function (e) {
            console.error('call createOWLJSONLD Fail! e', e)
          });



        })
        .fail(function (jqxhr, textStatus, error) {
          var err = textStatus + ", " + error;
          console.log("loadOWLJSONLDData fail: " + err);
          result = false;
          reject(err)
        })
        .always(function () {
          console.log("loadOWLJSONLDData always");
          resolve(result)
        });

    }
    catch (e) {
      console.error('loadOWLJSONLDData e', e)
      reject(e);

    }; // end try
  }); // end promise
}; // end loadOWLJSONLDData


//
// create myOWLJSONLD
//
function createOWLJSONLD(_owljsonld) {
  console.log('createOWLJSONLD', _owljsonld)
  // Return a new promise.
  return new Promise(function (resolve, reject) {
    try {

      if (localStorage.getItem('myOWLJSONLD') === null) localStorage.setItem('myOWLJSONLD', JSON.stringify(null));

      if (_owljsonld != null) localStorage.setItem('myOWLJSONLD', JSON.stringify(_owljsonld))

      var retrievedObject = localStorage.getItem('myOWLJSONLD')
      console.log('createOWLJSONLD retrievedObject: ', JSON.parse(retrievedObject));

      resolve(retrievedObject)

    }
    catch (e) {
      console.error('createOWLJSONLD e', e)
      reject(e);

    };
  });
};

//
// set myOWLJSONLD from _owljsonld 
//
function setOWLJSONLD(_owljsonld) {
  console.log('setOWLJSONLD', _owljsonld)
  // Return a new promise.
  return new Promise(function (resolve, reject) {
    try {

      let myOWLJSONLD = _owljsonld || {};

      localStorage.setItem('myOWLJSONLD', JSON.stringify(myOWLJSONLD));

      var retrievedObject = localStorage.getItem('myOWLJSONLD');

      let _OWLJSONLD = JSON.parse(retrievedObject);
      console.log('_OWLJSONLD', _OWLJSONLD)

      resolve(_OWLJSONLD)

    }
    catch (e) {
      console.error('setOWLJSONLD e', e)
      reject(e);

    };
  });
};

//
// get myOWLJSONLD from set value 
//
function getOWLJSONLD() {
  console.log('getOWLJSONLD')

  // Return a new promise.
  var promise = new Promise(function (resolve, reject) {

    try {

      var retrievedObject = localStorage.getItem('myOWLJSONLD');
      console.log('JSON.parse(retrievedObject)', JSON.parse(retrievedObject))

      let _owljsonld = JSON.parse(retrievedObject);

      resolve(_owljsonld)

    }
    catch (e) {
      console.error('getOWLJSONLD e', e)
      reject(e);

    }; // end try 

  });

  return promise;
} // end getOWLJSONLD



// // load Field Editor JSON data file
// var myFieldEditSchema = null;

// function loadFieldEditData() {
//   console.log('loadFieldEditData')

//   // get owl ttl
//   var URL = "../json/defaultfieldeditschema.json";
//   console.log('loadFieldEditData URL', URL)
//   $.get(URL, {
//       dataType: 'json'
//     })
//     .done(function (data) {
//       console.log('loadFieldEditData done data', data)
//       myFieldEditSchema = data;
//     })
//     .fail(function (jqxhr, textStatus, error) {
//       var err = textStatus + ", " + error;
//       console.log("loadFieldEditData fail: " + err);
//     })
//     .always(function () {
//       console.log("loadFieldEditData always");

//       doFieldEditData(myFieldEditSchema)

//     });

// }


function getFieldSchemaData() {
  console.log('getFieldSchemaData')

  // Get local data if available - if not available load from fil
  getFieldSchema().then(function (_json) {
    console.log('call getFieldSchema _json', _json, JSON.stringify(_json))

    if (_json === null) {
      loadFieldSchemaData();
    }
    else if (JSON.stringify(_json) != '{}') {
      doFieldSchemaData(_json);
    }
    else {
      loadFieldSchemaData();
    }

  }).catch(function (e) {
    console.error('call getFieldSchema Fail! e', e)
  });

} // end get

//
// load FieldSchema data file
//
function loadFieldSchemaData() {
  console.log('loadFieldSchemaData')

  // get schema
  var URL = "../json/defaultfieldschema.json";
  console.log('loadFieldSchemaData URL', URL)
  /*global $*/
  $.getJSON(URL, {
      // tags: "mount rainier",
      // tagmode: "any",
      // format: "json"
      dataType: 'json',
    })
    .done(function (data) {
      console.log('loadFieldSchemaData done data:', data)


      createFieldSchema(data).then(function (result) {
        console.log('call createFieldSchema result', result)

        getFieldSchema().then(function (_json) {
          console.log('call getFieldSchema _json', _json)

          doFieldSchemaData(_json);

        }).catch(function (e) {
          console.error('call getFieldSchema Fail! e', e)
        });
      }).catch(function (e) {
        console.error('call createFieldSchema Fail! e', e)
      });

    })
    .fail(function (jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.log("loadFieldSchemaData fail: " + err);
    })
    .always(function () {
      console.log("loadFieldSchemaData always");

    });

}; // end loadFieldSchemaDData



//
// STARTING FieldSchema Functions  
//
//  * create localStore setItem and getItem
//  * setFieldSchema
//  * getFieldSchema
//
// create myFieldSchema
//
function createFieldSchema(_fieldschema) {
  console.log('createFieldSchema', _fieldschema)
  // Return a new promise.
  return new Promise(function (resolve, reject) {
    try {

      if (localStorage.getItem('myFieldSchema') === null) localStorage.setItem('myFieldSchema', JSON.stringify(null));

      if (_fieldschema != null) localStorage.setItem('myFieldSchema', JSON.stringify(_fieldschema))

      var retrievedObject = localStorage.getItem('myFieldSchema')
      console.log('createFieldSchema retrievedObject: ', JSON.parse(retrievedObject));

      resolve(retrievedObject)

    }
    catch (e) {
      console.error('createFieldSchema e', e)
      reject(e);

    };
  });
};

//
// set myFieldSchema from _FieldSchema 
//
function setFieldSchema(_fieldschema) {
  console.log('setFieldSchema', _fieldschema)
  // Return a new promise.
  return new Promise(function (resolve, reject) {
    try {

      let myFieldSchema = _fieldschema || {};

      localStorage.setItem('myFieldSchema', JSON.stringify(myFieldSchema));

      var retrievedObject = localStorage.getItem('myFieldSchema');
      // console.log('setFieldSchema retrievedObject: ', JSON.parse(retrievedObject));

      let _FieldSchema = JSON.parse(retrievedObject);
      console.log('_FieldSchema', _FieldSchema)

      resolve(_FieldSchema)

    }
    catch (e) {
      console.error('setFieldSchema e', e)
      reject(e);

    };
  });
};

//
// get myFieldSchema from set value 
//
function getFieldSchema() {
  console.log('getFieldSchema')

  // Return a new promise.
  var promise = new Promise(function (resolve, reject) {

    try {

      var retrievedObject = localStorage.getItem('myFieldSchema');
      console.log('JSON.parse(retrievedObject)', JSON.parse(retrievedObject))

      let _fieldschema = JSON.parse(retrievedObject);

      resolve(_fieldschema)

    }
    catch (e) {
      console.error('getFieldSchema e', e)
      reject(e);

    }; // end try 

  });

  return promise;
} // end getFieldSchema





//
// STARTING JSONSchema Functions  
//
//  saveJ
//  LoadJ
//  * create localStore setItem and getItem
//  * setJSONSchema
//  * getJSONSchema
//  * updateJSONSchema
//

function getJSONSchemaData() {
  console.log('getJSONSchemaData')

  // Get local data if available - if not available load from fil
  getJSONSchema().then(function (_json) {
    console.log('call getJSONSchema _json JSON.stringify(_json)', _json, JSON.stringify(_json))

    if (_json === null) {
      loadJSONSchemaData();
    }
    else if (JSON.stringify(_json) != '{}') {
      doJSONSchemaData(_json);
    }
    else {
      loadJSONSchemaData();
    }


  }).catch(function (e) {
    console.error('call getJSONSchema Fail! e', e)
  });

} // end get

//
// load JSON Schema data file
//
function loadJSONSchemaData() {
  console.log('loadJSONSchemaData')
  // Return a new promise.
  return new Promise(function (resolve, reject) {
    try {

      var result = false;

      // get schema
      var URL = "../json/defaultjsonformschema.json";
      console.log('loadJSONSchemaData URL', URL)
      /*global $*/
      $.getJSON(URL, {
          // tags: "mount rainier",
          // tagmode: "any",
          // format: "json"
          dataType: 'json',
        })
        .done(function (data) {
          console.log('loadJSONSchemaData done data:', data)
          result = true;

          createJSONSchema(data).then(function (result) {
            console.log('call createJSONSchema result', result)
            result = true;

            getJSONSchema().then(function (_json) {
              console.log('call getJSONSchema _json', _json)


              doJSONSchemaData(_json);

              result = true;

            }).catch(function (e) {
              console.error('call getJSONSchema Fail! e', e)
              result = false;
              reject(err)
            });
          }).catch(function (e) {
            console.error('call createJSONSchema Fail! e', e)
            result = false;
            reject(err)
          });

        })
        .fail(function (jqxhr, textStatus, error) {
          var err = textStatus + ", " + error;
          console.log("loadJSONSchemaData fail: " + err);
          result = false;
          reject(err)
        })
        .always(function () {
          console.log("loadJSONSchemaData always");
          resolve(result)
        });

    }
    catch (e) {
      console.error('loadJSONSchemaData e', e)
      reject(e);

    }; // end try
  }); // end promise
}; // end loadJSONSchemaData

//
// create myJSONSchema
//
function createJSONSchema(_JSONSchema) {
  console.log('createJSONSchema', _JSONSchema)
  // Return a new promise.
  return new Promise(function (resolve, reject) {
    try {

      // console.log('localStorage.getItem(myJSONSchema)', localStorage.getItem('myJSONSchema'))
      // if (localStorage.getItem('myJSONSchema') === null) localStorage.setItem('myJSONSchema', JSON.stringify({}));
      if (localStorage.getItem('myJSONSchema') === null) localStorage.setItem('myJSONSchema', JSON.stringify(null));

      if (_JSONSchema != null) localStorage.setItem('myJSONSchema', JSON.stringify(_JSONSchema))

      // console.log('localStorage.getItem(myJSONSchema)', localStorage.getItem('myJSONSchema'))

      var reponseObject = localStorage.getItem('myJSONSchema')
      resolve(reponseObject)

    }
    catch (e) {
      console.error('createJSONSchema e', e)
      reject(e);

    };
  });
}; // end createJSONSchema

//
// set myJSONSchema from _JSONSchema 
//
function setJSONSchema(_jsonschema) {
  console.log('setJSONSchema _JSONSchema', _jsonschema)

  // Return a new promise.
  var promise = new Promise(function (resolve, reject) {
    try {
      console.log('setJSONSchema _jsonschema', _jsonschema)
      let myJSONSchema = _jsonschema || {};
      console.log('setJSONSchema _jsonschema', _jsonschema)

      localStorage.setItem('myJSONSchema', JSON.stringify(myJSONSchema));

      var retrievedObject = localStorage.getItem('myJSONSchema');
      // console.log('setJSONSchema retrievedObject: ', JSON.parse(retrievedObject));

      let _JSONSchema = JSON.parse(retrievedObject);
      console.log('_JSONSchema', _JSONSchema)

      resolve(_JSONSchema)

    }
    catch (e) {
      console.error('setJSONSchema e', e)
      reject(e);

    }; // end try 

  });

  return promise;
};

//
// get myJSONSchema from set value 
//
function getJSONSchema() {
  console.log('getJSONSchema')

  // Return a new promise.
  var promise = new Promise(function (resolve, reject) {

    try {

      var retrievedObject = localStorage.getItem('myJSONSchema');
      // console.log('retrievedObject: ', retrievedObject);
      // console.log('retrievedObject: ', JSON.parse(retrievedObject));

      let _JSONSchema = JSON.parse(retrievedObject);

      // console.log('getJSONSchema _JSONSchema: ', _JSONSchema);
      resolve(_JSONSchema)

    }
    catch (e) {
      console.error('getJSONSchema e', e)
      reject(e);

    }; // end try 

  });

  return promise;
} // end getJSONSchema

//
// Update JSONSchema with _fieldjson with a subschema for one fieldtype.
// Retrieves current _JSONSchema, finds and replaces fieldtype element with new one
//
function updateJSONSchema(_fieldjson) {
  console.log('updateJSONSchema _fieldjson', _fieldjson)

  // Return a new promise.
  var promise = new Promise(function (resolve, reject) {

    try {

      let _JSONSchema = {};

      // let _fieldtype = JSON.parse(_fieldjson.key) ;
      let _fieldtype = _fieldjson.key;
      console.log('updateJSONSchema _fieldtype', _fieldtype)

      getJSONSchema().then(function (result) {
        console.log('call getJSONSchema result', result)

        _JSONSchema = result.schema || result;
        // console.log('call getJSONSchema _JSONSchema',_JSONSchema)

        // loop over type elements then replace _fieldtype with new _fieldjson
        for (key in _JSONSchema) {

          if (key === _fieldtype) {
            let el = _JSONSchema[key]
            console.log('  key el', key, el)
            // if key = fieldtype change element to updated value
            _JSONSchema[_fieldtype] = _fieldjson
          }

        }

        if (_JSONSchema === {}) {
          console.log('call getJSONSchema EMPTY!', _JSONSchema)
          throw '{}'
        }
        else {
          setJSONSchema(_JSONSchema).then(function (result) {
            console.log('call setJSONSchema Success! result', result)
          }).catch(function (e) {
            console.error('call setJSONSchema Fail! e', e)
          });
        }

        // console.log('call getJSONSchema',_JSONSchema)
        return _JSONSchema

      }).then(function (_JSONSchema) {

        resolve(_JSONSchema)

      }).catch(function (e) {
        console.error('call getJSONSchema Fail! e', e)
      });

    }
    catch (e) {
      console.error('ERR updateJSONSchema e', e)
      reject(e);

    }; // end try 

  });

  return promise;
} // end updateJSONSchema
//
// ENDING JSONSchema Functions  
//





//
// STARTING FormFieldDef Functions  
//
//  * getFormFieldDefData
//  * loadFormFieldDefData
//  * create createFormFieldDef
//  * setFormFieldDef
//  * getFormFieldDef
//
// create myFormFieldDef
//
function getFormFieldDefData() {
  console.log('getFormFieldDefData')

  // Get local data if available - if not available load from fil
  getFormFieldDef().then(function (_json) {
    console.log('call getFormFieldDef _json', _json)

    if (_json === null) {
      loadFormFieldDefData();
    }
    else if (JSON.stringify(_json) != '{}') {
      doFormFieldDefData(_json);
    }
    else {
      loadFormFieldDefData();
    }

  }).catch(function (e) {
    console.error('call getFormFieldDef Fail! e', e)
  });

} // end get

//
// load Form Field data file
//
function loadFormFieldDefData() {
  console.log('loadFormFieldDefData')
  // Return a new promise.
  return new Promise(function (resolve, reject) {
    try {

      var result = false;

      // get schema
      var URL = "../json/defaultformfielddef.json";
      console.log('loadFormFieldDefData URL', URL)
      /*global $*/
      $.getJSON(URL, {
          // tags: "mount rainier",
          // tagmode: "any",
          // format: "json"
          dataType: 'json',
        })
        .done(function (data) {
          console.log('loadFormFieldDefData done data:', data)
          result = true;

          createFormFieldDef(data).then(function (result) {
            console.log('call createFormFieldDef result', result)
            result = true;

            getFormFieldDef().then(function (_json) {
              console.log('call getFormFieldDef _json', _json)


              doFormFieldDefData(_json);

              result = true;

            }).catch(function (e) {
              console.error('call getFormFieldDef Fail! e', e)
              result = false;
              reject(err)
            });
          }).catch(function (e) {
            console.error('call createFormFieldDef Fail! e', e)
            result = false;
            reject(err)
          });

        })
        .fail(function (jqxhr, textStatus, error) {
          var err = textStatus + ", " + error;
          console.log("loadFormFieldDefData fail: " + err);
          result = false;
          reject(err)
        })
        .always(function () {
          console.log("loadFormFieldDefData always");
          resolve(result)
        });

    }
    catch (e) {
      console.error('loadFormFieldDefData e', e)
      reject(e);

    }; // end try
  }); // end promise
}; // end loadFormFieldDefData

//
// create myFormFieldDef
//
function createFormFieldDef(_FormFieldDef) {
  console.log('createFormFieldDef', _FormFieldDef)
  // Return a new promise.
  return new Promise(function (resolve, reject) {
    try {

      if (localStorage.getItem('myFormFieldDef') === null) localStorage.setItem('myFormFieldDef', JSON.stringify(null));

      if (_FormFieldDef != null) localStorage.setItem('myFormFieldDef', JSON.stringify(_FormFieldDef))

      var retrievedObject = localStorage.getItem('myFormFieldDef')
      console.log('createFormFieldDef retrievedObject: ', JSON.parse(retrievedObject));

      resolve(retrievedObject)

    }
    catch (e) {
      console.error('createFormFieldDef e', e)
      reject(e);

    }; // end try
  }); // end promise
};

//
// set myFormFieldDef from _FormFieldDef 
//
function setFormFieldDef(_formfielddef) {
  console.log('setFormFieldDef', _formfielddef)

  return new Promise(function (resolve, reject) {
    try {

      let myFormFieldDef = _formfielddef || {};

      localStorage.setItem('myFormFieldDef', JSON.stringify(myFormFieldDef));

      var retrievedObject = localStorage.getItem('myFormFieldDef');

      let _FormFieldDef = JSON.parse(retrievedObject);
      console.log('_FormFieldDef', _FormFieldDef)

      resolve(_FormFieldDef)

    }
    catch (e) {
      console.error('setFormFieldDef e', e)
      reject(e);

    };
  });
};

//
// get myFormFieldDef from set value 
//
function getFormFieldDef() {
  console.log('getFormFieldDef')

  // Return a new promise.
  var promise = new Promise(function (resolve, reject) {

    try {

      var retrievedObject = localStorage.getItem('myFormFieldDef');
      console.log('JSON.parse(retrievedObject)', JSON.parse(retrievedObject))

      let _FormFieldDef = JSON.parse(retrievedObject);

      resolve(_FormFieldDef)

    }
    catch (e) {
      console.error('getFormFieldDef e', e)
      reject(e);

    }; // end try 

  });

  return promise;
} // end getFormFieldDef
//
// ENDING FormFieldDef Functions  
//





//
// STARTING FieldSchema Functions  
//  
//  * create localStore setItem and getItem
//  * setFieldJSON
//  * getFieldJSON
//
// create myFieldJSON
// 
// console.log('localStorage.getItem(myFieldJSON)', localStorage.getItem('myFieldJSON'))
if (localStorage.getItem('myFieldJSON') === null) localStorage.setItem('myFieldJSON', JSON.stringify({}));
// console.log('localStorage.getItem(myFieldJSON)', localStorage.getItem('myFieldJSON'))

//
// set myFieldJSON
//
function setFieldJSON(_fieldjson) {
  console.log('setFieldJSON', _fieldjson)

  return new Promise(function (resolve, reject) {
    try {

      let myFieldJSON = _fieldjson || {};
      console.log('myFieldJSON', myFieldJSON)

      localStorage.setItem('myFieldJSON', JSON.stringify(myFieldJSON));
      var retrievedObject = localStorage.getItem('myFieldJSON');
      // console.log('retrievedObject: ', JSON.parse(retrievedObject));
      // console.log('retrievedObject: ', retrievedObject);
      _FieldJSON = JSON.parse(retrievedObject);

      resolve(_FieldJSON)

    }
    catch (e) {
      console.error('setFieldJSON e', e)
      reject(e);
    }
  })
} // end setFieldJSON

// retrieve myFieldJSON
function getFieldJSON(_fieldtype) {
  console.log('getFieldJSON _fieldtype', _fieldtype)

  // MovieLibrary.getGenres().then(function(result) {
  //     // you can access the result from the promise here
  // });

  return new Promise(function (resolve, reject) {
    try {

      let _fieldjson = {};

      if (_fieldtype != null) {

        getJSONSchema().then(function (result) {
          console.log('call getJSONSchema result', result)

          let _JSONSchema = result.schema || result;
          console.log('call getJSONSchema _JSONSchema', _JSONSchema)

          _fieldjson = _JSONSchema[_fieldtype];
          // console.log('getFieldJSON _JSONSchema[fieldtype]',_JSONSchema[fieldtype])

          // console.log('getFieldJSON _fieldjson',_fieldjson)
          resolve(_fieldjson);

        }).catch(function (e) {
          console.error('call getJSONSchema Fail! e', e)
        });

      }
      else {

        var retrievedObject = localStorage.getItem('myFieldJSON');
        // console.log('getFieldJSON retrievedObject',retrievedObject)
        // console.log('retrievedObject: ', JSON.parse(retrievedObject));

        _fieldjson = JSON.parse(retrievedObject);

        // console.log('getFieldJSON _fieldjson',_fieldjson)
        resolve(_fieldjson);
      }

    }
    catch (e) {
      console.error('getFieldJSON e', e)
      reject(e);

    }; // end try 
  }); // end promise
} // end setFieldJSON

// // update myFieldJSON with _fieldjson
// function updateFieldJSON(_fieldjson) {
//     console.log('updateFieldJSON _fieldjson',_fieldjson)

//     // Return a new promise.
//     var promise = new Promise(function(resolve, reject) {

//          try {


//             resolve()

//         } catch(e) {
//             console.error('updateFieldJSON e',e)
//             reject(e);

//         }; // end try 

//     });

//     return promise;
// } // end updateFieldJSON

//
// ENDING FieldSchema Functions  
//




//
// STARTING FieldEditSchema Functions  
//  
//  * create localStore setItem and getItem
//  * setFieldEditSchema
//  * getFieldEditSchema
//  * updateFieldEditSchema
//
// create myFieldJSON
// 
// console.log('localStorage.getItem(myFieldJSON)', localStorage.getItem('myFieldJSON'))
if (localStorage.getItem('myFieldJSON') === null) localStorage.setItem('myFieldJSON', JSON.stringify({}));
// console.log('localStorage.getItem(myFieldJSON)', localStorage.getItem('myFieldJSON'))

// create myFieldEditSchema
function setFieldEditSchema(_fieldeditschema) {
  console.log('setFieldEditSchema', _fieldeditschema)
  // Return a new promise.
  return new Promise(function (resolve, reject) {

    let myFieldEditSchema = _fieldeditschema;
    resolve(true)

  }); // end promise
}; // end setFieldEditSchema


//
// ENDING FieldSchema Functions  
//





//
// STARTING selectFieldList Functions  
//  
//  * doFieldSelect
//  * setFieldSelectList
//  * onchangeSelectFieldList
//
// prepare select list with field types option items
function doFieldSelect(_schema) {
  console.log('doFieldSelect _schema', _schema)

  return new Promise(function (resolve, reject) {
    // get field select list from schema
    var _props = _schema.schema;
    console.log('_props', _props)

    setFieldSelectList(_props).then(function (selectList) {
      // handle next
      console.log('setFieldSelectList Success! selectList', selectList)

      resolve(selectList)

    }).catch(function (e) {
      console.error('setFieldSelectList Fail! e', e)
      reject(e)

    });
  });
}; // end doFieldSelect

function setFieldSelectList(_schema) {
  console.log('setFieldSelectList', _schema)

  return new Promise(function (resolve, reject) {

    try {

      // var _props = _schema.schema.properties
      var myDiv = document.getElementById("selectFieldList");

      var selectList = document.createElement("select");
      selectList.id = "mySelect";
      myDiv.appendChild(selectList);

      // loopover _schema elements assign each to a select option item
      for (key in _schema) {
        // console.log('key',key)
        var option = document.createElement("option");
        option.value = key;
        option.text = _schema[key].title || key;
        selectList.appendChild(option);

      }
      // console.log('selectList',selectList)
      // console.log('_schema[key]',_schema[key])

      // set onchange listener for select
      myDiv.addEventListener("change", onchangeSelectFieldList)
      // console.log('myDiv',myDiv)

      // set current field schema in editor
      onchangeSelectFieldList().then(function (result) {
        console.log('call onchangeSelectFieldList Success! result', result)

      }).catch(function (e) {
        console.error('call onchangeSelectFieldList Fail! e', e)
      });

      resolve(selectList);

    }
    catch (e) {
      console.error('setFieldSelectListreject e', e)
      reject(e);

    }; // end try
  }); // end promise
}; // end setFieldSelectList
//
//
function onchangeSelectFieldList() {
  console.log('onchangeSelectFieldList')

  return new Promise(function (resolve, reject) {

    try {

      var myDiv = document.getElementById("mySelect");
      // console.log('myDiv',myDiv)
      var key = document.getElementById("mySelect").value;
      console.log('onchangeSelectFieldList key', key)

      getFieldJSON(key).then(function (_fieldjson) {
        // handle next
        console.log('call getFieldJSON Success! _fieldjson', _fieldjson)


        // // doJSONSchemaEditor plain textarea
        // doJSONSchemaEditor(_fieldjson).then(function (result) {
        //   console.log('call doJSONSchemaEditor Success! result', result)

        //   resolve(result)

        // }).catch(function (e) {
        //   console.error('call doJSONSchemaEditor Fail! e', e)
        //   reject(e)

        // }); // enddoJSONSchemaEditor


        // doJSONSchemaAceEditor Ace editor
        doJSONSchemaAceEditor(_fieldjson).then(function (result) {
          console.log('call doJSONSchemaAceEditor Success! result', result)

          resolve(result)

        }).catch(function (e) {
          console.error('call doJSONSchemaAceEditor Fail! e', e)
          reject(e)

        }); // enddoJSONSchemaEditor


      }).catch(function (e) {
        console.error('call getFieldJSON Fail! e', e)
        reject(e)

      }); // end getFieldJSON
    }
    catch (e) {
      console.error('onchangeSelectFieldList e', e)
      reject(e);

    }; // end try
  }); // end promise
}; // end onchangeSelectFieldList
//
// ENDING selectFieldList Functions  
//




//
// STARTING editJSONSchema Functions  
//  
//  * doJSONSchemaEditor
//  * setJSONSchemaEditor
//  * getJSONSchemaEditor
//  * onchangeJSONSchemaEditor
//
// Called with target JSON Schema to instantiate and populate text editor wth JSOM style / the,e
// Functions for SchemaEditor include setJSONSchemaEditor, getJSONSchemaEditor, and onchangeJSONSchemaEditor
//
// function doJSONSchemaEditor(_schema) {
//   console.log('doJSONSchemaEditor _schema', _schema)

//   return new Promise(function (resolve, reject) {

//     try {

//       // call setJSONSchemaEditor 
//       setJSONSchemaEditor(_schema).then(function (result) {
//         console.log('setJSONSchemaEditor Success! result', result)


//         getJSONSchemaEditor().then(function (content) {
//           console.log('getJSONSchemaEditor Success! content', content)
//         }).catch(function (e) {
//           console.error('getJSONSchemaEditor Fail! e', e)
//         });

//         resolve(result);

//       }).catch(function (e) {
//         console.error('setJSONSchemaEditor Fail! e', e)
//         reject(e)

//       }); // end setJSONSchemaEditor
//     }
//     catch (e) {
//       console.error('doJSONSchemaEditor e', e)
//       reject(e);
//     }; // end try 
//   }); // end promise
// } // end doJSONSchemaEditor

// //
// //
// //
// function setJSONSchemaEditor(_schema) {
//   console.log('setJSONSchemaEditor _schema', _schema)

//   return new Promise(function (resolve, reject) {

//     try {

//       var myEl = document.getElementById("myTextarea");
//       // myDiv.innerHTML= "<textarea>" + JSON.stringify(_schema) + "</textarea>";
//       let content = JSON.stringify(_schema)
//       myEl.value = content;

//       myEl.addEventListener("change", onchangeJSONSchemaEditor);


//       resolve(myEl.value);

//     }
//     catch (e) {
//       console.error('setJSONSchemaEditor e', e)
//       reject(e);

//     }; // end try 
//   }); // end promise
// }; // end setJSONSchemaEditor

// //
// //
// //
// function getJSONSchemaEditor() {
//   console.log('getJSONSchemaEditor ')

//   return new Promise(function (resolve, reject) {

//     try {

//       var myEl = document.getElementById("myTextarea");
//       let content = myEl.value
//       let _shema = JSON.parse(content)

//       // console.log('getJSONSchemaEditor _shema',_shema)
//       resolve(_shema);

//     }
//     catch (e) {
//       console.error('getJSONSchemaEditor e', e)
//       reject(e);

//     }; // end try 
//   }); // end promise
// }; // end getJSONSchemaEditor

// function onchangeJSONSchemaEditor() {
//   console.log('onchangeJSONSchemaEditor')

//   return new Promise(function (resolve, reject) {

//     try {

//       var myEl = document.getElementById("myTextarea");
//       let content = myEl.value

//       console.log('onchangeJSONSchemaEditor content', content)


//       if (isJSONSchemaValid(content) === false) {
//         var msg = "JSONSchemaEditor content is NOT valid JSON Schema";
//         alert(msg);
//         console.error(msg)
//         reject(msg)
//       }

//       // check for json syntax correctness - JSON Schema validation?
//       let cn = content;

//       function checkJSONSchemaValid() {
//         console.log('checkJSONSchemaValid')
//         var promise = new Promise(function (resolve, reject) {
//           // // vanillaJS
//           // function isJSON(str) {
//           //   try {
//           //     var res = JSON.parse(str)
//           //     return true;
//           //   }
//           //   catch (e) {
//           //     return false;
//           //   }
//           // }

//           // if (isJSON(content)) {
//           if (isJSONSchemaValid(content) === false) {
//             console.log('isJSONSchemaValid', true)
//             cn = JSON.parse(content)
//           }
//           else {
//             console.log('isJSONSchemaValid', false)
//             cn = content
//           }

//           console.log('onchangeJSONSchemaEditor cn', cn)

//           resolve(cn);
//         });

//         return promise;
//       }; // end function checkJSONSchemaValid


//       checkJSONSchemaValid().then(function (result) {
//         console.log('call checkJSONSchemaValid Success! result', result)
//         // you can access the result from the promise here
//         setFieldJSON(result).then(function (_fieldjson) {
//           console.log('call setFieldJSON Success! _fieldjson', _fieldjson)

//           updateJSONSchema(_fieldjson).then(function (result) {
//             console.log('call updateJSONSchema Success! result', result)

//           }).catch(function (e) {
//             console.error('call updateJSONSchema Fail! e', e)
//           }); // end updateJSONSchema

//         }).catch(function (e) {
//           console.error('call setFieldJSON Fail! e', e)
//         }); // end setFieldJSON

//       }).catch(function (e) {
//         console.error('call checkJSONSchemaValid Fail! e', e)
//       });




//       resolve(cn);

//     }
//     catch (e) {
//       console.error('onchangeJSONSchemaEditor e', e)
//       reject(e);

//     }; // end try 
//   }); // end promise
// }; // end onchangeJSONSchemaEditor


//
// STARTING editJSONSchema Functions  
//  
//  * doJSONSchemaAceEditor
//  * setJSONSchemaAceEditor
//  * getJSONSchemaAceEditor
//  * onchangeJSONSchemAceaEditor
//
// Called with target JSON Schema to instantiate and populate Ace editor with JSON style 
// Functions for Schema Editor include setJSONSchemaAceEditor, getJSONSchemaAceEditor, and onchangeJSONSchemaAceEditor

//
//
function doJSONSchemaAceEditor(_schema) {
  console.log('doJSONSchemaAceEditor _schema', _schema)

  return new Promise(function (resolve, reject) {

    try {

      // call setJSONSchemaAceEditor 
      setJSONSchemaAceEditor(_schema).then(function (result) {
        console.log('call setJSONSchemaAceEditor Success! result', result)

        // getJSONSchemaAceEditor().then(function (content) {
        //   console.log('call getJSONSchemaAceEditor Success! content', content)
        // }).catch(function (e) {
        //   console.error('call getJSONSchemaAceEditor Fail! e', e)
        // });

        resolve(result);

      }).catch(function (e) {
        console.error('call setJSONSchemaAceEditor Fail! e', e)
        reject(e)

      }); // end setJSONSchemaAceEditor
    }
    catch (e) {
      console.error('doJSONSchemaAceEditor e', e)
      reject(e);
    }; // end try 
  }); // end promise
} // end doJSONSchemaAceEditor

//
//
//
function setJSONSchemaAceEditor(_schema) {
  console.log('setJSONSchemaAceEditor _schema', _schema)

  return new Promise(function (resolve, reject) {

    try {

      editor.setValue(JSON.stringify(_schema, null, '\t'));

      // var myEl = document.getElementById("myTextarea");
      // // myDiv.innerHTML= "<textarea>" + JSON.stringify(_schema) + "</textarea>";
      // let content = JSON.stringify(_schema)
      // myEl.value = content;

      editor.addEventListener("click", onchangeJSONSchemaAceEditor);

      resolve(true);

    }
    catch (e) {
      console.error('setJSONSchemaAceEditor e', e)
      reject(e);

    }; // end try 
  }); // end promise
}; // end setJSONSchemaEditor

//
//
//
function getJSONSchemaAceEditor() {
  console.log('getJSONSchemaAceEditor ')

  return new Promise(function (resolve, reject) {

    try {

      let content = editor.getValue();

      if (isJSONSchemaValid(content) === false) {
        var msg = "JSONSchemaEditor content is NOT valid JSON";
        alert(msg);
        console.error(msg)

        reject(msg)

      }
      else {

        let _schema = JSON.parse(content) || content

        setJSONSchema(_schema).then(function (result) {
          console.log('call setJSONSchema Success! result', result)

          resolve(result);

        }).catch(function (e) {
          console.error('call setJSONSchema Fail! e', e)

          reject(e)

        });

      }; // end if

    }
    catch (e) {
      console.error('getJSONSchemaAceEditor e', e)
      reject(e);

    }; // end try 
  }); // end promise
}; // end getJSONSchemaEditor
//
// ENDING editJSONSchema Functions  
//   










//
// Utility Functions
//
//  * isJSONValid
//  * isJSONSchemaValid
//

function isJSONValid(_json) {
  console.log('isJSONValid')

  var promise = new Promise(function (resolve, reject) {
    // vanillaJS
    function isJSON(str) {
      try {

        var _schema = JSON.parse(str)

        return true;

      }
      catch (e) {
        return false;
      }
    }

    if (isJSON(_json)) {
      console.log('isJSON', true)
      resolve(true);

    }
    else {
      console.log('isJSON', false)
      var msg = "JSON content is NOT valid JSON";
      console.error(msg)
      alert(msg)
      resolve(false);
    }


  });

  return promise;
}; // end function isJSONValid


function isJSONSchemaValid(_json) {
  console.log('isJSONSchemaValid _json', _json)

  var promise = new Promise(function (resolve, reject) {

    try {

      //var _schema = JSON.parse(_json)
      var _schema = _json

      // JSON Validator
      // https://github.com/garycourt/JSV
      // var JSV = require("./jsv").JSV;
      var json = {};
      // var schema = {"type" : "object"};
      var schema = _schema;
      var env = JSV.createEnvironment();
      var report = env.validate(json, schema);
      console.log('isJSONSchemaValid report', report)

      if (report.errors.length === 0) {
        //JSON is valid against the schema
        return true;

      }
      else {
        var msg = "content is NOT valid JSON Schema";
        console.error(msg)
        return false;

      }

    }
    catch (e) {
      var msg = "content is NOT valid JSON Schema (e)" + e;
      console.error(msg)
      return false;
    }

  });

  return promise;
}; // end function isJSONSchemaValid
