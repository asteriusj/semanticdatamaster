https://github.com/serverless/serverless

https://github.com/bishbashbosh123/lambda-example

https://medium.com/the-reading-room/how-to-create-a-simple-rest-web-service-with-node-aws-lambda-and-the-serverless-framework-4730c88cd39a


How to create a simple REST web-service with Node, AWS Lambda and the Serverless Framework

In this article I will explain how to create a REST web-service that is written with Node.js and deployed to AWS Lambda λ. I’m also going to use the Serverless Framework ⚡ to make the deployment really easy.

TL;DR: Write some JavaScript function to be called (your service), write a function to handle the HTTP request which looks like this, create a small serverless.yaml file and run serverless deploy. Voila, cloud code.

Example code: https://github.com/bishbashbosh123/lambda-example/
Services upon services

What better way to use this powerful microservice platform than to create a service that just calls another service 😁 In this case I’m going to create a REST web-service that gets e-mails from an e-mail server (classic POP3) and allows you to send mail. It’s practically useless, but I like the idea of POSTing an e-mail.

What I want at the end of this is to have a lovely scalable fault-tolerant web-service with these end-points:

GET /emails To get a list of e-mails in your inbox (header details)
GET /emails/{index} To get a particular e-mail (body and all)
POST /emails To send an email

…which accept and return JSON.

AWS Lambda functions can only be invoked/triggered via another AWS service. For example, they can be triggered by a document added to a DynamoDB or an S3 event, or something to be processed on an SQS queue. But what we want to do is process requests sent to an HTTP endpoint, which we can create in the AWS API Gateway.

The API Gateway can allow you to configure the allowed structure of requests sent to endpoints, allowing the gateway to validate them for you, provide error responses, HTTP response codes etc. This requires a lot of configuration. However, to simplify things and allow you to handle all of that in your application instead, AWS introduced ‘Proxy Integration’ to the API Gateway. This means you can now choose the option of “Configure as proxy resource” and the whole HTTP request will get sent to your Lambda function. In turn, your function must return not only the response content, but the HTTP status code and any headers you want to return. The gateway does as little as possible.
JavaScript stuff

So I’ve created a JavaScript module (EmailServices.js) that exposes these functions:

    getEmails(): Array [{index, from, subject, date}]
    Returns an array of the latest 10 e-mails sitting on your e-mail server (excluding the body)
    getEmail(index): {from, subject, date, body} 
    Gives you the specified e-mail
    sendEmail({from, to, subject, body}) 
    Sends an e-mail

…and I like it so much that I want to open it up to the world. I will use the Serverless framework to help me achieve that.
Serverless.yaml

The first thing to do when using the Serverless Framework is to create a serverless.yaml. This tells it what Lambda functions you want, what events you want to trigger them (e.g. http, s3, schedule), what HTTP methods you want to use, what AWS security group to put them into, etc. The options offered to you for this file are explained a bit here and very comprehensively here, but this is a very minimal one:

# Serverless definition file
# — — — — — — — — — — — — —
# Defines Lambda functions to be deployed to AWS using the Serverless Framework.
# http://serverless.com

service: email-services

provider:
    name: aws
    runtime: nodejs6.10
    region: eu-west-2
    memorySize: 128
    timeout: 30
    environment: ${file(env.yml):${self:provider.stage}}

functions:
    getEmail:
        handler: lambdahandlers.getEmail
        events:
            - http:
                path: emails/{id}
                method: get
                cors: 
                    origins:
                        - ‘*’

[My one in full]

In the provider section you specify the environment we want to deploy to. One of the great features of the Serverless Framework is the abstraction it gives you across different platforms. This is a clever solution to make your choice of platform less important; If Azure turns out to be more cost effective in a years time, it’s nice to have that switch option without much pain.
Environment variables

It’s worth noting the environment bit in that YAML:

environment: ${file(env.yml):${self:provider.stage}}

