'use strict'
const fs = require('fs');
const path = require('path');
const jsonld = require('jsonld');
//var rdflib = require('rdflib');
const utilsFil = require('./utilsFil.js');
const utilsGen = require('./utilsGen.js');
const utilsCon = require('./utilsCon.js');
// **
// 
//
// resolveDataset
//
// combineDatasets
//ss
//**





exports.resolveDataset = function (jsonld, cb) {
    console.log('resolveDataset')
    
    let myJSONLD = {} ;
    let myGraph = []
    let myContext = []
    let myID = null;
        
    let objGraph = jsonld['@graph'];
    let objContext = jsonld['@context'];
    let objId = jsonld['@id']; 
    //console.log('objId',objId)
    myID = objId;
    //console.log('myID',myID)
    
    var cursorTasks = 1 //objGraph.length                         //files.length; // This will decrement for each file then callback
    function cursorTaskComplete() {
            cursorTasks--;
            //console.log(cursorTasks)
            if (cursorTasks <= 0) {

                let myJSONLD = { 
                    '@graph' : myGraph,
                    '@id' : myID,
                    '@context' : myContext
                };
                console.log('resolved myJSONLD["@id"]', myJSONLD["@id"])
                //console.log('myJSONLD', myJSONLD)
                cb(null, myJSONLD);
            }
    } // end cursorTaskComplete 
    
    function doResolve(cb) { 
        console.log('doResolve')
     
        //var objGraph = jsonld['@graph'];
        //var objContext = jsonld['@context'];
        //console.log('objContext ', objContext)
       
        // loop over items in graph
        console.log('objGraph.length ', objGraph.length)
        for (let g = 0; g < objGraph.length; ++g) {
            //console.log('g ', g)
            let objItem = objGraph[g];
            //console.log('objItem ', objItem)
            let objId = objItem['@id'];
            
            // look for properies with Inverse partner property
            for(let property in objItem) {
                //console.log("property ", property)
                
                if (property === 'org:postIn') {
                    //console.log('property ', property)
                    let inverse = 'org:hasPost'
                    // call function passing in property, inverse and objItem
                    processEntities (property, inverse, objItem)
                } // end if 'org:postIn' 
            
                if (property === 'org:hasPost') {
                    //console.log('property ', property)
                    let inverse = 'org:postIn'
                    // call function passing in property, inverse and objItem
                    processEntities (property, inverse, objItem)
                } // end if 'org:hasPost'
                
                if (property === 'org:holds') {
                    //console.log('property ', property)
                    let inverse = 'org:heldBy'
                    // call function passing in property, inverse and objItem
                    processEntities (property, inverse, objItem)
                } // end if 'org:postIn' 
            
                if (property === 'org:heldBy') {
                    //console.log('property ', property)
                    let inverse = 'org:holds'
                    // call function passing in property, inverse and objItem
                    processEntities (property, inverse, objItem)
                } // end if 'org:hasPost'
                
                if (property === 'org:hasUnit') {
                    //console.log('property ', property)
                    let inverse = 'org:unitOf'
                    // call function passing in property, inverse and objItem
                    processEntities (property, inverse, objItem)
                } // end if 'org:postIn' 
            
                if (property === 'org:unitOf') {
                    console.log('property ', property)
                    let inverse = 'org:hasUnit'
                    // call function passing in property, inverse and objItem
                    processEntities (property, inverse, objItem)
                } // end if 'org:hasPost'
                
            } // look for properies with Inverse
            
            
            function processEntities (property, inverse, _objItem) {
                let _objId = _objItem['@id'];
                // select or loop though foafiaf entities of property
                if ( (typeof _objItem[property]) === 'string') {		        // check if property value is a string ie. a single entry
			        let propVal = _objItem[property] || null ;
			        //console.log('propVal', propVal)
			        if (propVal != null) {
				        //if foafiaf entity shown in post in then update with inverse
				        if ( propVal.indexOf('foafiaf:') !== -1 ) {
				            //console.log('entity property entity', objId, property, propVal)
				            updateEntity(propVal, inverse, objId)
				        }
			        }
                } //end if 'string'
			    if ( Array.isArray(objItem[property]) ) {                       // check if property value is array
				    for (let k = 0; k < objItem[property].length; k++) {
				        //console.log('k ', k)
                        
                        let propVal = objItem[property][k] || null ;
                        //console.log('k propVal', propVal)
                        if ( (propVal != null) && ((typeof _objItem[property]) === 'string') ) {
				            //if foafiaf entity shown in property then update with inverse
				            if ( propVal.indexOf('foafiaf:') !== -1 ) {
				                //console.log('entity property entity', objId, property, propVal)
				                updateEntity(propVal, inverse, objId)
				            }
			            }
				    }
				} // end if array
            
                return 
            } // end of process entities function
            
            
            
        } // end loop over items in graph
        
        
        
        function updateEntity(source, property, target) {  
            //console.log('updateEntity')
           // console.log('source, property, target:', source, property, target)
        	
        	// find item in objGraph with the doutvr entity id
        	for (let q = 0; q < objGraph.length; ++q) {
        	    //console.log('q ', q)
                let objEntity = objGraph[q];
                let objId = objEntity['@id'];
                if (objId === source) {	            
                    //console.log('objEntity', objEntity)
                    objGraph[q] = spliceProperty(q, objEntity, property, target) ;
                    //console.log('objGraph[q]', objGraph[q])
                }
        	}
        }              
        function spliceProperty(num, entity, property, value) {
           // console.log('spliceProperty')
            //console.log("num, entity, property, value:", num, entity['@id'], property, value)
            
            for(let prop in entity) {
                //console.log("prop ", prop)
                
                // check for Inverse property in entity item
                // if it does check for array or string value then added new value
                // if does not add property with collection array
                let newProp = []
                if (prop === property) {
                    //console.log("prop ", prop)
                    
                    if ( Array.isArray(objItem[property]) ) {                   // check if property value is array
					    newProp = objItem[property] ;
					
                    } else {
                        let propVal = entity[prop] || null ;
                        newProp = [ propVal ] ;
                    }
                    
                    // add obejct entity id to other entity property array
                    newProp.push(value)

                } else {
                    newProp = [ value ] ;
                    
                }
                
                entity[property] = newProp ;
                //console.log("num, entity['@id'] entity[property] : ", num, entity['@id'], entity[property])
                return entity           
                
            }
        }       
        
        //console.log('objGraph', objGraph)
        
        myID = objId;
        myGraph = objGraph;
        myContext = objContext;
        //...when async operation is complete call
        cursorTaskComplete()
    
    }; 
    
    //call do resolve
    doResolve(cb)
    
    //if (cb) cb(null, myJSONLD);
}


