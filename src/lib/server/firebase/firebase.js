import { getApps, initializeApp } from 'firebase/app';

import { firebase_apiKey, firebase_authDomain, firebase_projectId, firebase_storageBucket, firebase_messagingSenderId, firebase_appId, firebase_measurementId } from '$env/static/private';
const firebaseConfig = {
    apiKey: firebase_apiKey,
    authDomain: firebase_authDomain,
    projectId: firebase_projectId,
    storageBucket: firebase_storageBucket,
    messagingSenderId: firebase_messagingSenderId,
    appId: firebase_appId
};

let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;