//
//  shared routine for transforming JSON SChema of form field elements 
//  into a FormField file 
//
class JSONSchema2FormField {

    constructor() {

    }

    transform(_json) {
        console.log('transform _json:', _json)
        return new Promise(function (resolve, reject) {

            try {


                resolve()

            } // end try promise
            catch (e) {
                console.log('catch error JSONSchema2FormField', e);
                // if (cb) cb(e);
                reject(e);
            }
        }); // end promise

    }; // end function JSONSchema2FormField transform

}; // end class JSONSchema2FormField

module.exports = JSONSchema2FormField
