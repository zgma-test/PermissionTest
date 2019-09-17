let AWS = require('aws-sdk');
const kinesis = new AWS.Kinesis();
const cognito_idp = new AWS.CognitoIdentityServiceProvider();
const ddb = new AWS.DynamoDB.DocumentClient();
let SL_AWS = require('slappforge-sdk-aws');
const sqs = new SL_AWS.SQS(AWS);
const sns = new AWS.SNS();
const s3 = new AWS.S3();

exports.handler = function (event, context, callback) {

    kinesis.describeStream({
        StreamName: 'my-new-stream'
    }).promise()
        .then(data => {
            // your logic goes here
        })
        .catch(err => {
            // error handling goes here
        });




    callback(null, { "message": "Successfully executed" });
}