exports.combineJSONLD = function (arrayJSONLD, cb) {
    console.log('combineJSONLD')
    
    let myJSONLD = {} ;
    let myGraph = []
    let myContext = []
    let myID = null;
    
    
    let cursorTasks = arrayJSONLD.length                         //files.length; // This will decrement for each file then callback
    function cursorTaskComplete() {
            cursorTasks--;
            //console.log(cursorTasks)
            if (cursorTasks <= 0) {

                let myJSONLD = { 
                    '@graph' : myGraph,
                    '@id' : myID,
                    '@context' : myContext
                };
                //console.log('myJSONLD', myJSONLD)
                
                // now call resolve before sending back
                utilsGen.resolveDataset(myJSONLD, function (err, resolved) {
                    if (err) {
                      console.log('error', err);
                      cb(err);
                    }
                            
                    //console.log('resolved', resolved)
                    myJSONLD = resolved;
                    console.log('myJSONLD["@id"]', myJSONLD["@id"])
                    
                    cb(null, myJSONLD);
                }); 
                
                  
                //cb(null, myJSONLD);
            }
    } // end cursorTaskComplete 
    
    
    function doCombine(cb) {
        console.log('doCombine')
        
        //loop over array of JSONLD objects
        for (let index = 0; index < arrayJSONLD.length; ++index) {
            let content = arrayJSONLD[index];
            
            let _jsonld = content;
            //console.log('jsonld: ', jsonld);
    
            let objId = _jsonld['@id'];
            console.log('objId', objId);
            if (objId != 'urn:x-arq:DefaultGraphNode') {
                myID = objId;
                //console.log('myID', myID);
            }
           
            
            let objGraph = _jsonld['@graph'];
            //console.log('objGraph ', objGraph)

            for (let g = 0; g < objGraph.length; ++g) {
                let _objItem = objGraph[g];
                //console.log('objItem ', objItem)
                 
                if ( objectPropInArray( myGraph, '@id', _objItem['@id'] ) ) { 
                    
                    //console.log('myGraph: ', myGraph)
                    //
                    // if item alread exists, need to merge objects
                    //
                    let newId = _objItem['@id']
                    let newItem = _objItem;
                    //console.log(' Item exists with new ID', newId)
                    
                    // get old item
                    let oldItem = {};
                    let idx = 0;
                    let m = null;
                    for(idx = 0, m = null;  idx < myGraph.length; ++idx) {
                        //console.log(myGraph[idx])
                        if (myGraph[idx]) {
                            if(myGraph[idx]['@id'] == newId) {
                                oldItem = myGraph[idx];
                                break;
                            }
                        }
                    };
                    //console.log(' existing Item ID: ', oldItem['@id']) 
                      
                    // get list of properties from old and new objects
                    let keys = [];
                    for(let key in oldItem) { keys[key] = key };   
                    for(let key in newItem) { keys[key] = key }; 
                    //console.log(keys)
                    
                    //
                    // compare and merge old and new items 
                    //
                    let listProps = keys;
                    let mergeItem = {}; 
                    
                    //console.log('  Looping though properties of new and old items')
                    for(let key in listProps) { 

                        let myProp = listProps[key];
                        //console.log('  ', myProp)
                        
                        // get old and new property value objects
                        let oldObj = oldItem[myProp] || null;
                        let newObj = newItem[myProp] || null;
                        //console.log('  oldObj ', oldObj)
                        //console.log('  newObj ', newObj)
                        
                        // compare old and new propery value objects
                        if (oldObj == newObj) {
                            // if the obejcts are the same use old object in merge
                            //console.log('   property value same in old and new ')
                            mergeItem[myProp] = oldItem[myProp];
                                
                        } else {
                            // if they are different need pick which one to use
                            
                            let inOld = (myProp in oldItem);
                            let inNew = (myProp in newItem);
                            //console.log('inOld ', inOld)
                            //console.log('inNew ', inNew)
                            // NEED TO ADD LOGIC FOR ARRAYS
                            if ( inOld && inNew ) {
                                // if both exists then ccompare details
                                //console.log('   property exists in old and new ')
                                //console.log('oldObj ', oldObj)
                                //console.log('newObj ', newObj)
                                
                                let oldnewVal = [];
                                // check for prop val not null then concat to merged
                                if (oldItem[myProp]) {
                                    oldnewVal = oldnewVal.concat(oldObj);
                                }
                                if (newItem[myProp]) {
                                    oldnewVal = oldnewVal.concat(newObj);
                                }
                                // if (oldObj instanceof Array) {
                                //     console.log("oldObj is array")
                                //     oldnewVal.push.apply(oldnewVal, oldObj)
                                // } else {
                                //     // check if exists in list else add it
                                //     oldnewVal.push(oldObj);
                                // }
                                // if (newObj instanceof Array) {
                                //     console.log("newObj is array")
                                //     //oldnewVal.push.apply(oldnewVal, newObj)
                                //     oldnewVal = oldnewVal.concat(newObj);
                                // } else {
                                //     //oldnewVal.push(newObj);
                                //     oldnewVal = oldnewVal.concat(newObj);
                                // }
                                
                                mergeItem[myProp] = oldnewVal;
                                
                                
                            } else if (inOld) {
                                // if objectsd are different and old exists use it
                                //console.log('   property exists in old ')
                                mergeItem[myProp] = oldItem[myProp]; 

                              
                            } else if (inNew) {
                                // if objectsd are different and new exists use it
                                //console.log('   property exists in new ')
                                mergeItem[myProp] = newItem[myProp];
 
                            }
                        };

                    } //end for
                    //console.log(' mergeItem: ', mergeItem)
                    
                    //
                    //change item in combined graph to merged item
                    //
                    //delete myGraph[idx];
                    //myGraph.push(mergeItem);
                    myGraph.splice( idx, mergeItem );
                    //console.log('merged objItem', mergeItem['@id'])
                    
                } else {
                    // if item does not currently exist in graph, add item
                    //console.log('new objItem', objItem['@id'])
                    myGraph.push(_objItem)
                };
            };
            
            
            let objContext = _jsonld['@context'];
            //console.log('objContext ', objContext)
           
            for (let key in objContext) {
                if (objContext.hasOwnProperty(key)) {
                    let objElement = {};
                    //console.log(key);
                    objElement[key] = objContext[key] ;
                    //console.log('objElement ', objElement)
                    
                    
                    if ( objectPropInArray( myContext, key, objElement[key] ) ) { 
                        //console.log('element with key exists -> ', key)
                
                    } else {
                        // if element does not current exist in content, add element
                        //console.log('element with key is new -> ', key)
                        myContext.push(objElement)
                    };
                
                    //myContext.push(objElement)
                        
                } // end hasOwnProperty 
            } // end for key

     
            //...when async operation is complete call
            cursorTaskComplete() 
        };
 
    }; 
    
    //call do combine
    doCombine(cb)
    
    //if (cb) cb(null, myJSONLD);
}


function objectPropInArray(list, prop, val) {
  if (list.length > 0 ) {
    for (let i in list) {
      if (list[i][prop] === val) {
        return true;
      }
    }
  }
  return false;  
}