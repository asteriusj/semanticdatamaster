"use strict";
//
//  http://www.richardrodger.com/2013/09/27/how-to-make-simple-node-js-modules-work-in-the-browser/#.WmKgFqinFaQ
//
(function () {
    var root = this
    var previous_mymodule = root.mymodule
}).call(this);

var mymodule = function () {
    return 'cc'
}

mymodule.noConflict = function () {
    root.mymodule = previous_mymodule
    return mymodule
}

var othername = mymodule.noConflict()
// the variable mymodule is back to its old value from h


if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = mymodule
    }
    exports.mymodule = mymodule
}
else {
    root.mymodule = mymodule
}
