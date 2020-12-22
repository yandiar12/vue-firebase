import firebase from '../config/firebase'

const db = firebase.auth()

class AuthService {

  signUp(username, password) {
    return db.createUserWithEmailAndPassword(username, password)
  }

  signIn(username, password) {
    return db.signInWithEmailAndPassword(username, password)
  }

  signOut() {
    return db.signOut()
  }

}

export default new AuthService()