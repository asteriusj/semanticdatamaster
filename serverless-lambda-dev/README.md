# Semantic Data Services
Sematic Data Services are operational function utilities that facilitate a Semantic Data Master (SDM) implementation.

## [Semantic Data Master (SDM) - Next Gen MDM](https://medium.com/@jeffreystewart/semantic-data-master-sdm-next-gen-mdm-749563253a96)

Semantic Data Master (SDM) is a proof of concept (POC) of JavaScript processes that enables JSON Forms automated form building via JSON Schema definitions derived from Web Ontology Language (OWL) ontology business models.

SDM is simple, business-oriented definition of a data architecture as part of a larger Digital Product Master (DPM) It provides a single, coherent view of data and relationships at the core of a digital product.

The components define a Data Model of how application systems are integrated together and how data flows between Tools and Teams. A SDM provides a canonical model for an enterprise architecture. A Data Model has three perspectives which are represented in SDM with:

 * A Conceptual view is provided by the OWL ontological representation of the business entities and their relationships
 * A JSON Schema representing Logical view of how entities are connected together via properties, constraints and restrictions
 * A Physical view of as realized via JSON Forms touchpoints and data store functionality

Together these views of a model “explicitly determines the structure of data”. They provide specification of business entities in a Business Model and the data relationships, semantics and constraints that support Process Model application integrations.


## Transform services

### jsonschema2shacl.js
Read JSON Schema file and and convert to SHACL constraints


### shacljsonschema.js
Read SHACL constraints and and convert to JSON Schema


### owljsonld2jsonschema
Read OWL JSON-LD content, validate  and transform into JSON Schema


### jsonschema2owljsonld
Read JSON Schema content, validate  and transform into OWL JSON-LD


### formfield2jsonschema
Read form field definitions JSON and convert to JSON Schema


### jsonschema2formfield
Read JSON Schema file and and convert to form field definitions


### jsonschema2jsonform


### jsonform2contenttree
Read json form definitions schema and convert to ContentTree formated field values

### contenttree2jsonform
Read ContentTree formated field values and convert to json form values

### formfield2contenttree
Read CSV2JSON resulting as JSON of form field definitions and convert to ContentTree.json

### contenttree2formfield



### formfield2csv


### csv2formfield



## Translate services
Read JSONLD file from things/jsonld and translate into other RDF formats including RDF/XML, n3, ttl, n-triples and JSON-LD Compacted, Expanded, Flattened then save to one of things/rdfxml, things/n3, things/ttl, things/triples, things/jsonld/flattened, things/jsonld/expanded, things/jsonld/conpacted .

### jsonld2rdfxml


### jsonld2ttl


### owljsonld2webvowl


### owljsonld2uml


### rdfxml2jsonld


### ttl2jsonld


### ttl2rdfxml


### rdfxml2ttl


## Enhance services
Read JSONLD file from things/jsonld and append enhanced information in the form of metadata, semantic linked open data, and congnative computing services. 

### jsonmetadata
Enhance JSON structure with metadata for _id, _etag, _guid, _kind _datepublished

### dbpedialookup
Retrieve semantic linked open data properties from matching DBPedia entry 



## GSheet services
Operations involving Google Sheets containing semantic entities