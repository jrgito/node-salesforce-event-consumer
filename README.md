# Node Salesforce Event Consumer

This project is a simple way to listen salesforce events based on JSforce Streaming API

See the [official JSforce API repo](https://jsforce.github.io/) for more information on the JSforce API.

## Installation

Create a `.env` file at the root of the project:

```properties
SALESFORCE_LOGIN_URL=SALESFORCE_LOGIN_URL
SALESFORCE_USERNAME=SALESFORCE_USERNAME
SALESFORCE_PASSWORD=SALESFORCE_PASSWORD
SALESFORCE_TOKEN=
SALESFORCE_TOPIC=SALESFORCE_TOPIC
OFFSET=OFFSET
```

> **Warning:** this project is based on a user/pass Salesforce authentication. Only recommended for
> test purposes. Consider switching to JWT auth for extra security.


If using a Change Data Capture topic, make sure to activate the event in Salesforce Setup > Change Data Capture.

## Execution

Run the project with `npm start`

If everything goes well, you'll see output like this:

```
Connected to YOUR_SALESFORCE_INTANCE as SALESFORCE_USERNAME
streaming /data/AccountChangeEvent...

```

At this point consumer is waiting for events.
Once it receives an event, it will display it like this:

```
{
  "schema": "IeRuaY6cbI_HsV8Rv1Mc5g", 
  "payload": {
    "ChangeEventHeader": {
      "entityName": "Account", 
      "recordIds": [
        "<record_ID>"
      ], 
      "changeType": "CREATE", 
      "changeOrigin": "com/salesforce/api/soap/51.0;client=SfdcInternalAPI/", 
      "transactionKey": "0002343d-9d90-e395-ed20-cf416ba652ad", 
      "sequenceNumber": 1, 
      "commitTimestamp": 1612912679000, 
      "commitNumber": 10716283339728, 
      "commitUser": "<User_ID>"
    }, 
    "Name": "Acme", 
    "Description": "Everyone is talking about the cloud. But what does it mean?", 
    "OwnerId": "<Owner_ID>", 
    "CreatedDate": "2021-02-09T23:17:59Z", 
    "CreatedById": "<User_ID>", 
    "LastModifiedDate": "2021-02-09T23:17:59Z", 
    "LastModifiedById": "<User_ID>"
  }, 
  "event": {
    "replayId": 6
  }
}

```