This is a way of providing some environment variable values for our deployed code. That line is telling Serverless to insert values from a file called env.yml (example), specifically the object within that file named after our ‘deployment stage’. Whenever we deploy code to AWS with Serverless it will deploy it to a particular ‘stage’. The default is ‘dev’. This is a mechanism used in API Gateway and Serverless to help organise the different deployment stages of your project. You may have Production, QA, UAT, and wish to deploy code to each of those environments separately. So in my project I have a file called env.yml that contains YAML like this:

# — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — -
# Environment variables
# — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — -
dev:
  EMAIL_POP3_HOST: “pop.gmail.com”
  EMAIL_POP3_USERNAME: “me@gmail.com”
  EMAIL_POP3_PASSWORD: “blahblahblahblah”
  EMAIL_POP3_PORT: 995
  EMAIL_POP3_TLS: true
  EMAIL_SMTP_HOST: “smtp.gmail.com”
  EMAIL_SMTP_USERNAME: “me@gmail.com”
  EMAIL_SMTP_PASSWORD: “blahblahblahblah”
  EMAIL_SMTP_PORT: 465
  EMAIL_SMTP_TLS: true

(It’s not committed to GitHub repo, so if you are playing along, you’ll need to write your own)

These values will be applied as environment variables within the Lambda process. I’ll use those variables later to configure the EmailServices module.
Lambda handlers

In the serverless.yaml file, for each Lambda function, you can specify things like the HTTP method to handle (get, post, etc.), origins that the API Gateway should accept requests from (e.g. ‘*’ when you just don’t care) and what the REST endpoint path will look like. You also need to specify a JavaScript function that will handle it. These functions may have the following responsibilities:

    pulling parameters out of the request 
    (event.pathParameters or event.queryStringParameters)
    pulling out the request body (event.body)
    pulling authority headers out of the request, to be checked (event.headers.Authorization)
    creating a response from whatever comes out of your services 
    (e.g. { statusCode:200, headers:{}, body: {} })

In my case, serverless is going to expect to find a JavaScript module lambdaHandlers.js which exports a function called getEmail. Don’t try putting it in a folder and referring to it like handlers/lambda.getEmail or anything like that; It won’t work, so keep it alongside serverless.yaml.

These Lambda handler functions will get called with the following three parameters:

    event — Object containing details about the request (headers, parameters, user-agent etc. — Example)
    context — Object containing details about your lambda function and the environment. (Example)(http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html)
    callback — to be called with your response to be sent back to the client. Because we are using the Proxy mode of the API Gateway, the object we return needs to have a statusCode, headers object and a body.

So I’ve created a file called lambdaHandlers.js and I’ve created functions like this in it:

getEmail : (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  const emailServices = createEmailServices()
  // Get the index parameter out of the event
  const index = event.pathParameters.id
  emailServices.getEmail(index)
  .then(email => {
    // Create a ‘success’ response object containing the e-mail we 
    // got back from emailServices.getEmail()
    callback(null, responses.success(email))
  })
  .catch(error => {
    callback(null, responses.error(error))
  })
}

Worth mentioning…

context.callbackWaitsForEmptyEventLoop — Basically, always set this to false unless you understand the Node.js event loop and are confident that your code and its dependencies don’t leave any setInterval or process.nextTick stuff waiting around. If not, your lambda function will not “complete” (even if you call the callback) and you will receive a timeout error from your lambda function. There used to be a context.succeed() method, but this has been deprecated.

const emailServices = createEmailServices() — This is a function I created to get the environment variables and pass them to EmailServices:

