import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

declare global {
    namespace NodeJS {
        interface Global {
            signin(): string[]
        }
    }
}

jest.mock('../nats-wrapper');

let mongo: any;

beforeAll(async () => {
    jest.clearAllMocks();
    process.env.JWT_KEY = 'test';

    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = () => {
    return [`express:sess=${
        Buffer.from(JSON.stringify({
            jwt: jwt.sign({
                id: new mongoose.Types.ObjectId().toHexString(),
                email: 'test@test.com'
            }, process.env.JWT_KEY!)
        })).toString('base64')
    }`];
};
