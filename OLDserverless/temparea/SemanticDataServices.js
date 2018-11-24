const MAX_SRVS = 5

let arrSemDatSrvs = [
    {
        "id": 1,
        "date": "01-01-1971",
        "title": "My first SemDatSrv",
        "abstrqct": " HIYA !"
        },
    {
        "id": 2,
        "date": "02-01-1971",
        "title": "My second SemDatSrv",
        "abstrqct": " HIYA HIYA !"
        },
    {
        "id": 3,
        "date": "03-01-1971",
        "title": "My third one",
        "abstrqct": " Yes, this is the 3rd HIYA"
        }

    ]

class SemanticDataServices {

    constructor(hiyaHost, hiyaUsername, hiyaPassword, hiyaPort) {
        this.hiyaHost = hiyaHost;
        this.hiyaUsername = hiyaUsername;
        this.hiyaPassword = hiyaPassword;

    }


    _hiyaConnect() {
        return new Promise((resolve) => {
            // create reusable transporter object using the default...
            let transporter = arrSemDatSrvs;

            resolve(transporter)
        })
    }

    getSemDatSrvs() {
        return this._hiyaConnect()
            .then(() => arrSemDatSrvs)

    }

    /**
     */
    getSemDatSrv(index) {
        return this._hiyaConnect()
            .then(() => arrSemDatSrvs[index])

    }

    /**
     */
    putSemDatSrv(date, id, title, abstract) {
        return this._hiyaConnect()

    }

}
// module.exports = SemanticDataServices
