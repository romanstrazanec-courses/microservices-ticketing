import {natsWrapper} from "./nats-wrapper";

const start = async () => {
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID must be defined');
    }
    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL must be defined');
    }
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID must be defined');
    }

    try {
        // noinspection HttpUrlsUsage
        await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);
        natsWrapper.onClose(() => {
            console.log('NATS connection closed!');
            process.exit();
        });
    } catch (e) {
        console.error(e);
    }
}

start();
