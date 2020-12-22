import firebase from '../config/firebase'

const db = firebase.firestore().collection('/tutorials')

class TutorialService {
  getAll() {
    return db
  }

  create(tutorial) {
    return db.add(tutorial)
  }

  update(id, value) {
    return db.doc(id).update(value)
  }

  delete(id) {
    return db.doc(id).delete()
  }
}

export default new TutorialService()