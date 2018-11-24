//
//  shared routine for enhancing JSON objects with selected metadata 
//
class JsonMetadata {

    constructor() {

    }

    enhance(_json) {
        // console.log('enhancing _json:', _json)
        return new Promise(function (resolve, reject) {

            try {

                const today = new Date();
                const uuidv1 = require('uuid/v1');
                const crypto = require('crypto');

                // const jsonmetadata = new JsonMetadata()
                const jsonContent = _json

                if (jsonContent) {
                    for (let i = 0; i < jsonContent.length; i++) {
                        let elObj = jsonContent[i]

                        const shasum = crypto.createHash('sha1');
                        shasum.update(JSON.stringify(elObj));
                        var hex = shasum.digest('hex');

                        elObj._id = elObj['@id']
                        elObj._etag = hex
                        elObj._guid = uuidv1()
                        elObj._kind = elObj['dbo:type']
                        elObj._datePublished = today
                    }

                    resolve(jsonContent)

                }
                else {
                    resolve()
                }


            } // end try promise
            catch (e) {
                console.log('catch error enhance', e);
                // if (cb) cb(e);
                reject(e);
            }
        }); // end promise

    }; // end function JsonMetadata enhance

}; // end class JsonMetadata

module.exports = JsonMetadata
