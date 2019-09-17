let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
let SL_AWS = require('slappforge-sdk-aws');
const sqs = new SL_AWS.SQS(AWS);
const sns = new AWS.SNS();
const s3 = new AWS.S3();

exports.handler = function (event, context, callback) {

    // s3.listObjects({
    //     'Bucket': 'my.perm.bucket',
    //     'MaxKeys': 10,
    //     'Prefix': ''
    // }).promise()
    //     .then(data => {
    //         console.log(data);           // successful response
    //         /*
    //         data = {
    //             Contents: [
    //                 {
    //                    ETag: "\"70ee1738b6b21e2c8a43f3a5ab0eee71\"",
    //                    Key: "example1.jpg",
    //                    LastModified: "<Date Representation>",
    //                    Owner: {
    //                       DisplayName: "myname",
    //                       ID: "12345example25102679df27bb0ae12b3f85be6f290b936c4393484be31bebcc"
    //                    },
    //                    Size: 11,
    //                    StorageClass: "STANDARD"
    //                 },
    //                 // {...}
    //             ]
    //         }
    //         */
    //     })
    //     .catch(err => {
    //         console.log(err, err.stack); // an error occurred
    //     });

    // sns.publish({
    //     Message: 't',
    //     MessageAttributes: {},
    //     MessageStructure: 'String',
    //     TopicArn: 'arn:aws:sns:us-east-1:318300609668:my_new_topic'
    // }).promise()
    //     .then(data => {
    //         console.log(data);
    //     })
    //     .catch(err => {
    //         // error handling goes here
    //         console.log(err);
    //     });

    sqs.receiveMessage({
        QueueUrl: `https://sqs.${process.env.AWS_REGION}.amazonaws.com/${process.env.SIGMA_AWS_ACC_ID}/my-new-queue`,
        AttributeNames: ['All'],
        MaxNumberOfMessages: '1',
        VisibilityTimeout: '30',
        WaitTimeSeconds: '0'
    }).promise()
        .then(receivedMsgData => {
            if (!!(receivedMsgData) && !!(receivedMsgData.Messages)) {
                let receivedMessages = receivedMsgData.Messages;
                receivedMessages.forEach(message => {
                    console.log(message);
                    // your logic to access each message through out the loop. Each message is available under variable message 
                    // within this block
                });
            } else {
                console.log("No messages");
                // No messages to process
            }
        })
        .catch(err => {
            console.log(err);
            // error handling goes here
        });
    // ddb.get({
    //     TableName: 'My-new-table',
    //     Key: { '123': '123' }
    // }).promise()
    //     .then((data) => {
    //         //your logic goes here
    //     })
    //     .catch((err) => {
    //         //handle error
    //     });

    // sqs.receiveMessage({
    //     QueueUrl: `https://sqs.${process.env.AWS_REGION}.amazonaws.com/${process.env.SIGMA_AWS_ACC_ID}/KTestSQS`,
    //     AttributeNames: ['All'],
    //     MaxNumberOfMessages: '1',
    //     VisibilityTimeout: '30',
    //     WaitTimeSeconds: '0'
    // }).promise()
    //     .then(receivedMsgData => {
    //         if (!!(receivedMsgData) && !!(receivedMsgData.Messages)) {
    //             let receivedMessages = receivedMsgData.Messages;
    //             receivedMessages.forEach(message => {
    //                 // your logic to access each message through out the loop. Each message is available under variable message 
    //                 // within this block
    //             });
    //         } else {
    //             // No messages to process
    //         }
    //     })
    //     .catch(err => {
    //         // error handling goes here
    //     });



    callback(null, { "message": "Successfully executed" });
}