const consumer = require('./consumer')
require('dotenv').config();
const {
    SALESFORCE_LOGIN_URL,
    SALESFORCE_USERNAME,
    SALESFORCE_PASSWORD,
    SALESFORCE_TOKEN,
    SALESFORCE_TOPIC,
    OFFSET
} = process.env;

const config = {
    salesforceUrl: SALESFORCE_LOGIN_URL,
    user: SALESFORCE_USERNAME,
    password: SALESFORCE_PASSWORD,
    topic: SALESFORCE_TOPIC,
    offset: OFFSET
}

consumer.connect(config)
    .then(client => client.listen(data => {
    console.log(data)
}))
