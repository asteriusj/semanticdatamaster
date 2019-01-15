//
//  shared routine for enhancing JSON objects with selected metadata 
//
class JsonMetadata {

    constructor() {

    }

    enhance(_json) {
        console.log('enhancing _json:', _json)
        return new Promise(function (resolve, reject) {

            try {

                let jsonContent = _json["@id"] || _json

                if ((jsonContent != {}) && (jsonContent != null) && (jsonContent != undefined)) {

                    if (jsonContent.length > 0) {


                        // TODO add support for walking though hierarchy


                        for (let i = 0; i < jsonContent.length; i++) {
                            console.log('jsonContent[i]:', jsonContent[i])
                            let elObj = jsonContent[i]
                            let _obj = addMetadata(elObj)
                            console.log('_obj:', _obj)
                            jsonContent[i] = _obj;

                        } // end for
                    }
                    else {
                        let elObj = jsonContent
                        let _obj = addMetadata(elObj)
                        console.log('_obj:', _obj)
                        jsonContent = _obj;

                    } // end if length

                } // end of != 

                resolve(jsonContent)

            } // end try promise
            catch (e) {
                console.log('catch error enhance', e);
                // if (cb) cb(e);
                reject(e);
            }
        }); // end promise

    }; //end function JsonMetadata enhance

}; // end class JsonMetadata
module.exports = JsonMetadata


function addMetadata(obj) {
    // console.log('JsonMetadata addMetadata obj', obj)

    let _obj = null;

    const today = new Date();
    const uuidv1 = require('uuid/v1');
    const crypto = require('crypto');

    if ((obj != null) && (obj != undefined)) {

        const shasum = crypto.createHash('sha1');
        shasum.update(JSON.stringify(obj));
        var hex = shasum.digest('hex');

        _obj = obj;
        _obj._id = _obj['@id'] || uuidv1();
        _obj._etag = hex;
        _obj._guid = uuidv1();
        _obj._kind = _obj['dbo:type'] || "";
        _obj._datePublished = today;

    } // end if !=

    console.log('addMetadata _obj', _obj)
    return _obj
}
