console.log('testhiyaservice.js loading...')
'use strict'
const HS = require("./hiyaservice.js")
// console.log('HS', HS)

var objHiyaServices = new HS.HiyaServices;

objHiyaServices.getHiyas()


// then(function (result) {
//     console.log("call getHiyas Success! ", result)


// }).catch(function (e) {



//     console.error('call getHiyas Fail! e', e)

// });