function createEmailServices() {

  // Configure e-mail services
  const emailServices = new EmailServices(
    process.env.EMAIL_POP3_HOST,
    process.env.EMAIL_POP3_USERNAME,
    process.env.EMAIL_POP3_PASSWORD,

...and so on.

So all I need to do in lambdaHandlers.js now is add my other two functions to handle getEmails and sendEmail, plus have a couple of template response objects…

const responses = {
  success: (data={}, code=200) => {
    return {
      'statusCode': code,
      'headers': responseHeaders,
      'body': JSON.stringify(data)
    }
  },
  error: (error) => {
    return {
      'statusCode': error.code || 500,
      'headers': responseHeaders,
      'body': JSON.stringify(error)
    }
  }
}

…and sort out the response headers to allow for cross-origin requests:

const responseHeaders = {
  'Content-Type': 'application/json',
  // Required for CORS support to work
  'Access-Control-Allow-Origin': '*',  
  // Required for cookies, authorization headers with HTTPS
  'Access-Control-Allow-Credentials': true
}

In full: lambdaHandlers.js

Once we have those functions in place then we can first try calling them locally to make sure they behave.
Invoking locally

Install the serverless CLI so we can just call it from the command-line:

npm install -g serverless

…and then use it like this:

serverless invoke local -f getEmail

Append -p 'example.json' if you want to send any parameters or body to your function. The JSON file needs to look something like:

{
  "body": "{\"from\": \"me@gmail.com\",\"to\": \"you@gmail.com\",\"subject\": \"Lambda\",\"body\": \"Just saying.\"}",
  "pathParameters": {},
  "headers": {}
}

Note that the body gets passed in as a string, so you have to (unfortunately) serialise it in the JSON file in one messy line.

If you are happy that your functions handle requests as you see fit, deploy them. Deploy them now.
Deployment

We need to give Serverless some credentials to mess around with our AWS account. There’s a guide here and even a video, but basically…

Create an AWS account if you haven’t already. You then need to go into the IAM section and create a new user for your account that Serverless will use to create your new Lambda and API Gateway services for you. This needs to be a user with ‘programmatic access’ (i.e. a user that uses the AWS API rather than the console webpage). Serverless recommends that you give your new user the full AdministratorAccess policy, which seems excessive. Depending on your paranoia, you can either do this or use the Access Advisor in IAM to narrow down which policies it needs. But it needs a lot of them, so just make a copy (or download the CSV) of the Access Key ID and Secret Access Key and keep them very, very safe somewhere.

There are several ways you can then provide these keys to Serverless. My favourite way is to create a file called credentials (no extension) in a directory called .aws within your home directory. (e.g. C:\Users\LeroyJenkins\.aws\credentials) and add these lines to it:

[serverless]
aws_access_key_id=AKIAKBJIH3WIVA3Q33AF
aws_secret_access_key=Wt67+wkqPXM4n7K9rISLAnPvb8xfH7Nox3jVsB+b

Replace those keys with the access key ID and secret key you made a copy of earlier.

Now get back into your project directory and call this:

serverless deploy --aws-profile serverless

If our plan has come together it should list some endpoints that have been created, like these:

GET — https://1ggbl5kb54.execute-api.eu-west-2.amazonaws.com/dev/emails
GET — https://1ggbl5kb54.execute-api.eu-west-2.amazonaws.com/dev/emails/{index}
POST — https://1ggbl5kb54.execute-api.eu-west-2.amazonaws.com/dev/emails

…boom 💥, serverless code cluttering up the cloud somewhere. A tidy little low cost, fault tolerant microservice. It provides a service nobody wanted, but it is there, just in case.
Troubleshooting

If you do get any problems with your services not doing what you expect, a good place to start is to go into the AWS Console and find:

API Gateway → APIs → <your API> → Stages → <dev, or whatever>

…and Enable CloudWatch Logs for your service. The logs can be found in the CloudWatch part of the AWS Console. Any console.log()/stdout/stderr logs will end up there, just beware the extra costs that can be accrued if you get a lot of logs (currently $0.57 per GB ingested, $0.03 per GB archived per month). Alternatively, in your application use something like Papertrail to write out logs to their service, which is free for up to 100MB.

Let me know how it goes for you.


==================
https://cloudonaut.io/create-a-serverless-restful-api-with-api-gateway-swagger-lambda-and-dynamodb/


Create a serverless RESTful API with API Gateway, Swagger, Lambda, and DynamoDB

This article teaches you how to create a serverless RESTful API on AWS. You will use OpenAPI Specification formerly known as Swagger Specification to define the API and API Gateway in combination with Lambda to implement the API. DynamoDB is used to store the data. The example’s source code is available on GitHub and can be used to speed up your own project.

    If you are interested in describing the API in CloudFormation read Create a serverless RESTful API with API Gateway, CloudFormation, Lambda, and DynamoDB instead!
    If you are interested in deploying the API with the Serverless Framework read Create a serverless RESTful API with the Serverless Framework powered by API Gateway, Lambda, and DynamoDB instead!

Implementing a RESTful API with API Gateway, Lambda, and DynamoDB

API Gateway provides an HTTP API endpoint that is fully configurable. You define the HTTP resources (like /user), the HTTP methods on that resources (like POST, GET, DELETE, …) and the integration (e.g. Lambda function) that should be called to process the request. The Lambda function can then run whatever logic is needed to answer the request. The result of the Lambda function is returned by the API Gateway to the caller. The following figure demonstrates this flow.

API Gateway flow from client request to Lambda and back

If we zoom into the API Gateway component of the previous figure we see what happens inside the API Gateway.

API Gateway internals

If you want to define a REST API you need to specify:

    Resources (e.g. GET /user)
    Methods on each resource (e.g. GET /user)
    Input
        Body Model
        Headers
        Path parameters (e.g. GET /user/:userId)
        Query parameters (e.g. GET /user?limit=10)
    Mapping HTTP input to integration input
    Integrations (e.g. Lambda functions)
    Mapping integration output to HTTP output
    Output
        Body Model
        Headers

You can use a popular framework called Swagger to define a REST API. You will learn how to use Swagger next.
Defining a RESTful API with Swagger

Swagger defines a way to describe your RESTful API in a format like JSON. The cool thing about Swagger is that the API definition can be used by:

    the server that implements the API
    the clients that use the API

Swagger offers a large ecosystem offering powerful tools: you are able to generate client SDKs, visually edit your Swagger definition and use many other helpful tools. A simple Swagger definition that defines what happens if a GET request is sent to resource /user follows:

{
  "swagger": "2.0",
  "info": {
    [...]
  },
  "schemes": ["https"],
  "consumes": ["application/json"],
  "produces": ["application/json"],
  "paths": {
    "/user": {
      "get": {
        "responses": {
          "200": {
            "description": "users retrieved",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/User"
              }
            }
          }
        }
      }
    }
  },
  "definitions": {
    "User": {
      "type": "object",
      "properties": {
        "uid": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      },
      "required": ["uid", "email", "phone"]
    }
  }
}

