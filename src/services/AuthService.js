import firebase from '../config/firebase'

const db = firebase.auth()

class AuthService {

  signUp(username, password) {
    return db.createUserWithEmailAndPassword(username, password)
  }

  signIn(username, password) {
    return db.signInWithEmailAndPassword(username, password)
  }

  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return db.signInWithPopup(provider)
  }

  signInWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return db.signInWithPopup(provider)
  }

  signOut() {
    return db.signOut()
  }

}

export default new AuthService()