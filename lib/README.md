#todo items

# jsonschema2shacl.js
# Read JSON Schema file and and convert to SHACL constraints


# shacljsonschema.js
# Read SHACL constraints and and convert to JSON Schema


# contenttree2jsonform.js

# formfield2contenttree.js
# Read CSV2JSON resulting as JSON of form field definitions and convert to ContentTree.json

# formfield2jsonschema.js
# Read form field definitions JSON and convert to JSON Schema

# jsonschema2formfield.js
# Read JSON Schema file and and convert to form field definitions

# formfield2csv.js

# csv2formfield.js

# jsonform2contenttree.js

# jsonschema2jsonform.js

# owljsonld2jsonschema.js

# jsonschema2owljsonld.js
Read JSON Schema content, validate  and transform into OWL JSON-LD



#translate
Read JSONLD file from things/jsonld and translate into other RDF formats including RDF/XML, n3, ttl, n-triples and JSON-LD Compacted, Expacnded, Flattened then save to one of things/xml, things, n3, things/ttl, things/triples, things/jsonld/flattened, things/jsonld/expanded, things/jsonld/conpacted.
# translateJSONLD XML n3  ttl

owljsonld2webvowl.js

owljsonld2uml.js

jsonld2rdfxml.js

jsonld2ttl.js

rdfxml2jsonld.js

ttl2jsonld.js

ttl2rdfxml.js

rdfxml2ttl.js


<!--retrieveSheet.js    DONE-->
<!--retrieveCSV.js      DONE-->

<!--importSheet.js      WORK-->
<!--importCSV.js        DONE-->

<!--convertJSON.js      DONE-->
<!--combineJSONLD.js    Wrok-->
<!--resolveJSONLD.js-->
<!--translateJSONLD.js-->


refernce https://smart-mirror.io/playground/?example=search/config.schema&repo=evancohen&branch=master


##### formfields2schema
Read form field definitions JSON and convert to JSON Schema

$ node formfield2schema.js filename

##### schema2formfields
Read JSON Schema file and and convert to form field definitions

$ node schema2formfields.js filename



##### formfields2contenttree
Read CSV2JSON result json of form field definitions and convert to ContentTree.json

$ node formfields2contenttree.js filename




### Example URL's
See tutorial page http://acrl.ala.org/techconnect/post/query-a-google-spreadsheet-like-a-database-with-google-visualization-api-query-language
and https://sites.google.com/site/youvisualize/gpp

Display a Google Spreadsheet as an HTML page
https://docs.google.com/spreadsheets/d/1h97g6nOnJILxZiuEk_mriKyAanMluS7ne17szQy2Tps/edit#gid=1269381025

Display a Google Spreadsheet as a JSON document
https://spreadsheets.google.com/tq?&tq=&key=1h97g6nOnJILxZiuEk_mriKyAanMluS7ne17szQy2Tps&gid=2

Display a Google Spreadsheet as a CSV document
http://spreadsheets.google.com/tq?tqx=out:csv&key=1h97g6nOnJILxZiuEk_mriKyAanMluS7ne17szQy2Tps

Display a Google Spreadsheet as an independant / simplified HTML page
https://docs.google.com/a/transformrockford.org/spreadsheets/d/1h97g6nOnJILxZiuEk_mriKyAanMluS7ne17szQy2Tps/gviz/tq?tqx=out:html&tq&gid=2

Display result of Google Visualization API Query Language
https://docs.google.com/a/transformrockford.org/spreadsheets/d/1h97g6nOnJILxZiuEk_mriKyAanMluS7ne17szQy2Tps/gviz/tq?tqx=out:html&tq=SELECT+B,+C,+D,+F+WHERE+C+CONTAINS+%27Jake%20Wilson%27


### Masetr Data functions

#### Amazon S3 File Publishing

##### s3_config function

##### s3_listbuckets function

##### s3_objects function

##### s3_upload function


#### Google Sheet Master Data

##### retrieveSheet
Retrieve Google Sheet from Drive as JSON and save into local filepath things/sheet.
$ node retrieveSheet.js ENTITY_TYPE
$ node retrieveSheet.js 

$ node retrieveCSV.js 

##### importSheet
Import Google Sheet JSON from local filepath things/json, transform spreadsheet cells into tuple, save into local filepath things/json
upsertSheet.
$ node importSheet.js ENTITY_TYPE
$ node importSheet.js 

$ node importCSV.js ENTITY_TYPE


##### upsertSheet

##### getRow
##### putRow
##### deleteRow
##### addRow


#### JSON-LD Graph

##### transformRDF function

##### convertJSON
Read JSON from things/json then convert JSON format to JSONLD format, save into local filepath things/jsonld.
Cleanup 

$ node convertJSON.js ENTITY_TYPE
$ node convertJSON.js

$ node convertCSV.js


#### combineJSONLD
Combine multiple JSONLD files read from things/jsonld (resolve/other func?), save as new filename in things/jsonld.
$ node combineJSONLD OUTFILENAME ENTITY_TYPE ENTITY_TYPE ENTITY_TYPE ...
$ node combineJSONLD OUTFILENAME -all
$ node combineJSONLD

#### resolveJSONLD
Read JSONLD and run resolution of entities and ...
$ node resolveJSONLD ENTITY_TYPE
$ node resolveJSONLD 

#### translateJSONLD
Read JSONLD file from things/jsonld and translate into other RDF formats including RDF/XML, n3, ttl, n-triples and JSON-LD Compacted, Expacnded, Flattened then save to one of things/xml, things, n3, things/ttl, things/triples, things/jsonld/flattened, things/jsonld/expanded, things/jsonld/conpacted.
$ node translateJSONLD XML n3  ttl

#### appendGraph
