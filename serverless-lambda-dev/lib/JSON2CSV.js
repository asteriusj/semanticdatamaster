//
//  shared routine for transforming JSON file into a CSV formated file
//
class JSON2CSV {

    constructor() {

    }

    transform(_json) {
        console.log('transform _json:', _json)
        return new Promise(function (resolve, reject) {

            try {

                // let _csv = """

                var data = _json
                var csvjson = require('csvjson');

                var options = {
                    headers: "none",
                    wrap: false
                }
                /* supported options
                 
                    delimiter = <String> optional default value is ","
                    wrap  = <String|Boolean> optional default value is false
                    headers = <String> optional supported values are "full", "none", "relative", "key"
                    objectDenote = <String> optional default value is "."
                    arrayDenote = <String> optional default value is "[]"
                */

                let _CSV = csvjson.toCSV(data, options);

                console.log('_CSV: ', _CSV); //here is your result csv string

                resolve(_CSV)

                // if (_json == {}) _json = [{ "Variable": "", "Restrictions": "", "content map": "", "category tab": "", "section": "", "role(s)": "", "id": "", "name": "", "label": "", "control": "", "type": "", "options": "", "datalist": "", "placeholder / caption": "", "value / default": "", "repeatable": "", "parent": "", "size": "", "maxlength": "", "min": "", "max": "", "spellcheck": "", "required": "", "reqmsg": "", "helpmsg": "", "validation": "", "pattern (regexp)": "", "title / invalid msg": "", "transforms": "", "triggers": "", "assumptions": "", "autofocus": "", "autocomplete": "", "disabled": "", "readonly": "" }, { "Variable": "{{ContactInfoSectionHeadline}}", "Restrictions": "", "content map": "profileinfo.conatactindosection.headline", "category tab": "ProfileInfo", "section": "ContactInfoSection", "role(s)": "", "id": "", "name": "", "label": "", "control": "", "type": "", "options": "", "datalist": "", "placeholder / caption": "", "value / default": "", "repeatable": "", "parent": "", "size": "", "maxlength": "", "min": "", "max": "", "spellcheck": "", "required": "", "reqmsg": "", "helpmsg": "", "validation": "", "pattern (regexp)": "", "title / invalid msg": "", "transforms": "", "triggers": "", "assumptions": "", "autofocus": "", "autocomplete": "", "disabled": "", "readonly": "" }, { "Variable": "{{ContactInfoSectionSubhead}}", "Restrictions": "", "content map": "profileinfo.conatactindosection.headline", "category tab": "ProfileInfo", "section": "ContactInfoSection", "role(s)": "", "id": "", "name": "", "label": "", "control": "", "type": "", "options": "", "datalist": "", "placeholder / caption": "", "value / default": "", "repeatable": "", "parent": "", "size": "", "maxlength": "", "min": "", "max": "", "spellcheck": "", "required": "", "reqmsg": "", "helpmsg": "", "validation": "", "pattern (regexp)": "", "title / invalid msg": "", "transforms": "", "triggers": "", "assumptions": "", "autofocus": "", "autocomplete": "", "disabled": "", "readonly": "" }, { "Variable": "{{PersonUID}}", "Restrictions": "autogenerated", "content map": "person.uid", "category tab": "ProfileInfo", "section": "ContactInfoSection", "role(s)": "", "id": "", "name": "PersonUID", "label": "", "control": "", "type": "", "options": "", "datalist": "", "placeholder / caption": "", "value / default": "", "repeatable": "", "parent": "", "size": "", "maxlength": "", "min": "", "max": "", "spellcheck": "", "required": "", "reqmsg": "", "helpmsg": "", "validation": "", "pattern (regexp)": "", "title / invalid msg": "", "transforms": "", "triggers": "", "assumptions": "", "autofocus": "", "autocomplete": "", "disabled": "", "readonly": "" }, { "Variable": "{{PersonFirstName}}", "Restrictions": "required; min 1; max 13", "content map": "person.givenname", "category tab": "ProfileInfo", "section": "ContactInfoSection", "role(s)": "Player, Parent, Staff", "id": "txtGivenName", "name": "givenName", "label": "First Name", "control": "input", "type": "text", "options": "", "datalist": "", "placeholder / caption": "", "value / default": "", "repeatable": "", "parent": "", "size": 13, "maxlength": "", "min": "", "max": "", "spellcheck": "", "required": "TRUE", "reqmsg": "First Name is required", "helpmsg": "", "validation": "", "pattern (regexp)": "", "title / invalid msg": "Player First Name is required", "transforms": "", "triggers": "trigGivenNameOnChange", "assumptions": "", "autofocus": "TRUE", "autocomplete": "FALSE", "disabled": "", "readonly": "" }, { "Variable": "{{PersonMiddleName}}", "Restrictions": "max 13", "content map": "person.middlename", "category tab": "ProfileInfo", "section": "ContactInfoSection", "role(s)": "", "id": "txtMiddleName", "name": "middleName", "label": "", "control": "", "type": "", "options": "", "datalist": "", "placeholder / caption": "", "value / default": "", "repeatable": "", "parent": "", "size": 13, "maxlength": "", "min": "", "max": "", "spellcheck": "", "required": "", "reqmsg": "", "helpmsg": "", "validation": "", "pattern (regexp)": "", "title / invalid msg": "", "transforms": "", "triggers": "trigMiddleNameOnChange", "assumptions": "", "autofocus": "", "autocomplete": "", "disabled": "", "readonly": "" }, { "Variable": "{{PersonLastName}}", "Restrictions": "required; min 1; max 13", "content map": "person.familyname", "category tab": "ProfileInfo", "section": "ContactInfoSection", "role(s)": "Player, Parent, Staff", "id": "txtLastName", "name": "familyName", "label": "Last Name", "control": "input", "type": "text", "options": "", "datalist": "", "placeholder / caption": "", "value / default": "", "repeatable": "", "parent": "", "size": 13, "maxlength": "", "min": "", "max": "", "spellcheck": "", "required": "TRUE", "reqmsg": "Last Name is required", "helpmsg": "", "validation": "", "pattern (regexp)": "", "title / invalid msg": "Player Last Name is required", "transforms": "", "triggers": "TrigFamilyNameOnChange", "assumptions": "", "autofocus": "", "autocomplete": "FALSE", "disabled": "", "readonly": "" }]
                // // let myData = [{ "A1": "Do", "B1": "Re", "C1": "Me" }]
                // // console.log('myData', myData)
                // // let myFields = ['A1', 'B1', 'C1']
                // function getMyFields(jdata) {
                //     // console.log('getMyFields(jdata)', jdata)

                //     if (jdata[0]) {
                //         // console.log('jdata[0]', jdata[0])
                //         let fields = [];
                //         for (var property in jdata[0]) {
                //             console.log('property', property)
                //             fields.push(property)

                //         }
                //         console.log('fields', fields)
                //         return (fields)
                //     }
                //     else {
                //         console.log('jdata[0]', jdata[0])
                //         return null
                //     }
                // }
                // const Json2csvParser = require('json2csv').Parser;
                // const fields = getMyFields(_json);
                // const opts = { fields };


                // try {
                //     console.log('opts', opts)
                //     const parser = new Json2csvParser(opts);
                //     const _csv = parser.parse(_json);
                //     // console.log(_csv);
                //     resolve(_csv)
                // }
                // catch (err) {
                //     console.error(err);
                // }




            } // end try promise
            catch (e) {
                console.log('catch error JSON2CSV e:', e);
                // if (cb) cb(e);
                reject(e);
            }
        }); // end promise

    }; // end function JSON2CSV transform

}; // end class JSON2CSV

module.exports = JSON2CSV
