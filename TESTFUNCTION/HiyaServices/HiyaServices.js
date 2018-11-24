// https://medium.com/the-reading-room/how-to-create-a-simple-rest-web-service-with-node-aws-lambda-and-the-serverless-framework-4730c88cd39a

// getHiyas(): Array [{index, id, title, date}]
//     Returns an array of the latest 5 hiyas in your collective (excluding the abstract)

// getHiya(index): {id, title, date, abstract} 
//     Gives you the specified hiya

// putHiya({id, key, title, abstract}) 
//     Sends / Puts a Hiya

const MAX_HIYAS = 5

let arrHiyas = [
    {
        "id": 1,
        "date": "01-01-1971",
        "title": "My first Hiya",
        "abstrqct": " HIYA !"
        },
    {
        "id": 2,
        "date": "02-01-1971",
        "title": "My second Hiya",
        "abstrqct": " HIYA HIYA !"
        },
    {
        "id": 3,
        "date": "03-01-1971",
        "title": "My third one",
        "abstrqct": " Yes, this is the 3rd HIYA"
        }

    ]

class HiyaServices {

    constructor(hiyaHost, hiyaUsername, hiyaPassword, hiyaPort) {
        this.hiyaHost = hiyaHost;
        this.hiyaUsername = hiyaUsername;
        this.hiyaPassword = hiyaPassword;
        this.hiyaPort = hiyaPort;
    }


    _hiyaConnect() {
        return new Promise((resolve) => {
            // create reusable transporter object using the default...
            let transporter = arrHiyas;

            resolve(transporter)
        })
    }


    _list() {
        return this.hiya.command('LIST')
            .then(([info, stream]) => {
                return new Promise((resolve) => {
                    let data = ""
                    data = arrHiyas;
                })
            })
    }

    // _top(index) {
    //     return this.hiya.command('TOP', index, 1)
    //     console.log('index', index)

    //         .then(([info, stream]) => {
    //             console.log('index', index)

    //             return new Promise((resolve) => {
    //                 let data = "";
    //                 data = arrHiyas;
    //             })
    //         })
    //         .then((data) => {
    //             let env = new arrHiyas;
    //             let hiya = {
    //                 title: env.title,
    //                 id: env.id,
    //                 date: env.data
    //             }
    //             return hiya
    //         })
    // }


    // _retrieve(index) {
    //     return this.hiya.command('RETR', index)

    //     console.log('index', index)

    //         .then(() => {
    //             return new Promise((resolve) => {
    //                 let data = "";
    //                 data = arrHiyas;
    //             })
    //         })
    //         .then((data) => {
    //             let env = data;
    //             let hiya = {
    //                 title: env.title,
    //                 id: env.id,
    //                 date: env.date,
    //                 abstract: env.abstract
    //             }
    //             return hiya
    //         })
    // }


    // getHiyas() {
    //     return this._hiyaConnect()
    //         .then(() => this._list())
    //         .then((list) => {
    //             let count = list.length > MAX_HIYAS ? MAX_HIYAS : list.length
    //             // Get TOP for each hiya, consecutively
    //             let result = Promise.resolve()
    //             let tops = []
    //             for (let i = list.length - 1; i >= list.length - MAX_HIYAS; i--) {
    //                 result = result
    //                     .then(() => this._top(i))
    //                     .then((hiya) => {
    //                         // Make sure each hiya returned includes the index of 
    //                         // that hiya within the list
    //                         let hiyaWithIndex = Object.assign({},
    //                             hiya, { index: list[i].split(" ")[0] }
    //                         )
    //                         tops.push(hiyaWithIndex)
    //                         return
    //                     })
    //             }
    //             return result
    //                 .then(() => this.hiya.QUIT())
    //                 .then(() => tops)
    //         })
    // }

    getHiyas() {
        return this._hiyaConnect()
            .then(() => arrHiyas)

    }

    /**
     */
    getHiya(index) {
        return this._hiyaConnect()
            .then(() => arrHiyas[index])

    }

    /**
     */
    putHiya(date, id, title, abstract) {
        return this._hiyaConnect()

    }

    // /**
    //  */
    // sendEmail(from, to, subject, body) {
    //     return this._smtpConnect()
    //         .then((transporter) => {
    //             return new Promise((resolve, reject) => {
    //                 // setup email data with unicode symbols
    //                 let mailOptions = {
    //                     from: from, // sender address
    //                     to: to, // list of receivers
    //                     subject: subject, // Subject line
    //                     text: body, // plain text body
    //                     html: body // html body
    //                 }

    //                 // send mail with defined transport object
    //                 transporter.sendMail(mailOptions, (error, info) => {
    //                     if (error) {
    //                         reject(error)
    //                     }
    //                     else {
    //                         resolve(info)
    //                     }
    //                 })
    //             })
    //         })
    // }
}

module.exports = HiyaServices
