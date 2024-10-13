// firebaseConfig.
require ('dotenv').config();
const firebase = require('firebase/app');
const { getStorage } = require('firebase/storage');

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "fiction-profile-ec84d.firebaseapp.com",
    projectId: "fiction-profile-ec84d",
    storageBucket: "fiction-profile-ec84d.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
firebase.initializeApp(firebaseConfig);
const storage = getStorage();

module.exports = { storage };
