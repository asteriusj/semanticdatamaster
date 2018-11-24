
## app.zenn.ai subproject
$ npm install -g serverless
$ serverless create -t hello-world -n pwa-zennai
$ serverless plugin install -n serverless-s3-sync


## http://bit.ly/aws-creds-setup
$ export AWS_ACCESS_KEY_ID=AKIAJHN365TGNAJOFWHA
$ export AWS_SECRET_ACCESS_KEY=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
# AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are now available for serverless to use


$ serverless deploy -v
