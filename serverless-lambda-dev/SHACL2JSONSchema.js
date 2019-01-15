//
//  shared routine for transforming SHACL  of form field elements 
//  into a JSON SChema file 
//
class SHACL2JSONSchema {

    constructor() {

    }

    transform(_shacl) {
        console.log('transform _shacl:', _shacl)
        return new Promise(function (resolve, reject) {

            try {




                resolve()

            } // end try promise
            catch (e) {
                console.log('catch error SHACL2JSONSchema', e);
                // if (cb) cb(e);
                reject(e);
            }
        }); // end promise

    }; // end function SHACL2JSONSchema transform

}; // end class SHACL2JSONSchema

module.exports = SHACL2JSONSchema
