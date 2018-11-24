//
//  shared routine for transforming a JSON Schema of form field elements 
//  into a OWL in JSON-LD
//
function OWLJSONLD2JSONSchema(_owljsonld, cb) {
    console.log('OWLJSONLD2JSONSchema _json', _json)

    return new Promise(function (resolve, reject) {
        try {
            let _JSON = JSON.stringify(_json) || _json;
            console.log('OWLJSONLD2JSONSchema entry', _JSON)

            resolve();

        }
        catch (e) {
            console.log('catch error OWLJSONLD2JSONSchema', e);
            if (cb) cb(e);
            reject(e);

        }
    }); // end promise
}; // end OWLJSONLD2JSONSchema
