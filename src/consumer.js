const jsforce = require('jsforce');

async function connectToSalesforce(loginUrl, username, auth) {
    const sfConnection = new jsforce.Connection({loginUrl: loginUrl});
    await sfConnection.login(username, auth);
    console.log(`Connected to ${sfConnection.instanceUrl} as ${username}`);
    return sfConnection;
}

function createStreamingClient(connection, topic, offset) {
    return connection.streaming.createClient([
        new jsforce.StreamingExtension.Replay(topic, offset),
        new jsforce.StreamingExtension.AuthFailure(() => {
            throw new Error("Something wrong with auth")
        })
    ]);
}

/**
 *
 * @param config
 * ```
 * {
 *     salesforceUrl: salesforceUrl (optional), default https://salesforce.com
 *     user: username (required),
 *     password: password (optional if token),
 *     token: token (optional if password)
 *     topic: topic (required),
 *     offset: offset (optional) -1 = Only New messages | -2 = All Window and New, default: -2
 * }
 * ```
 * @returns {Promise<{listen: listen}>}
 */
async function connect(config) {
    const loginUrl = config.salesforceUrl || 'https://salesforce.com';
    const user = config.user;
    const pass = (config.password) ? config.password : '';
    const token = (config.token) ? config.token : '';
    const auth = pass + token
    const topic = config.topic;
    const offset = config.offset || -2;
    if (!user || !topic || !auth) throw new Error("user, pass or token and topic can't be empty")

    try {
        let connection = await connectToSalesforce(loginUrl, user, auth)
        let client = createStreamingClient(connection, topic, offset)
        console.log(`Streaming ${topic}...`)
        return {
            /**
             *
             * @param onData function which received event listened
             */
            listen: function (onData) {
                client.subscribe(topic, function (data) {
                    console.log("received data " + JSON.stringify(data));
                    onData(data)
                })
            }
        };
    } catch (e) {
        console.error("Fatal error", e)
    }
}

module.exports.connect = connect
