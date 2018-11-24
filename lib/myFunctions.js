const MAX_EMAILS = 10;

//
// class for...
//
class myFunctions {

    constructor(stuff) {

        this.stuff = stuff;
        console.log('this this.stuff', this, this.stuff)

        this.more = this._getMore(this.stuff)
    }


    /**
     */
    _getMore(req) {

        return 'more ' + req

    }

    transform(req) {
        return new Promise(function (resolve, reject) {
            let _st = this.stuff
            let _mo = this.more
            let _max = MAX_EMAILS;

            resolve('cool')
        })


    }
}

module.exports = myFunctions
