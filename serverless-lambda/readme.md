###
### Todo
###



#
# Workspace preperation

### Upgrade node and NPM
nvm install 8.1


### Install serverless globally
npm install serverless -g

### Create a serverless function
serverless create --template aws-nodejs

### Test stack locally
serverless invoke local  -f dbpedialookup --data '{"string":"Linked data"}' --log true

### Test remote
serverless logs -f dbpedialookup -t
serverless invoke local  -f dbpedialookup --data '{"string":"Linked data"}'
