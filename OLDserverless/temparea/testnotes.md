
# Install serverless globally
npm install serverless -g
# Login to your Serverless account
serverless login
# Create a serverless function
serverless create --template hello-world
# Deploy to cloud provider
serverless deploy
# Function deployed! Trigger with live url
http://xyz.amazonaws.com/hello-world

# Test with $ serverless invoke local -f jsonschema2formfield -p data.json --log

# Deploy to AWS with $ serverless deploy --aws-profile default

