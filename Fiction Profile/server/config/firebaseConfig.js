// firebaseConfig.js
const firebase = require('firebase/app');
const { getStorage } = require('firebase/storage');

const firebaseConfig = {
    // Your Firebase config here
    apiKey: "AIzaSyAtnG5wlmolpTxWvhWlt39K8_ZbSkrBPAs",
    authDomain: "fiction-profile-ec84d.firebaseapp.com",
    projectId: "fiction-profile-ec84d",
    storageBucket: "fiction-profile-ec84d.appspot.com",
    messagingSenderId: "806361300468",
    appId: "1:806361300468:web:e09850c1ae05096b384da1",
    measurementId: "G-BPKCBNVQ67"
};

firebase.initializeApp(firebaseConfig);
const storage = getStorage();

module.exports = { storage };
