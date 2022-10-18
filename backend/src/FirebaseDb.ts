const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

import * as serviceAccount from './service_accounts/react-crud-2e223-firebase-adminsdk-lpken-a8ddc8e6b4.json';

const admin = require('firebase-admin');

export function  getFirebaseDatabase(){
    if (admin.apps.length === 0) {
        initializeApp({
            credential: cert(serviceAccount)
        });
    }
    const db = getFirestore();
    return db;
}
