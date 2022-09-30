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
  schema: '_pKsngZBRPGolkyMwChsPg',
  payload: {
    LastModifiedDate: '2022-09-30T12:20:36Z',
    CC_Incident_Reason__c: 'test',
    ChangeEventHeader: {
      commitNumber: 677256159545,
      commitUser: '0052o0000091d7YAAQ',
      sequenceNumber: 1,
      entityName: 'Account',
      changeType: 'UPDATE',
      changedFields: [Array],
      changeOrigin: 'com/salesforce/api/soap/55.0;client=SfdcInternalAPI/',
      transactionKey: '0006554b-b261-1c53-0bf5-12b11e4a8020',
      commitTimestamp: 1664540436000,
      recordIds: [Array]
    }
  },
  event: { replayId: 7066634 }
}

```
