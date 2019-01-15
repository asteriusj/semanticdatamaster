class JtoLD {

    constructor(json) {
        console.log('jsonld-ex new JSONtoJSONLD constructor json:', json)
        this.json = json;
    }

    transform(_JSON) {
        console.log('transform _JSON:', _JSON)
        return new Promise(function (resolve, reject) {

            try {

                const jsonld = require('jsonld');
                console.log('jsonld', jsonld)

                const context = require('./contexts.js');
                // console.log(context)

                // console.log('this.json:', this.json);
                let _json = _JSON
                // let _json = [{ "@id": "foafiaf:Scorecard_Top_25", "@type": "skos:Concept", "rdf:type": "sioc:topic", "dbo:type": "foafiaf:Scorecard", "foaf:topic": "Community Transformation Scorecard", "rdfs:label": "Top 25", "dc:title": "A Top 25 Community", "dc:description": "Informs us that are mission is to be a top 25 community", "skos:definition": "", "rdfs:comment": "", "dbo:abstract": "", "foafiaf:keywords": "", "foafiaf:categories": "Scorecard", "skos:related": "", "skos:inScheme": "foafiaf:Scorecard_0", "foafiaf:Parent": "", "skos:broader": "", "skos:narrower": "", "foafiaf:polarity": "Increasing is good", "foafiaf:timeperiodtype": "Quarter", "foafiaf:unitofmeasure": "ROYG", "foafiaf:targetvalue": "1", "foafiaf:datavalues": "", "foafiaf:datatrend": "", "foafiaf:status": "Cyan", "foafiaf:color": "#00FFFF" }, { "@id": "foafiaf:Scorecard_Top Level", "@type": "skos:ConceptScheme", "rdf:type": "sioc:topic", "dbo:type": "foafiaf:Scorecards", "foaf:topic": "Scorecards: Indicator Scorecards", "rdfs:label": "Top Level", "dc:title": "Top Level Indicators", "dc:description": "", "skos:definition": "What does this top level indicator tell us about our transformation; what likey outcome or output does achieving this vision?", "rdfs:comment": "", "dbo:abstract": "", "foafiaf:keywords": "Top Level", "foafiaf:categories": "Scorecard", "skos:related": "", "skos:inScheme": "foafiaf:Scorecard_0", "foafiaf:Parent": "", "skos:broader": "", "skos:narrower": "", "foafiaf:polarity": "", "foafiaf:timeperiodtype": "", "foafiaf:unitofmeasure": "", "foafiaf:targetvalue": "", "foafiaf:datavalues": "", "foafiaf:datatrend": "", "foafiaf:status": "Cyan", "foafiaf:color": "#00FFFF" }]
                // console.log('_json', _json)

                let _compacted = null;
                let _expanded = null;
                let _flattened = null;
                let _final = null;

                // // compact a document according to a particular context
                jsonld.compact(_json, context, function (err, compacted) {
                    if (err) {
                        console.error('compact err', err)
                    }

                    // console.log(JSON.stringify(compacted, null, 2));
                    _compacted = compacted

                    // console.log('_compacted:', _compacted)


                    // expand a document, removing its context
                    jsonld.expand(compacted, function (err, expanded) {
                        if (err) {
                            console.error('expand', err)
                        }
                        // console.log(JSON.stringify(expanded, null, 2));
                        _expanded = expanded

                        // console.log('_expanded:', _expanded)


                        // flatten a document
                        jsonld.flatten(expanded, (err, flattened) => {
                            if (err) {
                                console.error('flatten', err)
                            }
                            _flattened = flattened

                            // console.log('_flattened:', _flattened)


                            jsonld.compact(_flattened, context, function (err, final) {
                                if (err) {
                                    console.error('compact err', err)
                                }
                                _final = final
                                console.log('_final:', _final)

                                resolve(_final)

                            });
                        });
                    });
                });

                // console.log('_compacted:', _compacted)
                // console.log('_expanded:', _expanded)
                // console.log('_flattened:', _flattened)
                // console.log('_final:', _final)

            }
            catch (e) {
                console.log('catch e error in JSONtoJSONLD ', e);
                reject(e);

            } // end catch
        }); // end promise

    }; // end function JSON2CSV transform

}; // end class JSONtoJSONLD
module.exports = JtoLD

