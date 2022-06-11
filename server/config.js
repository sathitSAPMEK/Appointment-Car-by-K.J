const Firebase = require("firebase");
require('dotenv').config();
require("firebase/firestore");

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN1,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUGKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    databaseURL: process.env.DB_URL
};

Firebase.initializeApp(firebaseConfig); 
const firestoreDB = Firebase.firestore();   
const firebaseDbRealtime = Firebase.database();

module.exports = {
    firestoreDB,
    firebaseDbRealtime
};