The Swagger definition also contains definitions to describe the expected input or output in JSON schema notation. With that information, you can define a RESTful API. But how does Swagger work together with API Gateway?
Connecting Swagger with API Gateway

AWS offers a tool to import a Swagger definition into API Gateway. The AWS CLI (version >= 1.10.18) supports importing a Swagger definition into API Gateway. You can also add API Gateway specific information to the Swagger definition by using extensions. The following example makes the connection between the API and the Lambda function.

[...]
"paths": {
  "/user": {
    "get": {
      "responses": {
      },
      "x-amazon-apigateway-integration": {
        "type": "aws",
        "uri": "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/XXX/invocations",
        "responses": {
          "default": {
            "statusCode": "200"
          } 
        }
      }
    }
  }
}
[...]

Have a look at the following example to see the API in action.
Example

The example in this article reuses the multi-user ToDo application from chapter 10 in Amanzon Web Services in Action. You can find the code for the original example in the book’s code repository.

Use Swagger UI to have a look at the REST API definition of this example.
Setting up

Clone the repository:

$ git clone git@github.com:AWSinAction/apigateway.git
$ cd apigateway/

Create the lambda code file (lambda.zip):

$ npm install --production
$ ./bundle.sh

Create an S3 bucket in the US East (N. Virginia, us-east-1) region and upload the lambda.zip file (replace $S3Bucket with a S3 bucket name):

export AWS_DEFAULT_REGION=us-east-1
export S3Bucket=$(whoami)-apigateway
$ aws s3 mb s3://$S3Bucket
$ aws s3 cp lambda.zip s3://$S3Bucket/lambda.zip

