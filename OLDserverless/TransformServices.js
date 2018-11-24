// *
// * Class deinitions and contsants for functionalitity that can be xposed via lambda handlers
// * module.exports used to make interfaces available to handlers but not ourside such as API Gateway
// * Inspired by: https://medium.com/the-reading-room/how-to-create-a-simple-rest-web-service-with-node-aws-lambda-and-the-serverless-framework-4730c88cd39a
// *

// const fetch = require('node-fetch');



class TransformServices {

    // no need to establish this vars unless ...
    constructor() {

    }



    // // **
    // // 
    // // **
    createPerson(event) {
        return new Promise((resolve, reject) => {

            resolve('Person')
        }) // end return
    }; // end createPerson


    // **
    // 
    // **
    JSONSchema2OWLJSONLD(event) {
        return new Promise((resolve, reject) => {

            resolve('Hiya')
        }) // end return

    }; // end JSONSchema2OWLJSONLD

    // **
    // 
    // **
    OWLJSONLD2JSONSchema(event) {
        return new Promise((resolve, reject) => {

            resolve('Hiya')
        }) // end return

    }; // end JSONSchema2OWLJSONLD

}; // end TransformServices

module.exports = TransformServices
