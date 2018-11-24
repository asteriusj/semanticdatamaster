'use strict';

(function (vars, global) {
    console.log('loading UTILS.js')
    for (var i in vars) global[i] = vars[i];
})({
    aa: function () {
        return 'aa'
    },
    bb: function () {
        return 'bb'
    }
}, typeof exports === "undefined" ? this : exports);
