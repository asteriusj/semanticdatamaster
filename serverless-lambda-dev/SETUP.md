###
### Todo
###

* check for array properties and select based on 'en' not just [0]
* 

#
# Workspace preperation

### Upgrade node and NPM
nvm install 10
nvm alias default 10  ????


### Install serverless globally
npm install serverless -g

### Create a serverless function
serverless create --template aws-nodejs





### AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are now available for serverless to use
serverless deploy


### Test stack locally
serverless invoke local  -f csv2json  
serverless invoke local  -f json2csv --data '{"body":{x:2,id:"xyz"}}' --log true 
serverless invoke local  -f jsonmetadata
serverless invoke local  -f dbpedialookup --data '{"string":"Linked data"}' --log true
serverless invoke local  -f getGSheet --data '{"sheetid":"X-Y-Z","alt":"json"}' --log true
   
<!--'{ '@id': 'schema:director', rangeIncludes: 'schema:Person' }-->

### Test remote
serverless logs -f dbpedialookup -t
serverless invoke local  -f dbpedialookup --data '{"string":"Linked data"}'

### github
### https://help.github.com/articles/accessing-github-using-two-factor-authentication/#using-two-factor-authentication-with-the-command-line
### https://github.com/settings/tokens
$ git add <folders and files>
$ git commit -m "Update messages"
$ git push https://github.com/asteriusj/semanticdatamaster
Username for 'https://github.com': asteriusj
Password for 'https://asteriusj@github.com': c116a389977f7259ce65cd0d6c6f29926192943a             //use personal access token

or
git push git@github.com:asteriusj/semanticdatamaster
