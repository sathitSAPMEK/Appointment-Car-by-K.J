import Firebase from 'firebase'
require('firebase/firestore')

const configs = {
  apiKey: 'AIzaSyBQZM1Yuov3kCwfDaLIobaR2XDluBtu0cc',
  authDomain: 'phet-garage-9c268.firebaseapp.com',
  projectId: 'phet-garage-9c268',
  storageBucket: 'phet-garage-9c268.appspot.com',
  messagingSenderId: '395878918141',
  appId: '1:395878918141:web:3dd1fd4625b607c5e5db94',
  databaseURL: 'https://phet-garage-9c268-default-rtdb.asia-southeast1.firebasedatabase.app',
}

Firebase.initializeApp(configs)
export const firestoreDB = Firebase.firestore()
export const firebaseDbRealtime = Firebase.database()

// module.exports = {
//   firestoreDB,
//   firebaseDbRealtime,
// }