Create CloudFormation stack (replace $S3Bucket with your S3 bucket name)

$ aws cloudformation create-stack --stack-name apigateway --template-body file://template.json --capabilities CAPABILITY_IAM --parameters ParameterKey=S3Bucket,ParameterValue=$S3Bucket

Wait until the stack is created (CREATE_COMPLETE)

$ aws cloudformation wait stack-create-complete --stack-name apigateway

replace all nine occurrences of $AWSRegion in swagger.json with the region that you are creating your API and Lamdba in

$ sed -i '.bak' 's/$AWSRegion/us-east-1/g' swagger.json

get the LambdaArn

$ aws cloudformation describe-stacks --stack-name apigateway --query Stacks[0].Outputs

replace all nine occurrences of $LambdaArn in swagger.json with the ARN from the stack output above (e.g. arn:aws:lambda:us-east-1:YYY:function:apigateway-Lambda-XXX)

$ sed -i '.bak' 's/$LambdaArn/arn:aws:lambda:us-east-1:YYY:function:apigateway-Lambda-XXX/g' swagger.json

deploy the API Gateway

    make sure you have an up-to-date version (aws --version) of the AWS CLI >= 1.10.18. Learn more here: http://docs.aws.amazon.com/cli/latest/userguide/installing.html

$ aws apigateway import-rest-api --fail-on-warnings --body file://swagger.json

update the CloudFormation template to set the ApiId parameter (replace $ApiId with the id output from above)

$ aws cloudformation update-stack --stack-name apigateway --template-body file://template.json --capabilities CAPABILITY_IAM --parameters ParameterKey=S3Bucket,UsePreviousValue=true ParameterKey=S3Key,UsePreviousValue=true ParameterKey=ApiId,ParameterValue=$ApiId

deploy to stage v1 (replace $ApiId)

$ aws apigateway create-deployment --rest-api-id $ApiId --stage-name v1

Using the RESTful API

The following examples assume that you replace $ApiGatewayEndpoint with $ApiId.execute-api.us-east-1.amazonaws.com

export ApiGatewayEndpoint="$ApiId.execute-api.us-east-1.amazonaws.com/v1"

Your API is now able to answer requests. Let’s give it a try.

Create a user:

curl -vvv -X POST -d '{"email": "your@mail.com", "phone": "0123456789"}' -H "Content-Type: application/json" https://$ApiGatewayEndpoint/user

List users:

curl -vvv -X GET https://$ApiGatewayEndpoint/user

Create a task:

curl -vvv -X POST -d '{"description": "test task"}' -H "Content-Type: application/json" https://$ApiGatewayEndpoint/user/$UserId/task

List tasks:

curl -vvv -X GET https://$ApiGatewayEndpoint/user/$UserId/task

Mark task as complete:

curl -vvv -X PUT https://$ApiGatewayEndpoint/user/$UserId/task/$TaskId

Delete task:

curl -vvv -X DELETE https://$ApiGatewayEndpoint/user/$UserId/task/$TaskId

Create a task with a category:

curl -vvv -X POST -d '{"description": "test task", "category": "test"}' -H "Content-Type: application/json" https://$ApiGatewayEndpoint/user/$UserId/task

List tasks by category:

curl -vvv -X GET https://$ApiGatewayEndpoint/category/$Category/task

Tear down and clean up

Delete API Gateway (replace $ApiId):

$ aws apigateway delete-rest-api --rest-api-id $ApiId

Delete CloudFormation stack:

$ aws cloudformation delete-stack --stack-name apigateway

Delete S3 bucket (replace $S3Bucket):

$ aws s3 rb --force s3://$S3Bucket

Summary

With API Gateway you can configure a RESTful API. You used a Lambda function to implement the functionality: Each request is answered by the Lambda function. You have very limited overhead to operate your API because you only need to configure your API and implement the functionality. You don’t need to care about servers, scaling, and all the operational overhead.
To automate the configuration of API Gateway you used a tool to import Swagger definitions.

Published on 05 Nov 2015
