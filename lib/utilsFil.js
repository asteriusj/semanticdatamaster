'use strict'
const fs = require('fs');
const path = require('path');


// **
// 
// getFileContent
// putFileContent
//
// readSheetfile
// writeSheetfile
//
// readCSVfile
// writeCSVfile
//
// readJSONfile
// writeJSONfile
//
// readJSONLDfile
// writeJSONLDfile
//
//**

exports.getFileContent = function(filePath, cb) {
    console.log('getFileContent')
    console.log('filePath', filePath)
  try {
    
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        
        if (err) {
            console.log('error', err);
            if (cb) cb(err);
		    return;
        }
        
        //console.log(data);
        if (cb) cb(null, data);
    });
    
  } catch(e) {
	  console.log(e);
  }
}

exports.putFileContent = function (content, filePath, cb) {
    
  try {
    
    fs.writeFile(filePath, content, {encoding: 'utf-8'}, function(err,data){
        
        if (err) {
            console.log('error', err);
            if (cb) cb(err);
		    return;
        }
        
        //console.log('putFileContent', filePath + ' <- ' + data);
        if (cb) cb(null, data);
    });
    
  } catch(e) {
	  console.log(e);
  }
}

exports.readSheetfile = function (_type, cb) {
    console.log('readSheetfile ', _type)
    let folder = path.join(__dirname, '../../public/things/sheet/.');
    let file = '' + _type + '' + '.json';
    let filepath = path.join(folder, file);
    console.log('filepath ', filepath);
    fs.readFile(filepath, {encoding: 'utf-8'}, function(err, data){
        if (err) throw err;
        //console.log('data:', data);
        if (cb) cb(null, data);
    });
};

exports.writeSheetfile = function(_JSON, _type, cb) {
    console.log('writeSheetfile ')
    let folder = path.join(__dirname, '../../public/things/sheet/.');
    let file = '' + _type + '' + '.json';
    let filepath = path.join(folder, file);
    //console.log('filepath ', filepath);
    fs.writeFile(filepath, _JSON, function(err) {
        if (err) throw err;
        console.log('file saved ', filepath);
    });
};

exports.readCSVfile = function (_type, cb) {
    console.log('readCSVfile ', _type)
    let folder = path.join(__dirname, '../../public/things/csv/.');
    let file = '' + _type + '' + '.csv';
    let filepath = path.join(folder, file);
    console.log('filepath ', filepath);
    fs.readFile(filepath, {encoding: 'utf-8'}, function(err, data){
        if (err) throw err;
        //console.log('data:', data);
        if (cb) cb(null, data);
    });
};

exports.writeCSVfile = function(_CSV, _type, cb) {
    console.log('writeCSVfile ')
    let folder = path.join(__dirname, '../../public/things/csv/.');
    let file = '' + _type + '' + '.csv';
    let filepath = path.join(folder, file);
    //console.log('filepath ', filepath);
    fs.writeFile(filepath, _CSV, function(err) {
        if (err) throw err;
        console.log('file saved ', filepath);
    });
};


exports.readJSONfile = function(_type, cb) {
    console.log('readJSONfile ')
    
        
    try {
        
        let folder = path.join(__dirname, '../../public/things/json/.');
        let file = '' + _type + '' + '.json';
        let filepath = path.join(folder, file);
        console.log('filepath ', filepath);
        fs.readFile(filepath, {encoding: 'utf-8'}, function(err, data){
            if (err) throw err;
            //console.log('data:', data);
            if (cb) cb(null, data);
        });
            
    }
    catch(e) {
        console.log('catch error readJSONfile', e);
        //cb(e);
       //return 
    } 
};

exports.writeJSONfile = function(_JSON, _type, cb) {
    console.log('writeJSONfile ')
    let folder = path.join(__dirname, '../../public/things/json/.');
    let file = '' + _type + '' + '.json';
    let filepath = path.join(folder, file);
    //console.log('filepath ', filepath);
    fs.writeFile(filepath, _JSON, function(err) {
        if (err) throw err;
        console.log('file saved ', filepath);
    });
};


exports.readJSONLDfile = function(_type, cb) {
    console.log('readJSONfile ')
    let folder = path.join(__dirname, '../../public/things/jsonld/.');
    let file = '' + _type + '' + '.jsonld';
    let filepath = path.join(folder, file);
    console.log('filepath ', filepath);
    fs.readFile(filepath, {encoding: 'utf-8'}, function(err, data){
        if (err) throw err;
        //console.log('data:', data);
        if (cb) cb(null, data);
    });
};

exports.writeJSONLDfile = function(_JSONLD, _type, cb) {
    console.log('writeJSONLDfile ')
    let folder = path.join(__dirname, '../../public/things/jsonld/.');
    let file = '' + _type + '' + '.jsonld';
    let filepath = path.join(folder, file);
    //console.log('filepath ', filepath);
    //console.log('_JSONLD ', _JSONLD);
    fs.writeFile(filepath, _JSONLD, function(err) {
        if (err) throw err;
        console.log('file saved ', filepath);
    });
};
