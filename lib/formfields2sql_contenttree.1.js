console.log('formfielddef2contenttree.js loading...')
'use strict'
const request = require("request")
const fs = require('fs');
const path = require('path');

const json = require('json-promise');
//const {IsJSON} = require("is-json-promise/safe"); 


//var models = require('../../models');
const utilsFil = require('./utilsFil.js');
const utils = require('./utils.js');

const defaultLocation = "../csv/";
const defaultInfile = "formfielddefs.json";
const defaultOutfile = "outContentTree.json";

let etype = process.argv[2] || null;

if (etype) {

    let _type = defaultLocation + etype;
    getJSONsaveContentTree(_type, function () {})

}
else {

    let _type = defaultLocation + defaultInfile;
    getJSONsaveContentTree(_type, function () {})

}


function getJSONsaveContentTree(etype, cb) {
    console.log('getJSONsaveContentTree', etype)

    try {

        var _type = etype;
        //console.log('_type', _type)

        // open field field defs csv/json file and process rows / records
        utilsFil.getFileContent(_type, function (err, _json) {
            console.log('read in json file ')
            if (err) {
                console.log('getFileContent error', err);
                //cb(err);
            }
            let _JSON = _json;
            json.stringify(_json)
                .then(function onStringify(_json) {
                    _JSON = _json;
                })
                .catch(function onStringifyError(e) {
                    // is already a json string?
                    //let _JSON = _json; 
                });
            // console.log('_JSON:', _JSON);   


            // process each form field def records
            console.log('FormFieldDefJSONtoContentTree entry')
            let NODES = [];
            let TREE = [{}];
            try {

                var objArray = JSON.parse(_JSON)
                var numrec = objArray.length;
                // console.log("objArray,length ",  objArray.length)


                for (var i = 0; i < objArray.length; i++) {
                    // for (var i=0; i<4; i++) {

                    let obj = objArray[i]
                    // console.log('i obj',i, obj);

                    let _rec = {};
                    let _prop = {};

                    if (obj['content map']) _rec.contentmap = obj['content map'];
                    if (obj['id']) _rec.id = obj['id'];
                    if (obj['name']) _rec.name = obj['name'];
                    if (obj['label']) _rec.label = obj['label'];
                    if (obj['dbo']) _rec.dbo = obj['dbo'];
                    if (obj['default']) _rec.default = obj['default'];

                    let maparr = _rec.contentmap.split(".") || null;
                    _rec.me = maparr[maparr.length - 1] || null;
                    _rec.parent = maparr[maparr.length - 2] || null;
                    _rec.parentminus1 = maparr[maparr.length - 3] || null;
                    _rec.parentminus2 = maparr[maparr.length - 4] || null;
                    _rec.parentminus3 = maparr[maparr.length - 5] || null;

                    // console.log("_rec",_rec)

                    // create _rec of node and push into NODES array
                    NODES.push(_rec)

                }; // end for each row / rec

            }
            catch (e) {
                console.log('catch e error in FormFieldDefJSONtoContentTree ', e);
                if (cb) cb(e);
                //return 

            }
            finally {

                //  console.log('NODES',NODES)
                makeTreeRoots(NODES, function (data) {
                    //  console.log('data',data)
                    TREE = data;

                    makeTreeNodes(NODES, TREE, function (results) {
                        // console.log('results',results)
                        TREE = results;

                        //
                        // OUTPUT RESuLTING CONTENT TREE
                        // 
                        let _content = JSON.stringify(TREE);
                        let _filepath = defaultLocation + defaultOutfile;;
                        utilsFil.putFileContent(_content, _filepath, function (err, _json) {
                            console.log('write out json file ')
                            if (err) {
                                console.log('putFileContent error', err);
                                //cb(err);
                            }

                        }); // end putFileContent



                    });

                });
                //  console.log('JSON.stringify(TREE)',JSON.stringify(TREE))

            }; //end FormFieldDefJSONtoContentTree     



            // create root elements for each content map tree roots
            function makeTreeRoots(nodes, cb) {
                console.log('makeTreeRoots')
                let _tree = {};
                nodes.forEach(
                    function (_node) {
                        // console.log('_node',_node)
                        let _me = _node.me;
                        let _pm0 = _node.parent;
                        let _pm1 = _node.parentminus1;
                        let _pm2 = _node.parentminus2;
                        let _pm3 = _node.parentminus3;
                        // console.log('_pm3 _pm2 _pm1 _pm0 _me',_pm3,_pm2,_pm1,_pm0,_me)

                        if (_pm3 != null) {

                            if (!_tree[_pm3]) {
                                _tree[_pm3] = {};
                            }
                            if (!_tree[_pm3][_pm2]) {
                                _tree[_pm3][_pm2] = {};
                            }
                            if (!_tree[_pm3][_pm2][_pm1]) {
                                _tree[_pm3][_pm2][_pm1] = {};
                            }
                            if (!_tree[_pm3][_pm2][_pm1][_pm0]) {
                                _tree[_pm3][_pm2][_pm1][_pm0] = {};
                            }
                            if (!_tree[_pm3][_pm2][_pm1][_pm0][_me]) {
                                _tree[_pm3][_pm2][_pm1][_pm0][_me] = {};
                            }

                        }
                        else if (_pm2 != null) {

                            if (!_tree[_pm2]) {
                                _tree[_pm2] = {};
                            }
                            if (!_tree[_pm2][_pm1]) {
                                _tree[_pm2][_pm1] = {};
                            }
                            if (!_tree[_pm2][_pm1][_pm0]) {
                                _tree[_pm2][_pm1][_pm0] = {};
                            }
                            if (!_tree[_pm2][_pm1][_pm0][_me]) {
                                _tree[_pm2][_pm1][_pm0][_me] = {};
                            }

                        }
                        else if (_pm1 != null) {

                            if (!_tree[_pm1]) {
                                _tree[_pm1] = {};
                            }
                            if (!_tree[_pm1][_pm0]) {
                                _tree[_pm1][_pm0] = {};
                            }
                            if (!_tree[_pm1][_pm0][_me]) {
                                _tree[_pm1][_pm0][_me] = {};
                            }

                        }
                        else if (_pm0 != null) {

                            if (!_tree[_pm0]) {
                                _tree[_pm0] = {};
                            }
                            if (!_tree[_pm0][_me]) {
                                _tree[_pm0][_me] = {};
                            }

                        }


                    } // end function

                ); // end forEach

                // console.log('_tree',_tree)
                if (cb) cb(_tree);
                return _tree
            }; //end makeTreeRoots


            // put content of each node into empy tree elements
            function makeTreeNodes(nodes, tree, cb) {
                console.log('makeTreeNodes')
                let _tree = tree;

                nodes.forEach(
                    function (_node) {
                        // console.log('_node',_node)

                        let _id = _node.id || '';
                        let _name = _node.name || '';
                        let _label = _node.label || '';
                        let _dbo = _node.dbo || '';
                        let _default = _node.default || '';
                        let content = {
                            id: _id,
                            name: _name,
                            label: _label,
                            dbo: _dbo,
                            default: _default
                        }
                        let _me = _node.me;

                        let _pm0 = _node.parent;
                        let _pm1 = _node.parentminus1;
                        let _pm2 = _node.parentminus2;
                        let _pm3 = _node.parentminus3;
                        // console.log('_pm3 _pm2 _pm1 _pm0 _me',_pm3,_pm2,_pm1,_pm0,_me)

                        if (_pm3 != null) { _tree[_pm3][_pm2][_pm1][_pm0][_me] = content; }
                        else if (_pm2 != null) { _tree[_pm2][_pm1][_pm0][_me] = content; }
                        else if (_pm1 != null) { _tree[_pm1][_pm0][_me] = content; }
                        else if (_pm0 != null) { _tree[_pm0][_me] = content; }
                        else { _tree[_me] = content; }

                    } // end function

                ); // end forEach

                // console.log('_tree',_tree)
                if (cb) cb(_tree);
                return _tree
            }; //end makeTreeNodes


        }); // end getFileContent


    }
    catch (e) {
        console.log('catch error getJSONsaveContentTree', e);
        cb(e);
        //return 
    }

};
