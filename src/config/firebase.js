import { firebase } from '@firebase/app'
import '@firebase/firestore'
import '@firebase/auth'
import store from '../store/index'

let config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID
}

firebase.initializeApp(config)

firebase.auth().onAuthStateChanged(user => {
  store.dispatch('auth/fetchUser', user)
})

export default firebase