// class User {

//     constructor(name) {
//         this.name = name;
//     }

//     sayHi() {
//         console.log(this.name);
//     }

// }

// let user = new User("John");
// user.sayHi();

const json2jsonld = new JtoLD()
let _jj = [{ "@id": "foafiaf:Scorecard_Top_25", "@type": "skos:Concept", "rdf:type": "sioc:topic", "dbo:type": "foafiaf:Scorecard", "foaf:topic": "Community Transformation Scorecard", "rdfs:label": "Top 25", "dc:title": "A Top 25 Community", "dc:description": "Informs us that are mission is to be a top 25 community", "skos:definition": "", "rdfs:comment": "", "dbo:abstract": "", "foafiaf:keywords": "", "foafiaf:categories": "Scorecard", "skos:related": "", "skos:inScheme": "foafiaf:Scorecard_0", "foafiaf:Parent": "", "skos:broader": "", "skos:narrower": "", "foafiaf:polarity": "Increasing is good", "foafiaf:timeperiodtype": "Quarter", "foafiaf:unitofmeasure": "ROYG", "foafiaf:targetvalue": "1", "foafiaf:datavalues": "", "foafiaf:datatrend": "", "foafiaf:status": "Cyan", "foafiaf:color": "#00FFFF" }, { "@id": "foafiaf:Scorecard_Top Level", "@type": "skos:ConceptScheme", "rdf:type": "sioc:topic", "dbo:type": "foafiaf:Scorecards", "foaf:topic": "Scorecards: Indicator Scorecards", "rdfs:label": "Top Level", "dc:title": "Top Level Indicators", "dc:description": "", "skos:definition": "What does this top level indicator tell us about our transformation; what likey outcome or output does achieving this vision?", "rdfs:comment": "", "dbo:abstract": "", "foafiaf:keywords": "Top Level", "foafiaf:categories": "Scorecard", "skos:related": "", "skos:inScheme": "foafiaf:Scorecard_0", "foafiaf:Parent": "", "skos:broader": "", "skos:narrower": "", "foafiaf:polarity": "", "foafiaf:timeperiodtype": "", "foafiaf:unitofmeasure": "", "foafiaf:targetvalue": "", "foafiaf:datavalues": "", "foafiaf:datatrend": "", "foafiaf:status": "Cyan", "foafiaf:color": "#00FFFF" }]

json2jsonld.transform(_jj)


// const jsonld = require('jsonld');
// const doc = {
//     "http://schema.org/name": "Manu Sporny",
//     "http://schema.org/url": { "@id": "http://manu.sporny.org/" },
//     "http://schema.org/image": { "@id": "http://manu.sporny.org/images/manu.png" }
// };
// const contx = {
//     "name": "http://schema.org/name",
//     "homepage": { "@id": "http://schema.org/url", "@type": "@id" },
//     "image": { "@id": "http://schema.org/image", "@type": "@id" }
// };
// jsonld.toRDF(doc, { format: 'application/nquads' }, function (err, nquads) {
//     // nquads is a string of nquads
//     if (err) console.error(err)
//     if (nquads) console.log('nquads', nquads)
// });
// jsonld.compact(doc, contx, function (err, compacted) {
//     console.log(JSON.stringify(compacted, null, 2));
//     /* Output:
//     {
//       "@context": {...},
//       "name": "Manu Sporny",
//       "homepage": "http://manu.sporny.org/",
//       "image": "http://manu.sporny.org/images/manu.png"
//     }
//     */
// });
