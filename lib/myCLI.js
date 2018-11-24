console.log('myCLI.js loading...')
'use strict'


const json = require('json-promise');
//
const F = require('./myFunctions');



/**
 * Initialises the MyFunctions based on environment variables
 */
/**
 * Initialises the MyFunctions based on environment variables
 */
function createMyFunctions() {
    const theFunct = new F(
        'Some Stuff'

    )
    return theFunct
}
// let theFunct = new F.myFunctions();




const theFunct = createMyFunctions()
theFunct.transform('hiya').then(function (result) {
    console.log("call theFunct.transform Success! result", result)



}).catch(function (e) {
    console.error('call theFunct.transform Fail! e', e)

});
