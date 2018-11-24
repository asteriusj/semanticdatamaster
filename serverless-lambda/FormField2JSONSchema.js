//
//  shared routine for transforming FormField of form field elements 
//  into a JSON SChema file 
//
class FormField2JSONSchema {

    constructor() {

    }

    transform(_json) {
        console.log('transform _json:', _json)
        return new Promise(function (resolve, reject) {

            try {


                resolve()

            } // end try promise
            catch (e) {
                console.log('catch error FormField2JSONSchema', e);
                // if (cb) cb(e);
                reject(e);
            }
        }); // end promise

    }; // end function FormField2JSONSchema transform

}; // end class FormField2JSONSchema

module.exports = FormField2JSONSchema
