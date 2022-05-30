import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema.js';
import root from './root.js';
import { initializeApp } from 'firebase/app';
import { config } from 'dotenv';

config();
const FIREBASE_CONFIG = {
    apiKey: process.env.FirebaseApiKey,
    authDomain: process.env.FirebaseAuthDomain,
    databaseURL: process.env.FirebaseDatabaseURL,
    projectId: process.env.FirebaseProjectId,
    storageBucket: process.env.FirebaseStorageBucket,
    messagingSenderId: process.env.FirebaseMessagingSenderId,
    appId: process.env.FirebaseAppId,
    measurementId: process.env.FirebaseMeasurementId
};

const app = express();
app.use(express.json())
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}));

async function startServer() {
    try {
        initializeApp(FIREBASE_CONFIG);
        app.listen(process.env.PORT, () => { console.log('listening on http://localhost:5000'); });
    } catch (e) {
        console.error(e);
    }
}

startServer()