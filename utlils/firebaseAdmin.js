import admin from 'firebase-admin';

if (!admin.apps.length) {
    const serviceAccount = require('@/secrets/codemaps-playground-firebase-adminsdk-lqxwb-fce0f6302d.json');

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

export const db = admin.firestore();
