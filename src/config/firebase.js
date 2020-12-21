import { firebase } from '@firebase/app'
import '@firebase/firestore'

let config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID
  // apiKey: "AIzaSyBYe3gXH3cVClUloHTMGN_08FEfnojwvCo",
  // authDomain: "vue-firebase-bb720.firebaseapp.com",
  // projectId: "vue-firebase-bb720",
  // storageBucket: "vue-firebase-bb720.appspot.com",
  // messagingSenderId: "135405127508",
  // appId: "1:135405127508:web:fc3c1d6682040f6ac4aac1"
}

firebase.initializeApp(config)

export default firebase.firestore()