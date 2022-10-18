// picks up users from database and sends data to PubSub

const {PubSub} = require('@google-cloud/pubsub');
import {GetUsers} from './GetUsers';
import * as servicesAccount from './service_accounts/pubsub-publisher-malgen-5f6dfed9a2d0.json';

interface userObject{
    email: string,
    varSymbol: string,
    language: 'cz'|'en'
}
const pubSubClient = new PubSub({keyFile:servicesAccount});
const topicName = 'projects/malgen/topics/sendmail'

function sendToPubSub(userObject:userObject) {
    let data = JSON.stringify(userObject);

    async function publishMessage() {
        const dataBuffer = Buffer.from(data);

        try {
            const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
            console.log(`Message ${messageId} published.`);
        } catch (error) {
            // @ts-ignore
            console.error(`Received error while publishing: ${error.message}`);
            process.exitCode = 1;
        }
    }
    publishMessage()
}

const main = async () => {

    const getUsers = new GetUsers();
    const userObjectsArray = async () => { return await getUsers.getUsersInfoForInvoicing()}

    for (const userObject of await userObjectsArray()) {
        await sendToPubSub(userObject)
    }
}

main()